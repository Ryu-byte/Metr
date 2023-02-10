<template>
  <div class="component_container company">
    <div class="tittle q-mb-lg">Учётные данные</div>
    <div class="forms" style="line-height: 1">
      <div class="row">
        <div class="col-md-6 q-pr-md">
          <CustomDaData
            token="59226899abf9e4d0157e2834fc109979d7fc5986"
            v-model="form.government"
            label="Наименование регистрирующего органа:"
            name="name"
            type="fns_unit"
            placeholder="Укажите наименование регистрирующего органа"
            v-model:data="data"
          />
        </div>
        <div class="col-md-6 q-pl-md">
          <TextInput
            label="Серия и номер свидетельства о постановке на учёт:"
            name="series"
            type="text"
            v-model="form.number"
            placeholder="Укажите серию и номер свидетельства о постановке на учёт"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-2 q-pr-md">
          <DateInput
            title="дд.мм.гггг"
            :is-range="false"
            name="date_to_registration"
            label="Дата регистрации:"
            style-date="input_date"
            dense="dense"
            v-maska="'##.##.####'"
            v-model="form.date_to_registration"
          />
        </div>
        <div class="col-md-2 q-pl-md q-pr-md">
          <DateInput
            title="дд.мм.гггг"
            :is-range="false"
            name="date_to_issue"
            label="Дата выдачи:"
            style-date="input_date"
            dense="dense"
            v-maska="'##.##.####'"
            v-model="form.date_to_issue"
          />
        </div>
        <div class="col-md-4 q-pl-md q-pr-md">
          <TextInput
            label="Код ИФНС:"
            name="ifns"
            type="text"
            v-model="form.ifns"
            v-maska="'#####'"
            placeholder="Укажите код ОКАТО"
          />
        </div>
        <div class="col-md-4 q-pl-md q-pr-md">
          <TextInput
            label="Код ОКАТО:"
            name="okato"
            type="text"
            v-model="form.okato"
            v-maska="'###############'"
            placeholder="Укажите код ОКАТО"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 q-pr-md">
          <SelectMultiple
            label="Выберите систему налогообложения"
            name="service"
            title="Система налогообложения:"
            v-model="form.type_tax"
            :model-option="type_tax_options"
          />
        </div>
        <div class="col-md-4 q-pl-md q-pr-md">
          <TextInput
            label="Регистрационный номер ПФР:"
            name="pfr"
            type="text"
            placeholder="Укажите регистрационный номер ПФР"
            v-model="form.pfr"
            :is-number="true"
            v-maska="'###############'"
          />
        </div>
        <div class="col-md-4 q-pl-md">
          <TextInput
            label="Регистрационный номер ФСС:"
            name="fcc"
            type="text"
            placeholder="Укажите регистрационный номер ФСС"
            v-model="form.fcc"
            :is-number="true"
            v-maska="'###############'"
          />
        </div>
      </div>
      <p
        class="q-pt-lg"
        style="color: #000; font-size: 12px; padding-bottom: 7px"
      >
        Коды статистики:
      </p>
      <div class="row">
        <div class="col-md-4 q-pr-md">
          <TextInput
            label=""
            name="okpo"
            v-model="form.okpo"
            placeholder="ОКПО"
            style="margin-bottom: 10px;"
            v-maska="'###############'"
          />
        </div>
        <div class="col-md-4 q-pr-md q-pl-md">
          <TextInput
            label=""
            name="oktmo"
            v-model="form.oktmo"
            placeholder="ОКТМО"
            style="margin-bottom: 10px;"
            v-maska="'###############'"
          />
        </div>
        <div class="col-md-4 q-pl-md">
          <TextInput
            label=""
            name="okogu"
            v-model="form.okogu"
            placeholder="ОКОГУ"
            style="margin-bottom: 10px;"
            v-maska="'###############'"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 q-pr-md">
          <TextInput
            label=""
            name="okato"
            v-model="form.okato"
            placeholder="ОКАТО"
            v-maska="'###############'"
          />
        </div>
        <div class="col-md-4 q-pr-md q-pl-md">
          <TextInput
            label=""
            name="okfs"
            v-model="form.okfs"
            placeholder="ОКФС"
            v-maska="'###############'"
          />
        </div>
        <div class="col-md-4 q-pl-md">
          <TextInput
            label=""
            name="okopf"
            v-model="form.okopf"
            placeholder="ОКОПФ"
            v-maska="'###############'"
          />
        </div>
      </div>
      <q-btn
        no-caps
        @click="save"
        label="Сохранить"
        class="btn btn__save btn__continue btn__margin"
      />
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import TextInput from "components/ui/input/TextInput";
import DateInput from "components/ui/DateInput/DateInput";
import useVuelidate from "@vuelidate/core";
import { useQuasar } from "quasar";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import { useStore } from "vuex";
import { maska } from "maska";
import {
  formatUnixDateTime,
  getEnumOptions,
  toUnixFormat,
} from "src/lib/helpers";
import CustomDaData from "components/ui/InputDaData/CustomDaData";
import { forEach } from "lodash";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "CredentialsDashboard",
  components: {
    CustomDaData,
    SelectMultiple,
    TextInput,
    DateInput,
  },
  directives: {
    maska,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    const data = ref({});
    watch(
      data,
      (value) => {
        if (value) {
          form.government = value.data.name;
          form.ifns = Number(value.data.code);
        }
      },
      { deep: true }
    );
    const form = reactive({
      government: null,
      number: null,
      date_to_registration: null,
      date_to_issue: null,
      ifns: null,
      okato: null,
      type_tax: null,
      pfr: null,
      fcc: null,
      okpo: null,
      oktmo: null,
      okogu: null,
      // okopf:null, 2 раза okato в макете и формализации??
      okfs: null,
      okopf: null,
    });
    const rules = computed(() => {
      return {};
    });
    let type_tax_options = getEnumOptions("getCompanyTaxesType");
    let v$ = useVuelidate(rules, form);
    const save = async () => {
      try {
        if (v$.value.$invalid) {
          throw new Error("Не все поля заполнены");
        }
        form.date_to_issue = toUnixFormat(form.date_to_issue);
        form.date_to_registration = toUnixFormat(form.date_to_registration);
        await store.dispatch("company/CompanyDateUpdate", {
          id: id,
          form: form,
        });
        $q.notify({
          color: "positive",
          icon: "check",
          position: "top-right",
          message: "Учетные данные компании успешно обновлены",
        });
        await loadData();
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
      $q.loading.show({
        delay: 400,
      });
      loadData();
      $q.loading.hide();
    });

    async function loadData() {
      try {
        await store.dispatch("company/CompanyDate", id);
        let data = store.getters["company/getCompanyDate"];
        for (let dataKey in data) {
          if (form.hasOwnProperty(dataKey)) {
            form[dataKey] = data[dataKey];
            form.date_to_issue = formatUnixDateTime(data.date_to_issue);
            form.date_to_registration = formatUnixDateTime(
              data.date_to_registration
            );
          }
        }
      } catch (e) {
        $q.notify({
          color: "negative",
          message: e.message,
          icon: "warning",
          position: "top",
        });
      }
    }

    return {
      save,
      form,
      id,
      type_tax_options,
      data,
    };
  },
});
</script>
