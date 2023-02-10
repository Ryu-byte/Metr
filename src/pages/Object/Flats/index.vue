<template v-if="!isLoading">
  <ListFlats v-if="$route.fullPath.split('/').slice(-1)[0].includes('flats')"/>
  <router-view v-else />
</template>

<script>
import {ref} from "vue";
import ListFlats from "pages/Object/Flats/ListFlats/ListFlats";
export default {
  name: "FlatsObject",
  components: {ListFlats},
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
