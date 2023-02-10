import {computed, reactive} from "vue";
import {email, helpers, integer, required} from "@vuelidate/validators";

let CompanyClientForm = {
  company_full_name: null,
  company_name: null,
  company_status: null,
  company_type: null,
  inn: null,
  kpp: null,
  ogrn: null,
  legal_address: "",
  actual_address: "",
  mail_address: "",
  manager: null,
  phone: null,
  email: null,
  site: null,
  utility: []
};

const CompanyClientRules = computed(() => {
  return {
    company_full_name: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    company_name: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    company_type: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    company_status: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    inn: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
      integer: helpers.withMessage(
        "Поле должно содержать только цифры",
        integer
      ),
    },
    kpp: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
      integer: helpers.withMessage(
        "Поле должно содержать только цифры",
        integer
      ),
    },
    ogrn: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
      integer: helpers.withMessage(
        "Поле должно содержать только цифры",
        integer
      ),
    },
    manager: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    phone: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    email: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    legal_address: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    actual_address: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    mail_address: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
  };
});

let CompanyClientDocForm = reactive({
  type_document: "",
  name_document: "",
  number_document: "",
  date_document: "",
  status_agreement: true,
  government: "",
});
let CompanyClientDocRules = computed(() => {
  return {
    type_document: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    name_document: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    number_document: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    date_document: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
  };
});

export {
  CompanyClientForm,
  CompanyClientRules,
  CompanyClientDocForm,
  CompanyClientDocRules,
};
