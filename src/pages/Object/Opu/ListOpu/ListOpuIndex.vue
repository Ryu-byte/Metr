<template>
  <div class="component_container">
    <main>
      <p class="text-weight-medium q-mb-md">Разделы</p>
      <div class="q-mb-md">
        <q-radio class="text-caption" v-model="type" val="1" label="Приборы учета"/>
        <q-radio class="text-caption" v-model="type" val="2" label="Потребление"/>
      </div>
      <ListOpuMeters v-if="type === '1'"/>
      <ListOpuConsumption v-else-if="type === '2'"/>
    </main>
  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import ListOpuMeters from "pages/Object/Opu/ListOpu/ListOpuMeters";
import ListOpuConsumption from "pages/Object/Opu/ListOpu/ListOpuConsumption";

export default defineComponent({
  name: "ListOpu",
  components: {ListOpuMeters, ListOpuConsumption},
  setup() {
    return {
      type: ref("2")
    };
  },
});
</script>
