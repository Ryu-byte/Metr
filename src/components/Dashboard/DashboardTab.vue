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
        to="/dashboard/about"
        exact
        label="Общие данные"
      />
      <q-route-tab
        active-class="tab__active"
        to="/dashboard/bank"
        exact
        label="Банковские реквизиты"
      />
      <q-route-tab

        active-class="tab__active"
        to="/dashboard/credential"
        exact
        label="Учёт в налоговых органах"
      />
      <q-route-tab
        v-if="role === 'Главный администратор' || role === 'Администратор'"
        active-class="tab__active"
        to="/dashboard/user"
        exact
        label="Сотрудники"
      />
      <q-route-tab

        active-class="tab__active"
        to="/dashboard/document"
        exact
        label="Документы"
      />
      <q-route-tab

        active-class="tab__active"
        to="/dashboard/tariffs"
        exact
        label="Тарифы услуг сервиса"
      />
    </q-tabs>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardTab",
  props: {
    role: {
      type: String,
      required: true
    }
  }
});
</script>
