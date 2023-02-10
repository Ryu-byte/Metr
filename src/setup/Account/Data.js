import { computed } from "vue";
import { helpers, required } from "@vuelidate/validators";

let formData = {
  number_of_account: null,
  house_id: null,
  type_flat: null,
  type_of_flat: null,
  flat_id: null,
  type_resident: null,
  fio: null,
  phone_resident: null,
  email_resident: null,
  company_name: null,
  company_phone: null,
  company_email: null,
  inn: null,
};

let rulesData = computed(() => {
  return {
    house_id: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },

    flat_id: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    fio: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
  };
});

export { formData, rulesData };
