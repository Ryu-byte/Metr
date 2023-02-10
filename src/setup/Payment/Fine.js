import { computed } from "vue";
import { helpers, required } from "@vuelidate/validators";

let formData = {
  client_id: null,
  type_service: null,
  service: null,
  house: null,
  date_receipt: null,
  date_payment: null,
  bet_size: null,
  bet_rate: null,
  dayDelay: null,
};

let rulesData = computed(() => {
  return {}
});


export { formData, rulesData };
