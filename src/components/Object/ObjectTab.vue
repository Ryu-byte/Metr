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
        :to="`/objects/single=${id}`"
        exact
        label="Общие данные"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/objects/single=${id}/flats`"
        exact
        label="Помещения"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/objects/single=${id}/opu`"
        exact
        label="ОПУ"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/objects/single=${id}/ipu`"
        exact
        label="ИПУ"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/objects/single=${id}/accounts`"
        exact
        label="Лицевые счета"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/objects/single=${id}/services`"
        exact
        label="Услуги"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/objects/single=${id}/documents`"
        exact
        label="Документы"
      />
    </q-tabs>
  </div>
</template>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: "ObjectTab",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
});
</script>
