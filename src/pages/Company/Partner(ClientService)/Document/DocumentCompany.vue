<template v-if="!isLoading">
  <ListDocuments v-if="$route.fullPath.split('/').slice(-1)[0].includes('documents')"/>
  <router-view v-else />
</template>

<script>
import {ref} from "vue";
import ListDocuments from "pages/Company/Partner(ClientService)/Document/ListDocuments/ListDocuments";
export default {
  name: "DocumentsCompany",
  components: {ListDocuments},
  setup() {
    const isLoading = ref(true);
    return {
      isLoading
    }
  }
}
</script>

<style scoped>

</style>


