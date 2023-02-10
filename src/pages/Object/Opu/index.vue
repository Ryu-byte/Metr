<template v-if="!isLoading">
  <ListOpu v-if="$route.fullPath.split('/').slice(-1)[0].includes('opu')" />
  <router-view v-else />
</template>

<script>
import {ref} from "vue";
import ListDocumentsCounterAgent
  from "pages/Company/Client(CounterAgent)/Document/ListDocuments/ListDocumentsCounterAgent";
import ListOpu from "pages/Object/Opu/ListOpu/ListOpuIndex";
export default {
  name: "OpuObject",
  components: {ListOpu},
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
