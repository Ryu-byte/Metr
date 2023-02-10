<template>
  <div class="component_container company">
    <div>
      <div class="tittle q-mb-lg">Общие данные</div>
      <div class="forms">
        <div class="row">
          <div class="col-md-6 q-pr-md">
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
          <div class="col-md-6 q-pl-md">
            <TextInput
              label="Сокращенное название организации:"
              name="company_name"
              type="text"
              v-model="form.company_name"
              placeholder="Введите сокращенное название организации"
              :success-message="v$.company_name"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 q-pr-md">
            <SelectMultiple
              label="Выберите статус организации"
              name="company_status"
              title="Статус организации:"
              v-model="form.company_status"
              :model-option="company_status_options"
              :success-message="v$.company_status"
              disable
            />
          </div>
          <div class="col-md-6 q-pl-md">
            <SelectMultiple
              label="Выберите тип организации:"
              name="company_type"
              title="Тип организации:"
              v-model="form.company_type"
              :model-option="company_type_options"
              :success-message="v$.company_type"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 q-pr-md">
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
          <div class="col-md-2 q-pl-md q-pr-md">
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
          <div class="col-md-2 q-pl-md">
            <TextInput
              label="ОГРН/ОГРНИП:"
              name="ogrn"
              type="text"
              :is-number="true"
              v-maska="'##################'"
              v-model="form.ogrn"
              placeholder="Укажите ОГРН/ОГРНИП"
              :success-message="v$.ogrn"
            />
          </div>
          <div class="col-md-6 q-pl-md">
            <SelectMultiple
              label="Выберите услугу"
              name="utility"
              title="Услуга:"
              v-model="form.utility"
              :model-option="utility_options"
              :multiple="true"
            />
          </div>
        </div>
        <div class="tittle q-pt-lg q-mb-lg">Адрес</div>
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
            />
            <q-checkbox
              class="copy_checkbox"
              v-model="legalToActual"
              @click="copyAddress('legal_address', 'actual_address', legalToActual)">
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
            />
            <div class="row">
              <q-checkbox
                class="copy_checkbox"
                v-model="legalToMail"
                @click="copyAddress('legal_address', 'mail_address', legalToMail)">
                Вставить юридический адрес
              </q-checkbox>
              <q-checkbox
                class="copy_checkbox"
                v-model="actualToMail"
                @click="copyAddress('actual_address', 'mail_address', actualToMail)">
                Вставить фактический адрес
              </q-checkbox>
            </div>
          </div>
        </div>
        <div class="tittle q-pt-lg q-mb-lg">Контакты</div>
        <div class="row">
          <div class="col-md-3 q-pr-md">
            <TextInput
              label="Контактное лицо:*"
              name="manager"
              type="text"
              v-model="form.manager"
              placeholder="Имя Фамилия Отчество"
              :success-message="v$.manager"
            />
          </div>
          <div class="col-md-3 q-pr-md q-pl-md">
            <TextInput
              name="phone"
              label="Контактный телефон:*"
              type="phone"
              v-maska="['+7 (###) ###-##-##', '+7 (###) ###-##-##']"
              placeholder="+7 (999) 999 - 99 -99"
              :success-message="v$.phone"
              v-model="form.phone"
            />
          </div>
          <div class="col-md-3 q-pr-md q-pl-md">
            <TextInput
              name="email"
              label="Электронная почта:*"
              type="contact_email"
              placeholder="Укажите адрес электронной почты"
              :success-message="v$.email"
              v-model="form.email"
            />
          </div>
          <div class="col-md-3 q-pl-md">
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
  <router-view/>
</template>

<script>
import {computed, defineComponent, reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {useQuasar} from "quasar";
import AddressInput from "components/ui/AddressInput/AddressInput";
import TextInput from "components/ui/input/TextInput";
import {maska} from "maska";
import {useStore} from "vuex";
import {forEach} from "lodash";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {CompanyClientRules} from "src/setup/Company/CompanyClient/Data";
import {useRoute} from "vue-router";
import {getEnumOptions} from "src/lib/helpers";
import InputDaData from "components/ui/InputDaData/InputDaData";

export default defineComponent({
  name: "EditCompanyCounterAgent",
  components: {
    InputDaData,
    SelectMultiple,
    TextInput,
    AddressInput,
  },
  emits: ["getNewData"],
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  directives: {
    maska,
  },
  setup(props, {emit}) {
    const $q = useQuasar();
    const options = reactive([]);
    const route = useRoute();
    const id = route.params.id;
    const store = useStore();
    const form = computed(() => {
        return props.data;
      }
    );
    let legalToActual = ref(false)
    let legalToMail = ref(false)
    let actualToMail = ref(false)
    const utility_options = getEnumOptions("getService")
    const company_type_options = getEnumOptions("getPartnerType")
    const companyData = ref({});
    const setCompanyData = () => {
      if (companyData.value.data) {
        form.value.inn = companyData.value.data.inn;
        form.value.kpp = companyData.value.data.kpp;
        form.value.ogrn = companyData.value.data.ogrn;
        form.value.legal_address = companyData.value.data.address.value;
      }
    }
    const company_status_options = [
      {
        value: 1,
        label: "Контрагент"
      },
      {
        value: 2,
        label: "Клиент сервиса"
      }
    ]

    const copyAddress = (copyFrom, copyTo, checkboxValue) => {
      if (checkboxValue) {
        form[copyTo] = form[copyFrom]
      } else {
        form[copyTo] = ""
      }
    }

    const v$ = useVuelidate(CompanyClientRules, form);
    const send = async () => {
      v$.value.$validate();
      try {
        if (v$.value.$invalid) {
          throw new Error("Не все поля заполнены");
        }
        $q.loading.show({
          delay: 0,
          message: "Сохранение данных",
        });
        const sentForm = {...form.value}
        delete sentForm.company_status
        await store.dispatch("company/UpdateCompanyClient", sentForm);
        let res = store.getters["company/getCompanyClient"];
        if (res) {
          $q.notify({
            color: "positive",
            message: res.message,
            icon: "done",
            position: "top-right",
          });
          $q.loading.hide();
          emit("getNewData");
        }
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
      companyData,
      setCompanyData,
      send,
      legalToActual,
      legalToMail,
      actualToMail,
      company_type_options,
      company_status_options,
      utility_options,
      id,
      copyAddress,
    };
  },
});
</script>
