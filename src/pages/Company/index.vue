<template>
  <q-page class="bg-white">
    <ToolBar
      :routeData="breadcrumbs"
      :section="section"
    />
    <template v-if="!isLoading">
      <ListCompany v-if="$route.fullPath === '/company'"/>
      <router-view/>
    </template>
  </q-page>
</template>

<script>
import ToolBar from "components/ui/ToolBar";
import {computed, defineComponent, onMounted, ref} from "vue";
import {useQuasar} from "quasar";
import {useRoute} from "vue-router";
import ListCompany from "pages/Company/ListCompany/ListCompany";
import {useStore} from "vuex";

export default defineComponent({
  name: "CompanyPage",
  components: {ListCompany, ToolBar},

  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const isLoading = ref(true);
    const store = useStore();
    const section = "Управление";
    const breadcrumbs = computed(() => {
        return route.matched.reduce((acc, cur, index) => {
          if (index === 1) {
            acc.push({url: cur.path, title: cur.meta.title})
          }
          if (index === 2) {
            if (cur.path.split('/').slice(-1).includes("create")) {
              acc.push({url: cur.path, title: cur.meta.title})
            } else {
              console.log(cur.path.split('/').includes("client"))
              cur.path = cur.path.replace(/:id/, route.params.id)
              if (cur.path.split('/').includes("client")) {
                const company = store.getters["company/getCompanyClient"]
                acc.push({url: cur.path, title: company.company_name})
              } else {
                const company = store.getters["company/getCompanySingle"]
                acc.push({url: cur.path, title: company.company_name})
              }
            }
          }
          return acc
        }, [
          {
            url: "", title: section
          }
        ])
      }
    )
    onMounted(async () => {
      try {
        isLoading.value = false
      } catch (e) {
        $q.notify({
          color: "negative",
          message: e.response.data.errors.message,
          icon: "warning",
          position: "top-right",
        });
      }
    })

    return {
      isLoading,
      breadcrumbs,
      section
    }
  },
});
</script>
