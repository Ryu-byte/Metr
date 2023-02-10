<template>
  <q-page class="bg-white">
    <ToolBar
      :routeData="breadcrumbs"
      :section="section"
    />
    <PaymentTab/>
    <template v-if="!isLoading">
      <ListObjects v-if="$route.fullPath === '/charge'"/>
      <router-view />
    </template>
  </q-page>
</template>
<script>
import ToolBar from "components/ui/ToolBar";
import {computed, defineComponent, onMounted, ref} from "vue";
import {useQuasar} from "quasar";
import ListObjects from "pages/Payment/Objects/ListObjects";
import PaymentTab from "components/Payment/PaymentTab";
import {useRoute} from "vue-router/dist/vue-router";

export default defineComponent({
  name: "PaymentPage",
  components: {ListObjects, PaymentTab, ToolBar},

  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const isLoading = ref(true);
    const section = "Расчёт оплаты";
    const breadcrumbs = computed(() => {
        return route.matched.reduce((acc, cur, index) => {
          if (index === 1) {
            acc.push({url: cur.path, title: cur.meta.title})
          }
          return acc
        },  [
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
