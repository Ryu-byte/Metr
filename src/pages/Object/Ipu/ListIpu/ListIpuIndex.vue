<template>
  <div class="component_container">
    <main>
      <p class="text-weight-medium q-mb-md">Разделы</p>
      <div class="q-mb-sm">
        <q-radio
          class="text-body1"
          v-model="type"
          val="1"
          label="Приборы учета"
        />
        <q-radio
          class="text-body1"
          v-model="type"
          val="2"
          label="Потребление"
        />
      </div>
      <ListIpuMeters v-if="type === '1'" />
      <ListIpuConsumption v-else-if="type === '2'" />
    </main>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import ListIpuMeters from "pages/Object/Ipu/ListIpu/ListIpuMeters";
import ListIpuConsumption from "pages/Object/Ipu/ListIpu/ListIpuConsumption";

export default defineComponent({
  name: "ListIpu",
  components: { ListIpuConsumption, ListIpuMeters },
  setup() {
    return {
      type: ref("1"),
    };
  },
});
</script>