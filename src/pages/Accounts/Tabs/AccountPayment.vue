<template>
  <div class="account__payment">
    <div class="row name_container">
      <div class="row items-center ">
        <span class="name">Период начислений и платежей:</span>
        <DateInput
          class="name-date"
          label=""
          style="width: 183px"
          style-date="input_date"
          name=""
          title=""/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-7 q-pr-md">
        <span>Список начислений</span>
        <div class="account__payment-table">
          <q-table
              wrap-cells
            class="table"
            :rows="TableAccruals.list"
            :columns="TableAccruals.columns"
            no-data-label="Нет данных"
            row-key="id"
            separator="cell"
            v-model:pagination="TableAccruals.pagination"
            hide-pagination
            color="primary"
            table-header-class="table__header"
          />
<!--          @request="loadData"-->
        </div>
      </div>
      <div class="col-md-5 q-pl-md">
        <span>Список платежей</span>
        <div class="account__payment-table">
          <q-table
              wrap-cells
            class="table"
            :rows="TablePayment.list"
            :columns="TablePayment.columns"
            no-data-label="Нет данных"
            row-key="id"
            separator="cell"
            v-model:pagination="TablePayment.pagination"
            hide-pagination
            color="primary"
            table-header-class="table__header"
          />
<!--          @request="loadData"-->
        </div>
      </div>
    </div>
    <div class="row">
      Общая сумма задолженности за период: февраль 2022 — апрель 2022 с учётом оплаты составляет: <span>-499.70 (Минус четыреста девяносто девять рублей, семьдесят копеек)</span>
    </div>
    <div class="row">
      <div class="col-md-12">
        <span>Список долгов по услугам:</span>
        <div class="account__payment-table">
          <q-table
              wrap-cells
            class="table"
            :rows="TableDebts.list"
            :columns="TableDebts.columns"
            no-data-label="Нет данных"
            row-key="id"
            separator="cell"
            v-model:pagination="TableDebts.pagination"
            hide-pagination
            color="primary"
            table-header-class="table__header"
          />
<!--          @request="loadData"-->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {defineComponent, reactive} from "vue";
import DateInput from "components/ui/DateInput/DateInput";
import UI from "src/lib/Table";

export default defineComponent({
  name: "AccountPayment",
  components: {
    DateInput
  },
  setup() {
    const TableAccruals = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("company_name", "Период", true, "left"),
        new UI.TableColumn("type_service", "Начислено", true, "left"),
        new UI.TableColumn("formulaName", "Пени", true, "left"),
      ])
    );
    const TablePayment = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("company_name", "Дата платежа", true, "left"),
        new UI.TableColumn("type_service", "Сумма платежа", true, "left"),
      ])
    );
    const TableDebts = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("company_name", "Вид платежа", true, "left"),
        new UI.TableColumn("type_service", "Начислено", true, "left"),
        new UI.TableColumn("type_service", "Оплачено", true, "left"),
        new UI.TableColumn("type_service", "Долг за период", true, "left"),
      ])
    );
    return {
      TableAccruals,
      TablePayment,
      TableDebts,
    }
  }
});

</script>

<style scoped>

</style>
