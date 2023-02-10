import { boot } from "quasar/wrappers";
import { VueRecaptcha } from "vue-recaptcha";
export default boot(({ app }) => {
  app.component("VueRecaptcha", VueRecaptcha);
});
