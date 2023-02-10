<template>
  <div class="account__turnover_balances_sheet">
    <div class="row name_container">
      <div class="col-md-12">
        <span class="name">Оборотно-сальдовая ведомость:</span>
        <DateInput
          class="name-date"
          label=""
          name=""
          style-date="input_date"
          title=""/>
      </div>
    </div>
    <div class="row account__turnover_balances_sheet-table">
      <div class="col-md-12">
        <q-table
            wrap-cells
          class="table"
          :rows="TableTurnoverBalancesSheet.list"
          :columns="TableTurnoverBalancesSheet.columns"
          no-data-label="Нет данных"
          row-key="id"
          separator="cell"
          v-model:pagination="TableTurnoverBalancesSheet.pagination"
          hide-pagination
          color="primary"
          table-header-class="table__header"
        />
<!--        @request="loadData"-->
      </div>
    </div>
  </div>

</template>

<script>
import {defineComponent, reactive} from "vue";
import DateInput from "components/ui/DateInput/DateInput";
import UI from "src/lib/Table";

export default defineComponent({
  name: "AccountTurnoverBalanceSheet",
  components: {
    DateInput
  },
  setup() {
    const TableTurnoverBalancesSheet = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("company_name", "Счет", true, "left"),
        new UI.TableColumn("type_service", "Сумма оплаты", true, "left"),
        new UI.TableColumn("formulaName", "Дата оплаты", true, "left"),
        new UI.TableColumn("formulaName", "Промежуточный баланс", true, "left"),
        new UI.TableColumn("formulaName", "Счет", true, "left"),
        new UI.TableColumn("formulaName", "Пени", true, "left"),
        new UI.TableColumn("formulaName", "Начисление за период", true, "left"),
        new UI.TableColumn("formulaName", "Начисление за период", true, "left"),
        new UI.TableColumn("formulaName", "Перерасчет", true, "left"),
        new UI.TableColumn("formulaName", "Счет", true, "left"),
      ])
    );
    return {
      TableTurnoverBalancesSheet,
    }
  }
});

</script>

<style scoped>

</style>

