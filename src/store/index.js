import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import user from "./user";
import company from "./company";
import role from "./role";
import permission from "./permission";
import auth from "./auth";
import object from "./object";
import utility from "./utility";
import document from "./document";
import service from "./service";
import createPersistedState from "vuex-persistedstate";
import enums from "./enums";
import account from "src/store/account";
import paymentDocument from "src/store/paymentDocument";


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  return createStore({
    modules: {
      user,
      company,
      role,
      permission,
      auth,
      object,
      utility,
      document,
      service,
      enums,
      account,
      paymentDocument
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
    plugins: [
      createPersistedState({
        key: "vuex",
        paths: [
          "user.user",
          "company.CompanyClient.company_name",
          "enums",
          "company.CompanyClient.company_status",
          "object.Object",
        ],
      }),
    ],
  });
});
