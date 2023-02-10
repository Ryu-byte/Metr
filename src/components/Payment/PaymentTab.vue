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
        to="/charge"
        exact
        label="Начисления по объектам"
      />
      <q-route-tab
        active-class="tab__active"
        to="/charge/accounts"
        exact
        label="Начисления по ЛС"
      />
      <q-route-tab
        active-class="tab__active"
        to="/charge/clients"
        exact
        label="Начисления по контрагентам"
      />
      <q-route-tab
        active-class="tab__active"
        to="/charge/fine"
        exact
        label="Пени"
      />
      <q-route-tab
        active-class="tab__active"
        to="/charge/recalculations"
        exact
        label="Перерасчёты"
      />
      <q-route-tab
        active-class="tab__active"
        to="/charge/formula"
        exact
        label="Формула расчёта"
      />
    </q-tabs>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "PaymentTab",
});
</script>
