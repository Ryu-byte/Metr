import { reactive ,computed} from "vue";
import { helpers, integer } from "@vuelidate/validators";
let CredentialsForm = reactive({
  id: "",
  number: "",
  date: "",
  code: "",
  government: "",
  okpo: "",
  okato: "",
  oktmo: "",
  okfs: "",
  okogu: "",
  okopf: "",
  fcc: "",
  pfr: "",
  type: "",
  type_tax: String(0),
});
const CredentialsRules = computed(() => {
  return {
    number: {
      integer: helpers.withMessage("Должно быть целым числом", integer),
    },
    code: {
      integer: helpers.withMessage("Введите только числа", integer),
    },
    okpo: {
      integer: helpers.withMessage("Введите только числа", integer),
    },
    okato: {
      integer: helpers.withMessage("Введите только числа", integer),
    },
    oktmo: {
      integer: helpers.withMessage("Введите только числа", integer),
    },
    okfs: {
      integer: helpers.withMessage("Введите только числа", integer),
    },
    okogu: {
      integer: helpers.withMessage("Введите только числа", integer),
    },
    okopf: {
      integer: helpers.withMessage("Введите только числа", integer),
    },
    fcc: {
      integer: helpers.withMessage("Введите только числа", integer),
    },
    pfr: {
      integer: helpers.withMessage("Введите только числа", integer),
    },
  };
});
export  {
  CredentialsForm,
  CredentialsRules,
}
