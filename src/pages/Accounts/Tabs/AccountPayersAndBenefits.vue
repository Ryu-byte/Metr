<template>
  <div class="account__payers_and_benefits">
    <div class="row name_container">
      <div class="col-md-6">
        <span class="name">Период льгот:</span>
        <DateInput
          class="name-date"
          label=""
          name=""
          style-date="input_date"
          title=""/>
      </div>
    </div>
    <div class="row account__payers_and_benefits-table">
      <div class="col-md-12">
        <q-table
            wrap-cells
          class="table"
          :rows="TablePayersAndBenefits.list"
          :columns="TablePayersAndBenefits.columns"
          no-data-label="Нет данных"
          row-key="id"
          separator="cell"
          v-model:pagination="TablePayersAndBenefits.pagination"
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
  name: "AccountPayersAndBenefits",
  components: {
    DateInput
  },
  setup() {
    const TablePayersAndBenefits = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("company_name", "Период", true, "left"),
        new UI.TableColumn("type_service", "Жилец", true, "left"),
        new UI.TableColumn("formulaName", "Услуга", true, "left"),
        new UI.TableColumn("formulaName", "Тип услуги", true, "left"),
        new UI.TableColumn("formulaName", "Вид льготы", true, "left"),
        new UI.TableColumn("formulaName", "Срок действия льготы", true, "left"),
      ])
    );
    return {
      TablePayersAndBenefits,
    }
  }
});

</script>

<style scoped>

</style>

