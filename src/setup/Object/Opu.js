import {computed} from "vue";
import {
  helpers,
  required,
} from "@vuelidate/validators";

let formData = {
  name_meter: null,
  type_meter: null,
  type_tariff_meter: null,
  brand: null,
  number_meter: null,
  indication_base: null,
  remote_control: false,
  temperature_sensors: false,
  pressure_sensors: false,
  date_exploitation: null,
  date_end_verification: null,
  status_meter: null,
  house_id: null
};

let rulesData = computed(() => {
  return {
    name_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    type_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    brand: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    number_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    type_tariff_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    date_exploitation: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    date_end_verification: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    indication_base: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    status_meter: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
  }
});

export {formData, rulesData};
