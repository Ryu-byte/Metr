import {computed} from "vue";
import {helpers, required} from "@vuelidate/validators";

let formData = {
  name: null,
  position: null,
  phone: null,
  email: null,
  role: null,
  permissions: []
};

let rulesData = computed(() => {
  return {
    name: {
      required: helpers.withMessage(
        "Поле обязательное для заполнения",
        required
      ),
    },
  }
});

export {formData, rulesData};
