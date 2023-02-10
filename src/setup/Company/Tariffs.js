import {computed} from "vue";
import {helpers, required} from "@vuelidate/validators";

let formData = {
    id: null,
    service: null,
    date_start: null,
    date_end: null,
    format: null,
    price: null,
    tariff_type: null,
    square: null,
  };

let rulesData = computed(() => {
  return {
    service: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
  }
});

export {formData, rulesData};
