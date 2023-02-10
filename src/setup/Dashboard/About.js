import { computed, reactive } from "vue";
import { email, helpers, integer, required } from "@vuelidate/validators";

const DashboardAboutRules = computed(() => {
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
    legal_address: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    email: {
      required: helpers.withMessage(
        "Необходимо указать верный адрес электронной почты",
        email
      ),
    },
    phone: {
      required: helpers.withMessage(
        "Неверный формат номера телефона",
        helpers.regex(
          /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm
        )
      ),
    },
    ogrn: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
  };
});
let DashboardAboutForm = reactive({
  id: "",
  company_full_name: "",
  company_name: "",
  company_type: "",
  inn: "",
  kpp: "",
  ogrn: "",
  legal_address: "",
  actual_address: "",
  mail_address: "",
  phone: null,
  email: "",
  site: "",
});

export { DashboardAboutRules, DashboardAboutForm };
