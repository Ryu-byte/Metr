<template v-if="!isLoading">
  <CompanyClientServiceTab :id="id" :role="role"/>
  <EditCompany
    v-if="$route.fullPath.split('/').slice(-2)[0].includes('company')"
    :data="form"
    @getNewData="getNewData"
  />
  <router-view v-else/>
</template>

<script>
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {useRoute} from "vue-router/dist/vue-router";
import {onMounted, reactive, ref} from "vue";
import {cloneDeep} from "lodash";
import {CompanyClientForm} from "src/setup/Company/CompanyClient/Data";
import CompanyClientServiceTab from "components/Company/CompanyClientServiceTab";
import EditCompany from "pages/Company/Partner(ClientService)/Edit/EditCompany";

export default {
  name: "CompanyLayout",
  components: {EditCompany, CompanyClientServiceTab},
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const store = useStore();
    const id = route.params.id;
    const isLoading = ref(true);
    const user = store.getters["user/getUser"];
    const role = user.user.roles[0].slug;
    const form = reactive(cloneDeep(CompanyClientForm));

    async function loadData() {
      $q.loading.show({
        delay: 400,
      });
      await store.dispatch("company/CompanySingle", route.params.id);
      let data = store.getters["company/getCompanySingle"]
      if (data) {
        for (let key in data) {
          form[key] = data[key]
        }
      }
      $q.loading.hide();
    }

    const getNewData = () => {
      loadData();
    }
    onMounted(async () => {
      await loadData();
    });
    return {
      id,
      form,
      isLoading,
      role,
      getNewData
    }
  }
}
</script>

<style scoped>

</style>
