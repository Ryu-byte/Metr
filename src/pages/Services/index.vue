<template>
  <q-page class="bg-white">
    <ToolBar
      :routeData="breadcrumbs"
      :section="section"
    />
    <template v-if="!isLoading">
      <ListService v-if="$route.fullPath === '/services'"/>
      <router-view v-else/>
    </template>
  </q-page>
</template>

<script>
import ToolBar from "components/ui/ToolBar";
import {computed, defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useQuasar} from "quasar";
import {useRoute} from "vue-router";
import ListService from "pages/Services/List/ListService";

export default defineComponent({
  name: "ServicesPage",
  components: {ListService, ToolBar},

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const route = useRoute()
    const isLoading = ref(true);
    const section = "Расчёт оплаты";
    const breadcrumbs = computed(() => {
      return route.matched.reduce((acc, cur, index) => {
        if (index) {
          acc.push({url: cur.path, title: cur.meta.title});
        }
        return acc;
      },  [
        {
          url: "", title: section
        }
      ]);
    });

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
