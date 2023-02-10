<template>
  <div class="component_container company">
    <div>
      <div class="tittle q-mb-lg">Общие данные</div>
      <div class="forms">
        <div class="row">
          <div class="col-md-4 q-pr-md">
            <InputDaData
              token="59226899abf9e4d0157e2834fc109979d7fc5986"
              v-model="form.company_full_name"
              type="party"
              class="company_full_name"
              name="company_full_name"
              label="Полное название организации:"
              placeholder="Введите название компании"
              :success-message="v$.company_full_name"
              @update:model-value="setCompanyData"
              v-model:data="companyData"
            />
          </div>
          <div class="col-md-4 q-pl-md q-pr-md">
            <TextInput
              label="Сокращенное название организации:"
              name="company_name"
              type="text"
              v-model="form.company_name"
              placeholder="Введите сокращенное название организации"
              :success-message="v$.company_name"
            />
          </div>
          <div class="col-md-4 q-pl-md">
            <SelectMultiple
              label="Выберите тип организации:"
              name="company_type"
              title="Тип организации:"
              v-model="form.company_type"
              :model-option="options"
              disable
              :success-message="v$.company_type"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 q-pr-md">
            <TextInput
              label="ИНН: *"
              name="inn"
              type="text"
              v-maska="'##########'"
              placeholder="Укажите ИНН"
              v-model="form.inn"
              :is-number="true"
              :success-message="v$.inn"
            />
          </div>
          <div class="col-md-4 q-pl-md q-pr-md">
            <TextInput
              label="КПП: *"
              name="kpp"
              type="text"
              v-maska="'#########'"
              :is-number="true"
              placeholder="Укажите КПП"
              :success-message="v$.kpp"
              v-model="form.kpp"
            />
          </div>
          <div class="col-md-4 q-pl-md">
            <TextInput
              label="ОГРН/ОГРНИП:"
              name="ogrn"
              type="text"
              v-model="form.ogrn"
              :is-number="true"
              v-maska="'##################'"
              placeholder="Укажите ОГРН/ОГРНИП"
              :success-message="v$.ogrn"
            />
          </div>
        </div>
        <div class="tittle q-mt-md q-mb-lg">Адрес</div>
        <div class="row">
          <div class="col-md-4 q-pr-md">
            <AddressInput
              v-model="form.legal_address"
              name="legal_address"
              label="Юридический адрес:*"
              title="Юридический адрес"
              placeholder="Кликните на поле что бы указать адрес"
              :success-message="v$.legal_address"
            />
          </div>
          <div class="col-md-4 q-pr-md q-pl-md">
            <AddressInput
              name="actual_address"
              label="Фактический адрес:*"
              title="Фактический адрес"
              placeholder="Кликните на поле что бы указать адрес"
              :success-message="v$.actual_address"
              v-model="form.actual_address"
              style="margin-bottom: 8px;"
            />
            <q-checkbox
              class="copy_checkbox"
              v-model="legalToActual"
              @click="
                copyAddress('legal_address', 'actual_address', legalToActual)
              "
            >
              Вставить юридический адрес
            </q-checkbox>
          </div>
          <div class="col-md-4 q-pl-md">
            <AddressInput
              name="actual_address"
              label="Почтовый адрес:*"
              title="Почтовый адрес"
              placeholder="Кликните на поле что бы указать адрес"
              v-model="form.mail_address"
              :success-message="v$.mail_address"
              style="margin-bottom: 8px;"
            />
            <div class="row  justify-between">
              <q-checkbox
                class="copy_checkbox"
                v-model="legalToMail"
                @click="
                  copyAddress('legal_address', 'mail_address', legalToMail)
                "
              >
                Вставить юридический адрес
              </q-checkbox>
              <q-checkbox
                class="copy_checkbox"
                v-model="actualToMail"
                @click="
                  copyAddress('actual_address', 'mail_address', actualToMail)
                "
              >
                Вставить фактический адрес
              </q-checkbox>
            </div>
          </div>
        </div>
        <div class="tittle q-mt-md q-mb-lg">Контакты</div>
        <div class="row">
          <div class="col-md-4 q-pr-md">
            <TextInput
              name="phone"
              label="Контактный телефон:*"
              type="contact_phone"
              v-maska="['+7 (###) ###-##-##', '+7 (###) ###-##-##']"
              placeholder="+7 (999) 999 - 99 -99"
              :success-message="v$.phone"
              v-model="form.phone"
            />
          </div>
          <div class="col-md-4 q-pr-md q-pl-md">
            <TextInput
              name="email"
              label="Электронная почта:*"
              type="contact_email"
              placeholder="Укажите адрес электронной почты"
              :success-message="v$.email"
              v-model="form.email"
            />
          </div>
          <div class="col-md-4 q-pl-md">
            <TextInput
              label="Сайт:"
              name="site"
              type="url"
              placeholder="Укажите сайт"
              v-model="form.site"
            />
          </div>
        </div>
        <q-btn
          no-caps
          @click="send"
          label="Cохранить"
          class="btn btn__save btn__continue btn__margin"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {useQuasar} from "quasar";
import AddressInput from "components/ui/AddressInput/AddressInput";
import TextInput from "components/ui/input/TextInput";
import {useStore} from "vuex";
import {forEach} from "lodash";
import {maska} from "maska";
import {
  DashboardAboutForm,
  DashboardAboutRules,
} from "src/setup/Dashboard/About";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {getEnumOptions} from "src/lib/helpers";
import InputDaData from "components/ui/InputDaData/InputDaData";

export default defineComponent({
  name: "AboutDashboard",
  components: {
    InputDaData,
    SelectMultiple,
    TextInput,
    AddressInput,
  },
  directives: {
    maska,
  },
  setup() {
    const $q = useQuasar();
    let options = getEnumOptions("getCompanyType");
    const store = useStore();
    const companyData = ref({});
    const form = DashboardAboutForm;
    const v$ = useVuelidate(DashboardAboutRules, form);
    let legalToActual = ref(false);
    let legalToMail = ref(false);
    let actualToMail = ref(false);
    const service_options = getEnumOptions("getService");
    const setCompanyData = () => {
      if (companyData.value.data) {
        form.inn = companyData.value.data.inn;
        form.kpp = companyData.value.data.kpp;
        form.ogrn = companyData.value.data.ogrn;
        form.legal_address = companyData.value.data.address.value;
      }
    }
    const copyAddress = (copyFrom, copyTo, checkboxValue) => {
      if (checkboxValue) {
        form[copyTo] = form[copyFrom];
      } else {
        form[copyTo] = "";
      }
    };
    async function loadData() {
      try {
        $q.loading.show({delay: 400});
        let item = store.getters["user/getUser"].company;
        await store.dispatch("company/CompanySingle", item.id);
        let data = store.getters["company/getCompanySingle"];
        if (data) {
          for (let dataKey in data) {
            if (form.hasOwnProperty(dataKey)) {
              form[dataKey] = data[dataKey];
            }
          }
        }
        $q.loading.hide();
      } catch (e) {
        let message = null;
        message = e.message;
        $q.notify({
          position: "top-right",
          type: "negative",
          message: message,
        });
        $q.loading.hide();
      }
    }

    onMounted(async () => await loadData());
    const send = async () => {
      v$.value.$validate();
      try {
        if (v$.value.$invalid) {
          throw new Error("Не все поля заполнены");
        }
        await store.dispatch("company/CompanyUpdate", form);
        await store.dispatch("user/getUser");
        options = [];
        await loadData();
        $q.notify({
          color: "positive",
          message: "Изменения сохранены",
          icon: "done",
          position: "top-right",
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
      options,
      send,
      copyAddress,
      companyData,
      setCompanyData,
      legalToActual,
      legalToMail,
      actualToMail,
      service_options,
    };
  },
});
</script>
