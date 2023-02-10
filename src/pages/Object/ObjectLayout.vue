<template v-if="!isLoading">
  <ObjectTab :id="id" />
  <EditDataObject
    v-if="$route.fullPath.split('/').slice(-2)[0].includes('objects')"
    :data="form"
    @getNewData="getNewData"
  />
  <router-view v-else />
</template>

<script>
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRoute } from "vue-router/dist/vue-router";
import { onMounted, reactive, ref } from "vue";
import { cloneDeep } from "lodash";
import { formData } from "src/setup/Object/Data";
import EditDataObject from "pages/Object/Edit/EditDataObject";
import ObjectTab from "components/Object/ObjectTab";
import { formatUnixDateTime } from "src/lib/helpers";

export default {
  name: "ObjectLayout",
  components: { ObjectTab, EditDataObject },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const id = route.params.id;
    const isLoading = ref(true);
    const store = useStore();
    const form = reactive(cloneDeep(formData));

    async function loadData() {
      try {
        $q.loading.show({
          delay: 400,
        });
        await store.dispatch("object/getSingleObject", id);
        let data = store.getters["object/getSingleObject"];
        if (data) {
          for (let key in data) {
            if (key.indexOf("date") === 0 || key.indexOf("year") === 0) {
              form[key] = formatUnixDateTime(data[key]);
            } else {
              form[key] = data[key];
            }
          }
        }
        $q.loading.hide();
      } catch (e) {
        let message;
        message = e.message;
        if (e.response !== undefined) {
          message = e.response.data.errors.message;
        }
        $q.notify({
          color: "negative",
          message: message,
          icon: "warning",
          position: "top-right",
        });
      }
    }

    const getNewData = () => {
      loadData();
    };
    onMounted(async () => {
      await loadData();
    });
    return {
      id,
      form,
      isLoading,
      getNewData,
    };
  },
};
</script>

<style scoped></style>
