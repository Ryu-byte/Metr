<template>
  <q-page class="bg-white">
    <ToolBar
      :routeData="breadcrumbs"
      :section="section"
    />
    <template v-if="!isLoading">
      <ListObject v-if="$route.fullPath === '/objects'"/>
      <router-view v-else/>
    </template>
  </q-page>
</template>

<script>
import ToolBar from "components/ui/ToolBar";
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {useQuasar} from "quasar";
import {useRoute} from "vue-router";
import ListObject from "pages/Object/ListObject/ListObject";
import {cloneDeep} from "lodash";
import {useStore} from "vuex";

export default defineComponent({
  name: "ObjectsPage",
  components: {ListObject, ToolBar},

  setup() {
    const $q = useQuasar();
    const route = useRoute()
    const isLoading = ref(true);
    const store = useStore();
    const section = "Управление"
    const breadcrumbs = computed(() => {
        return route.matched.reduce((acc, cur, index) => {
          if (index === 1) {
            acc.push({url: cur.path, title: cur.meta.title})
          }
          if (index === 2) {
            if (cur.path.split('/').slice(-1).includes("create")) {
              acc.push({url: cur.path, title: cur.meta.title})
            } else {
              cur.path = cur.path.replace(/:id/, route.params.id)
              const object = store.getters["object/getSingleObject"]
              const address = ref("");
              for (let item in object.address) {
                if (
                  object.address[item] &&
                  item !== "region" &&
                  item !== "district"
                ) {
                  if (item === "house") {
                    address.value = address.value + object.address[item];
                  } else {
                    address.value = address.value + object.address[item] + ", ";
                  }
                }
              }
              acc.push({url: cur.path, title: address.value})
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
      section,
      breadcrumbs,
    }
  },
});
</script>
