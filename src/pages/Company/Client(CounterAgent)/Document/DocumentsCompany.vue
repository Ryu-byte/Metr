<template v-if="!isLoading">
  <ListDocumentsCounterAgent v-if="$route.fullPath.split('/').slice(-1)[0].includes('documents')"/>
  <router-view v-else />
</template>

<script>
import {ref} from "vue";
import ListDocumentsCounterAgent
  from "pages/Company/Client(CounterAgent)/Document/ListDocuments/ListDocumentsCounterAgent";
export default {
  name: "DocumentsCompany",
  components: {ListDocumentsCounterAgent},
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
