<template>
  <AddRecalculation @close="toggleFilter" :is-show="filterActive" :serviceFilter="true" @FilterForm="FilterForm"/>
  <div class="account__recalculations">
    <div class="row name items-center name_container">
      <div class="col-md-6">
        <span class="name">Период перерасчётов:</span>
        <DateInput
          class="name-date"
          label=""
          name=""
          style-date="input_date"
          title=""/>
      </div>
      <div class="col-md-6 flex justify-end">
        <q-btn class="btn btn__add"
               no-caps
               label="Добавить перерасчет"
               @click="toggleFilter"
               icon="img:svg/add.svg"
        />
      </div>
    </div>
    <div class="row account__recalculations-table">
      <div class="col-md-12">
        <q-table
            wrap-cells
          class="table"
          :rows="TableRecalculations.list"
          :columns="TableRecalculations.columns"
          no-data-label="Нет данных"
          row-key="id"

          separator="cell"
          v-model:pagination="TableRecalculations.pagination"
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
import {defineComponent, reactive, onMounted, ref} from "vue";
import DateInput from "components/ui/DateInput/DateInput";
import UI from "src/lib/Table";
import apiList from "src/lib/ApiList";
import {useQuasar} from "quasar";
import AddRecalculation from "components/Account/AddRecalculation";
import {cloneDeep} from "lodash";

export default defineComponent({
  name: "AccountRecalculations",
  components: {
    AddRecalculation,
    DateInput
  },
  setup() {
    const $q = useQuasar();
    const filterActive = ref(false);
    const TableRecalculations = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("period", "Период", true, "left"),
        new UI.TableColumn("date_add", "Дата добавления перерасчета", true, "left"),
        new UI.TableColumn("service", "Услуга", true, "left"),
        new UI.TableColumn("sum", "Сумма перерасчёта", true, "left"),
        new UI.TableColumn("comment", "Комментрарий", true, "left"),
      ])
    );
    TableRecalculations.list = [
      {
        id:1,
        period: "Январь 2022",
        date_add: "20.01.2022",
        service: "Отопление",
        sum: 3000,
        comment: "Холодно же"
      }
    ]
    const toggleFilter = () => {
      filterActive.value = !filterActive.value
      document.body.style.overflow = filterActive.value ? 'hidden' : 'auto'
    }
    const FilterForm = (form) => {
      TableRecalculations.list.push(form)
    }
    // onMounted(() => {
    //   loadData();
    // });
    //
    // async function loadData(pagination) {
    //   $q.loading.show({
    //     delay: 400,
    //   });
    //   try {
    //     pagination =
    //       pagination && pagination.pagination
    //         ? pagination.pagination
    //         : Table.pagination;
    //     TableRecalculations.loading = true;
    //     apiList.service
    //       .list(pagination, filter)
    //       .then((res) => {
    //         TableRecalculations.loading = false;
    //         if (res) {
    //           TableRecalculations.assign(res);
    //           TableRecalculations.list.forEach(item => {
    //           })
    //         }
    //       })
    //     $q.loading.hide();
    //   } catch (e) {
    //     $q.notify({
    //       color: "negative",
    //       message: e.response.data.errors.message,
    //       icon: "warning",
    //       position: "top-right",
    //     });
    //   }
    // }
    return {
      TableRecalculations,
      toggleFilter,
      FilterForm,
      filterActive
    }
  }
});

</script>

<style scoped>

</style>

