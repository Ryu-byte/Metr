<template v-if="!isLoading">
  <ListDocumentsObject v-if="$route.fullPath.split('/').slice(-1)[0].includes('documents')"/>
  <router-view v-else />
</template>

<script>
import {ref} from "vue";
import ListDocumentsObject from "pages/Object/Documents/List/ListDocumentsObject";
export default {
  name: "DocumentsObject",
  components: {ListDocumentsObject},
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
