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
        :to="`/company/single=${id}`"
        exact
        label="Общие данные"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/company/single=${id}/bank`"
        exact
        label="Банковские реквизиты"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/company/single=${id}/date`"
        exact
        label="Учёт в налоговых органах"
      />

      <q-route-tab
        v-if="role === 'Главный администратор' || role === 'Администратор'"
        active-class="tab__active"
        :to="`/company/single=${id}/staff`"
        exact
        label="Сотрудники"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/company/single=${id}/documents`"
        exact
        label="Документы"
      />
      <q-route-tab
        active-class="tab__active"
        :to="`/company/single=${id}/tariffs`"
        exact
        label="Тарифы услуг сервиса"
      />
    </q-tabs>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "CompanyClientServiceTab",
  props: {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    }
  },
});
</script>
