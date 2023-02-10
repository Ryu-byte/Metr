<template>
  <main>
    <div class="component_container">
      <q-pull-to-refresh>
        <div class="row q-mb-lg">
          <div class="col-md-6">
            <div class="row items-center ">   <span style="font-size: 14px" class="text-weight-medium q-mr-md">Период расчёта:
        </span>
              <DateInput
                  class="name-date"
                  label=""
                  name=""
                  v-model="period"
                  style-date="input_date"
                  type="month"
                  :emitImmediately="true"
                  style="font-size: 14px"
                  :read-only="true"
                  title=""/>

            </div>
          </div>
        </div>
        <div>
          <q-table
              wrap-cells
            class="table"
            :rows="Table.list"
            :columns="Table.columns"
            no-data-label="Нет данных"
            row-key="id"
            @request="loadData"
            separator="cell"
            v-model:pagination="Table.pagination"
            hide-pagination
            color="primary"
            table-header-class="table__header"
          >
            <template v-slot:bottom="scope">
              <CustomPagination
                :pagination="Table.pagination"
                :scope="scope"
                @loadData="loadData"
              />
            </template>
          </q-table>
        </div>
      </q-pull-to-refresh>
    </div>
  </main>
</template>

<script>
import CustomPagination from "components/ui/CustomPagination";
import apiList from "src/lib/ApiList";
import UI from "src/lib/Table";
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {api} from "src/lib/axios";
import DateInput from "components/ui/DateInput/DateInput";
import moment from "moment";

export default {
  name: "ListObjects",
  components: {DateInput, CustomPagination},

  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const store = useStore();
    const id = route.params.id;

    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("object", "Объект", true, "left"),
        new UI.TableColumn("period", "Период", true, "left"),
        new UI.TableColumn("saldoOutputDebet", "Сальдо вх. — дебет", true, "left"),
        new UI.TableColumn("saldoIncoumeCredit", "Сальдо вх. — кредит", true, "left"),
        new UI.TableColumn("accrued", "Начислено", true, "left"),
        new UI.TableColumn("recalculation", "Перерасчет", true, "left"),
        new UI.TableColumn("privileges", "Льготы", true, "left"),
        new UI.TableColumn("income", "Поступления", true, "left"),
        new UI.TableColumn("saldoOutputDebet", "Сальдо исх. — дебет", true, "left"),
        new UI.TableColumn("saldoOutputCredit", "Сальдо исх. — кредит", true, "left"),
      ])
    );

    onMounted(() => {
      loadData();
    });

    async function loadData(pagination) {
      // $q.loading.show({
      //   delay: 400,
      // });
      Table.list = [
        {
          id: 1,
          puk: null,
          company_status: 1,
        },
        {
          id: 2,
          puk: null,
          company_status: 2
        },
      ]
      // try {
      //   pagination =
      //     pagination && pagination.pagination
      //       ? pagination.pagination
      //       : Table.pagination;
      //   Table.loading = true;
      //   apiList.company
      //     .list(pagination, filter)
      //     .then((res) => {
      //       Table.loading = false;
      //       if (res) {
      //         Table.assign(res);
      //         Table.list.forEach(item => {
      //           if (item.status) {
      //             item.status = 'Открыт'
      //           } else {
      //             item.status = 'Закрыт'
      //             let td = document.querySelectorAll('td.status')
      // td.forEach(item => {
      //   if(item.textContent === 'true') {
      //     item.classList.add("status__true")
      //   } else {
      //     item.classList.add("status__false")
      //   }
      // })
      //           }
      //         })
      //       }
      //     })
      //   $q.loading.hide();
      // } catch (e) {
      //   $q.notify({
      //     color: "negative",
      //     message: e.response.data.errors.message,
      //     icon: "warning",
      //     position: "top-right",
      //   });
      // }
    }


    return {
      id,
      Table,
      router,
      loadData,
      period: ref(moment().unix()),
    };
  }
}
</script>

<style scoped>

</style>
