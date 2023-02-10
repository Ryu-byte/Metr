import { computed } from "vue";
import { helpers, maxValue, numeric, required } from "@vuelidate/validators";

let formData = {
  address: {},
  company_id: null,
  geo_long: null,
  geo_lat: null,
  fias_id: null,
  total_square: 0,
  living_square: 0,
  non_residential_square: 0,
  cleaning_square: 0,
  illuminated_square: 0,
  land_square: 0,
  type_building: 2,
  oktmo: null,
  cadastral_number: null,
  cadastral_number_plot: null,
  serial_type_project: null,
  entrance: null,
  floors: null,
  floors_under: null,
  building_condition: 1,
  year_of_construction: null,
  year_of_commissioning: null,
  wear: null,
  date_of_wear: null,
  state_building: 1,
  energy_class: 1,
  life_cycle: 1,
  is_culture: false,
  is_gas: false,
  is_parking: false,
  is_invalid: false,
};

let rulesData = computed(() => {
  return {
    type_building: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    // cadastral_number: {
    //   required: helpers.withMessage(
    //     "Поле обязательное для заполнения",
    //     required
    //   ),
    // },
    // cadastral_number_plot: {
    //   required: helpers.withMessage(
    //     "Поле обязательное для заполнения",
    //     required
    //   ),
    // },
    // energy_class: {
    //   required: helpers.withMessage(
    //     "Поле обязательное для заполнения",
    //     required
    //   ),
    // },
    year_of_construction: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    state_building: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    year_of_commissioning: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    // date_of_wear: {
    //   required: helpers.withMessage(
    //     "Поле обязательное для заполнения",
    //     required
    //   ),
    // },
    life_cycle: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    total_square: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    living_square: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    non_residential_square: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    cleaning_square: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    illuminated_square: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    land_square: {
      calc: helpers.withMessage(
        "Максимальное значение не больше 10000 ",
        maxValue(10000)
      ),
    },
    oktmo: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    // serial_type_project: {
    //   required: helpers.withMessage(
    //     "Поле обязательное для заполнения",
    //     required
    //   ),
    // },
    entrance: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    floors: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    floors_under: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
    wear: {
      // required: helpers.withMessage(
      //   "Поле обязательное для заполнения",
      //   required
      // ),
      calc: helpers.withMessage(
        "Максимальное значение не больше 100 ",
        maxValue(100)
      ),
    },
  };
});

export { formData, rulesData };
