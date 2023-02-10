import {computed, ref} from "vue";
import {helpers, required} from "@vuelidate/validators";

let formData = {
  company_id: null,
  client_id: null,
  house_id: null,
  // group_data: null,
  type_payment_documents: ref(1),
  services_position:ref([]),
  site:null,
  app_phone:null,
  vote:null,
  chat:null,
  info: "",
  notifications: "",
  user_company_id: "",
};

let rulesData = computed(() => {
  return {
  }
});

export {formData, rulesData};
