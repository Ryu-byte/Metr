<template>
  <q-page class="bg-white">
    <template v-if="!isLoading">
      <ListStaff v-if="$route.fullPath.split('/').slice(-1)[0].includes('staff')" />
      <router-view v-else/>
    </template>
  </q-page>
</template>

<script>
import ToolBar from "components/ui/ToolBar";
import {computed, defineComponent, onMounted, ref} from "vue";
import {useQuasar} from "quasar";
import {useRoute} from "vue-router";
import ListStaff from "pages/Company/Partner(ClientService)/Staff/ListStaff/ListStaff";

export default defineComponent({
  name: "StaffIndex",
  components: {ListStaff},

  setup() {
    const $q = useQuasar();
    const route = useRoute()
    const isLoading = ref(true);
    const breadcrumbs = computed(() => {
      return route.matched.reduce((acc, cur, index) => {
        if (index) {
          cur.path = cur.path.replace(/:id/, route.params.id)
          acc.push({url: cur.path, title: cur.meta.title})
        }
        return acc
      }, [])
    })

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
      breadcrumbs
    }
  },
});
</script>
