import {computed} from "vue";
import {helpers, required} from "@vuelidate/validators";

let formData = {
  type_flat: null,
  type_of_flat: null,
  flat_id: null,
  type_meter: null,
  name_meter: null,
  brand: null,
  number_meter: null,
  date_exploitation: null,
  date_end_verification: null,
  status_meter: null,
  type_tariff_meter: null,
  previous_indication: null,
  current_indication: null,
  indication_base: null,
  house_id: null,
};

let rulesData = computed(() => {
  return {
    type_flat: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    type_of_flat: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    flat_id: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    type_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    name_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    brand: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    type_tariff_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    number_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    date_exploitation: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    date_end_verification: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    status_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    previous_indication: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    indication_base: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },

  }
});

export {formData, rulesData};
