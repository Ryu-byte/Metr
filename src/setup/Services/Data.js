import {computed} from "vue";
import {helpers, required} from "@vuelidate/validators";

let formData = {
  client_id: null,
  type_service: null,
  service: null,
  name: null,
  units: null,
  formula: null,
  coefficient: 1,
  normative: 1,
  // service_pact: null,
  tariff: [
    {
      id: null,
      tariff: null,
      type_flat: [],
      house: [
        {
          house_id: null,
          normative_odn: 1,
        }
      ],
    },
  ],
};

let rulesData = computed(() => {
  return {
    client_id: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    type_service: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    service: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    name: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    units: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    formula: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    coefficient: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    normative: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
  };
});
let rulesTariff = computed(() => {
  return {
    tariff: {
      $each: helpers.forEach({
        tariff: {
          required: helpers.withMessage(
            "Поле обязательное для заполнения",
            required
          ),
        },
        house: {
          required: helpers.withMessage(
            "Поле обязательное для заполнения",
            required
          ),
        },
      }),
    },
  };
});

export {formData, rulesData, rulesTariff};
