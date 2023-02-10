<template>
  <div class="account__fine">
    <div class="row name_container">
      <div class="col-md-10">
        <span class="name">Период начислений пени:</span>
        <DateInput
          class="name-date"
          label=""
          name=""
          style-date="input_date"
          title=""/>
      </div>
      <div class="col-md-2 flex justify-end">
        <div class="actions">
          <q-btn-group>
            <q-btn
              icon="img:svg/document-download.svg"
              data-tooltip="Скачать"
            />
            <q-btn
              icon="img:svg/document-printer.svg"
              data-tooltip="Печать"
            />
          </q-btn-group>
        </div>
      </div>
    </div>
    <div class="row account__fine-table">
      <div class="col-md-5">
        <q-table
            wrap-cells
          class="table"
          :rows="TableFine.list"
          :columns="TableFine.columns"
          no-data-label="Нет данных"
          row-key="id"
          separator="cell"
          v-model:pagination="TableFine.pagination"
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
  name: "AccountFine",
  components: {
    DateInput
  },
  setup() {
    const TableFine = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("company_name", "Пени", true, "left"),
        new UI.TableColumn("type_service", "Начислено", true, "left"),
        new UI.TableColumn("formulaName", "Оплачено", true, "left"),
        new UI.TableColumn("formulaName", "Остаток", true, "left"),
      ])
    );
    return {
      TableFine,
    }
  }
});

</script>

<style scoped>

</style>

