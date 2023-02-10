<template>
  <div class="account__services">
    <div class="row name_container">
      <div class="col-md-12">
        <span class="name">Период действия услуг:</span>
        <DateInput
          class="name-date"
          label=""
          name=""
          style-date="input_date"
          title=""/>
      </div>
    </div>
    <div class="row account__services-table">
      <div class="col-md-12">
        <q-table
            wrap-cells
          class="table"
          :rows="TableServices.list"
          :columns="TableServices.columns"
          no-data-label="Нет данных"
          row-key="id"
          separator="cell"
          v-model:pagination="TableServices.pagination"
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
  name: "AccountServices",
  components: {
    DateInput
  },
  setup() {
    const TableServices = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("company_name", "Период", true, "left"),
        new UI.TableColumn("formulaName", "Услуга", true, "left"),
        new UI.TableColumn("formulaName", "Тип услуги", true, "left"),
        new UI.TableColumn("formulaName", "Тариф", true, "left"),
        new UI.TableColumn("formulaName", "Срок действия услуги", true, "left"),
      ])
    );
    return {
      TableServices,
    }
  }
});

</script>

<style scoped>

</style>

