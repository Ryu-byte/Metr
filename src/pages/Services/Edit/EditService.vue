<template>
  <main>
    <div class="component_container">
      <div class="tittle q-mb-lg">Услуга</div>
      <div class="row no-wrap justify-between q-mb-md">
        <div class="col-md-4 q-pr-md">
          <SelectMultiple
            title="Организация: "
            label="Выберите организацию"
            name="company"
            v-model="form.client_id"
            :loading="loading"
            :model-option="company_options"
            :success-message="v$.client_id"
            @getRequestPage="getRequestPage"
          />
        </div>
        <div class="col-md-4 q-pl-md q-pr-md">
          <SelectMultiple
            title="Тип услуги: "
            label="Выберите тип услуги"
            name="type"
            v-model="form.type_service"
            :model-option="serviceType_options"
            :success-message="v$.type_service"
            @update:model-value="serviceFormat(form.type_service)"
          />
        </div>
        <div class="col-md-4 q-pl-md">
          <SelectMultiple
            title="Услуга: "
            label="Выберите услугу"
            name="service"
            v-model="form.service"
            :success-message="v$.service"
            :model-option="service_options"
            :disable="form.type_service === null"
            @update:model-value="formulaFormat(form.type_service, form.service)"
          />
        </div>
      </div>
      <div class="row no-wrap justify-between q-mb-md">
        <div class="col-md-6 q-pr-md">
          <SelectMultiple
            title="Договор на услугу: "
            label="Выберите договор на услугу"
            name="service_pact"
            v-model="form.service_pact"
            :model-option="service_pact_options"
          />
        </div>
        <div class="col-md-3 ">
          <TextInput
            label="Название услуги в квитанции:"
            name="name"
            v-model="form.name"
            type="text"
            :success-message="v$.name"
            placeholder="Укажите название услуги"
          />
        </div>
        <div class="col-md-3 q-pl-md ">
          <SelectMultiple
            label="Ед.измерения"
            title="Единица измерения: "
            name="units"
            v-model="form.units"
            :model-option="units_options"
            :success-message="v$.units"
            :disable="form.formula !== 38"
          />
        </div>
      </div>
      <div class="row no-wrap justify-between q-mb-lg">
        <div class="col-md-6 q-pr-md">
          <SelectMultiple
            label="Выберите формулу расчёта"
            title="Формула расчёта услуги(ФРУ): "
            name="formula"
            v-model="form.formula"
            :model-option="formula_options"
            :success-message="v$.formula"
            :disable="form.service === null || form.type_service === null"
          />
        </div>
        <div class="col-md-3 ">
          <TextInput
            label="Коэффициент:"
            name="coefficient"
            v-model="form.coefficient"
            type="number"
            :success-message="v$.coefficient"
            :disabled="form.formula === null || form.formula.length <= 0"
            :placeholder="placeholder"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <TextInput
            label="Норматив:"
            name="normative"
            v-model="form.normative"
            type="number"
            :disabled="form.formula === null || form.formula.length <= 0"
            :success-message="v$.normative"
            :placeholder="placeholder"
          />
        </div>
      </div>
      <div class="row no-wrap q-mb-md q-pt-lg items-center">
        <div class="tittle q-mr-md">Тариф</div>
        <q-btn
          class="btn services__tariff-add"
          no-caps
          @click.prevent="addTariff"
        >
          <q-icon name="img:svg/add_icon.svg" class="services__tariff-img" />
          Добавить тариф
        </q-btn>
      </div>
      <AddTariff v-if="!isLoading" :tariff-list="tariffList" :is-edit="true" />

      <q-btn
        @click="save"
        no-caps
        size="14px"
        label="Сохранить"
        class="btn btn__save btn__continue btn__margin"
      />
    </div>
  </main>
</template>
<script>
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useQuasar } from "quasar";
import useVuelidate from "@vuelidate/core";
import TextInput from "components/ui/input/TextInput";
import { useStore } from "vuex";
import _, { cloneDeep, forEach } from "lodash";
import { formData, rulesData, rulesTariff } from "src/setup/Services/Data";
import { useRoute } from "vue-router";
import AddTariff from "components/Service/AddTariff";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {getEnumOptions, getFormulaOptions, getServiceOptions, selectCompany, selectObject} from "src/lib/helpers";

export default defineComponent({
  name: "EditService",
  components: {
    TextInput,
    AddTariff,
    SelectMultiple,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    const isLoading = ref(true);
    const form = reactive(cloneDeep(formData));

    const placeholder = computed(() => {
      return form.formula ? "Укажите данные" : "Прежде выберите ФРУ";
    });
    const company_options = ref([]);
    const service_pact_options = [];
    const type_service = ref("");
    const service_name = ref("");
    const formula = getEnumOptions("getFormula");
    const service = getEnumOptions("getService");
    const serviceType_options = getEnumOptions("getServiceType");
    const units = getEnumOptions("getServiceUnits");
    const loading = ref(false);

    const formula_options = ref([]);
    const service_options = ref([]);
    const units_options = ref([]);
    const updateOptions = ref(false);
    formula_options.value = formula;
    service_options.value = service;
    units_options.value = units;


    const getRequestPage = async (page) => {
      loading.value = true;
      if (company_options.value.length === 1 && updateOptions.value) {
        company_options.value.length = 0;
        updateOptions.value = false;
      }
      let arr = await selectCompany(store, "client", page)
      arr.forEach(company => {
        company_options.value.push(company)
      })
      if (arr) {
        loading.value = false;
      }
    }

    let tariffList = ref([]);
    let addTariff = () => {
      let add = {
        id: null,
        tariff: null,
        house: [
          {
            house_id: null,
            normative_odn: null,
          },
        ],
        type_flat: [],
        type_of_flat: null,
        flat: [],
        lc: [],
      };
      tariffList.value.push(add);
    };
    const formulaFormat = () => {
      formula_options.value = getFormulaOptions(form, formula)
      if (form.type_service === 3 && form.service === 11) {
        units_options.value = _.filter(units, (o) => {
          return o.value === 2 || o.value === 5;
        });
      }

    }
    const serviceFormat = () => {
      service_options.value = getServiceOptions(form, service)
    };
    let v$ = useVuelidate(rulesData, form);

    const save = async () => {
      const sentForm = { ...form };
      sentForm.tariff = tariffList.value;
      delete sentForm.company_name;
      sentForm.tariff.forEach((tariff) => {
        delete tariff.address;
        delete tariff.apartment;
      });
      v$.value.$validate();
      try {
        if (v$.value.$error) {
          throw new Error("Не все поля заполнены ");
        }
        await store.dispatch("service/UpdateSingleService", sentForm);
        $q.notify({
          position: "top-right",
          type: "positive",
          message: "Услуга успешно обновлена",
        });
      } catch (e) {
        let message = null;
        message = e.message;
        if (e.response !== undefined) {
          forEach(e.response.data.errors, function (item) {
            message = item;
          });
        }
        $q.notify({
          color: "negative",
          message: message,
          icon: "warning",
          position: "top-right",
        });
      }
    };
    onMounted(() => {
      loadData();
    });

    async function loadData() {
      try {
        $q.loading.show({
          delay: 400,
        });
        await store.dispatch("service/SingleService", id);
        let data = store.getters["service/getSingleService"];
        if (data) {
          for (let key in data) {
            form[key] = data[key];
          }
          type_service.value = serviceType_options.find(
            ({ value }) => value === form.type_service
          );
          service_name.value = service.find(
            ({ value }) => value === form.service
          );
          tariffList.value = cloneDeep(form.tariff);
          company_options.value.push({
            value: data.client_id,
            label: data.company_name,
          });
          updateOptions.value = true;
          serviceFormat(form.type_service);
          form.service = data.service;
          formulaFormat(form.type_service, form.service);
          form.formula = data.formula;
        }
        $q.loading.hide();
        isLoading.value = false;
      } catch (err) {
        $q.notify({
          color: "negative",
          message: err.response.data.errors.message,
          icon: "warning",
          position: "top-right",
        });
      }
    }

    return {
      form,
      v$,
      isLoading,
      save,
      company_options,
      service_options,
      serviceType_options,
      units_options,
      formula_options,
      service_pact_options,
      placeholder,
      tariffList,
      service_name,
      type_service,
      serviceFormat,
      formulaFormat,
      addTariff,
      getRequestPage,
      loading
    };
  },
});
</script>
