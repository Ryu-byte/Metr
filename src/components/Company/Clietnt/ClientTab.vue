<template>
  <div class="company_tabs tabs">
    <q-tabs
      indicator-color="#5584FF"
      align="left"
      active-class="q-tab__active"
      narrow-indicator
      dense
      inline-label
      no-caps
    >
      <q-route-tab
        active-class="tab__active"
        :to="'/company/client/single=' + id"
        exact
        label="Общие данные"
      />
      <q-route-tab
        active-class="tab__active"
        :to="'/company/client/bank/single=' + id"
        exact
        label="Банковские реквизиты"
      />
      <q-route-tab
        active-class="tab__active"
        :to="'/company/client/document/single=' + id"
        exact
        label="Документы"
      />
    </q-tabs>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClientTab",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
});
</script>
