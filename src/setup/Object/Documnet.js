import { computed, reactive } from "vue";
import { helpers, required } from "@vuelidate/validators";
let DocumentHouseOption = reactive([]);
let DocumentHouseRules = computed(() => {
  return {
    type_document: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    name_document: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    number_document: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    government: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    date_conclusion: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    date_termination: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
    status_document: {
      required: helpers.withMessage("Поле обязательное для заполнения", required),
    },
  };
});
let DocumentHouseForm = {
  files: null,
  type_document: null,
  name_document: null,
  number_document: null,
  date_conclusion: null,
  date_termination: null,
  status_document: null,
  government: null,
};
let DocumentHouseFileInfos = [];

export {
  DocumentHouseOption,
  DocumentHouseRules,
  DocumentHouseForm,
  DocumentHouseFileInfos,
};
