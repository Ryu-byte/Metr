
import { computed } from "vue";
import { helpers, integer, numeric, required } from "@vuelidate/validators";

let FlatsRules = computed(() => {
  return {
    type_flat: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    apartment: {
      integer: helpers.withMessage(
        "Поле должно содержать только цифры",
        integer
      ),
    },
    total_square: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
      numeric: helpers.withMessage(
        "Поле должно содержать только цифры",
        numeric
      ),
    },
    living_square: {
      numeric: helpers.withMessage(
        "Поле должно содержать только цифры",
        numeric
      ),
    },
    rooms: {
      integer: helpers.withMessage(
        "Поле должно содержать только цифры",
        integer
      ),
    },
    floor: {
      integer: helpers.withMessage(
        "Поле должно содержать только цифры",
        integer
      ),
    },
    cadastral_number: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    residents: {
      integer: helpers.withMessage(
        "Поле должно содержать только цифры",
        integer
      ),
    },
    entrance: {
      integer: helpers.withMessage(
        "Поле должно содержать только цифры",
        integer
      ),
    },
  };
});
export { FlatsRules };
