import { computed } from "vue";
import { helpers, required } from "@vuelidate/validators";

let formData = {
  id: null,
  period: null,
  house: null,
  type_flat: null,
  type_of_flat: null,
  flat: null,
  account: null,
  status: null,
  service: null,
  formula: null,
  sum_recalculation: null,
  comment: null,
};

let rulesData = computed(() => {
  return {}
});


export { formData, rulesData };
