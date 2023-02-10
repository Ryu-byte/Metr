<template v-if="!isLoading">
  <ListIpu v-if="$route.fullPath.split('/').slice(-1)[0].includes('ipu')"/>
  <router-view v-else />
</template>

<script>
import {ref} from "vue";
import ListIpu from "pages/Object/Ipu/ListIpu/ListIpuIndex";
export default {
  name: "IpuObject",
  components: {ListIpu},
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
