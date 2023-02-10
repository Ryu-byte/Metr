<template v-if="!isLoading">
  <CompanyCounterAgentTab :id="id"/>
  <EditCompanyCounterAgent
    v-if="$route.fullPath.split('/').slice(-2)[0].includes('client')"
    :data="form"
    @getNewData="getNewData"
  />
  <router-view v-else />
</template>

<script>
import CompanyCounterAgentTab from "components/Company/CompanyCounterAgentTab";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {useRoute} from "vue-router/dist/vue-router";
import {onMounted, reactive, ref} from "vue";
import {cloneDeep} from "lodash";
import {CompanyClientForm} from "src/setup/Company/CompanyClient/Data";
import EditCompanyCounterAgent from "pages/Company/Client(CounterAgent)/Edit/EditCompany";
export default {
  name: "CompanyLayout",
  components: {EditCompanyCounterAgent, CompanyCounterAgentTab},
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const id = route.params.id;
    const isLoading = ref(true);
    const store = useStore();
    const form = reactive(cloneDeep(CompanyClientForm));

    async function loadData() {
      $q.loading.show({
        delay: 400,
      });
      await store.dispatch("company/getSingleCompanyClient", route.params.id);
      let data = store.getters["company/getCompanyClient"]
      if (data) {
        for (let key in data) {
          form[key] = data[key]
        }
      }
      isLoading.value = false
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
      getNewData
    }
  }
}
</script>

<style scoped>

</style>
