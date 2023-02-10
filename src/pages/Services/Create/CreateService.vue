<template>
  <div class="component_container">
    <div class="tittle q-mb-lg">Услуга</div>
    <div class="row no-wrap justify-between q-mb-lg">
      <div class="col-md-4 q-pr-md">
        <SelectMultiple
          title="Организация: "
          label="Выберите организацию"
          name="company"
          v-model="form.client_id"
          height="300px"
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
    <div class="row no-wrap justify-between q-mb-lg">
      <div class="col-md-6 q-pr-md">
        <SelectMultiple
          title="Договор на услугу: "
          label="Выберите договор на услугу"
          name="service_pact"
          :model-value="null"
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
      <div class="col-md-3 q-pl-md">
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
        <q-icon name="img:svg/add_icon.svg" class="services__tariff-img"/>
        Добавить тариф
      </q-btn>
    </div>
    <AddTariff :tariff-list="tariffList" :error="validation"/>

    <q-btn
      @click="save"
      no-caps
      size="14px"
      label="Сохранить"
      class="btn btn__save btn__continue btn__margin"
    />
  </div>
</template>
<script>
import {defineComponent, reactive, ref, computed, onMounted} from "vue";
import {useQuasar} from "quasar";
import useVuelidate from "@vuelidate/core";
import TextInput from "components/ui/input/TextInput";
import {useStore} from "vuex";
import _, {cloneDeep, forEach} from "lodash";
import {formData, rulesData, rulesTariff} from "src/setup/Services/Data";
import {useRouter} from "vue-router";
import AddTariff from "components/Service/AddTariff";
import Formula from "src/Enum/Formula.js";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {getEnumOptions, getFormulaOptions, getServiceOptions, selectCompany, selectObject} from "src/lib/helpers";

export default defineComponent({
  name: "CreateService",
  components: {
    TextInput,
    AddTariff,
    SelectMultiple,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const form = reactive(cloneDeep(formData));
    const tariffList = reactive([form.tariff[0]]);
    const v$ = useVuelidate(rulesData, form);
    const validation = useVuelidate(rulesTariff, {tariff: tariffList});

    const service_pact_options = [];
    let company_options = ref([]);
    let placeholder = computed(() => {
      return form.formula ? "Укажите данные" : "Прежде выберите ФРУ";
    });
    const formula = getEnumOptions("getFormula");
    const service = getEnumOptions("getService");
    const serviceType_options = getEnumOptions("getServiceType");
    const units = getEnumOptions("getServiceUnits");
    const loading = ref(false);

    let formula_options = ref([]);
    let service_options = ref([]);
    let units_options = ref([]);
    formula_options.value = formula;
    service_options.value = service;
    units_options.value = units;


    const getRequestPage = async (page) => {
      loading.value = true;
      let arr = await selectCompany(store, "client", page)
      arr.forEach(company => {
        company_options.value.push(company)
      })
      if (arr) {
        loading.value = false;
      }
    }

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

    let add = reactive({
      id: null,
      tariff: 1,
      house: [
        {
          house_id: null,
          normative_odn: 1,
        },
      ],
      type_flat: [],
    });
    let addTariff = () => {
      tariffList.push(add);
    };
    onMounted(() => {
    });

    const save = async () => {
      const sentForm = {...form};
      sentForm.tariff = tariffList;
      v$.value.$validate();
      // validation.value.$validate();
      try {
        if (v$.value.$error) {
          throw new Error("Не все поля заполнены ");
        }
        // if (validation.value.$error) {
        //   throw new Error("Не все поля заполнены ");
        // }
        await store.dispatch("service/CreateService", sentForm);
        await router.push("/services");
        $q.notify({
          position: "top-right",
          type: "positive",
          message: "Услуга успешно создана",
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
    return {
      form,
      v$,
      save,
      company_options,
      serviceType_options,
      service_options,
      formula_options,
      units_options,
      placeholder,
      tariffList,
      validation,
      serviceFormat,
      formulaFormat,
      service_pact_options,
      addTariff,
      getRequestPage,
      loading
    };
  },
});
</script>
