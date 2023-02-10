<template>
  <main>
    <div class="component_container">
      <PaymentClientsFilter @close="toggleFilter" :is-show="filterActive" @FilterForm="FilterForm"/>
      <q-pull-to-refresh>
        <div class="row q-mb-lg">
          <div class="col-md-6 name items-center">
              <span>Период поступления:</span>
              <DateInput
                class="name-date"
                label=""
                name=""
                style-date="input_date"
                title=""/>
            </div>
          <div class="col-md-6 flex justify-end">
            <q-btn
              @click="toggleFilter"
              class="btn btn__filter q-mr-sm"
              icon="img:svg/filter-search.svg"
              label="Фильтры"
              no-caps
            />
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
import SearchBar from "components/ui/Search/SearchBar";
import CustomPagination from "components/ui/CustomPagination";
import apiList from "src/lib/ApiList";
import UI from "src/lib/Table";
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {api} from "src/lib/axios";
import DateInput from "components/ui/DateInput/DateInput";
import ServiceFilter from "components/Service/ServiceFilter";
import {cloneDeep} from "lodash";
import PaymentAgentFilter from "components/Payment/PaymentClientsFilter";
import PaymentClientsFilter from "components/Payment/PaymentClientsFilter";

export default {
  name: "ListClients",
  components: {PaymentClientsFilter, DateInput, CustomPagination},

  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const store = useStore();
    const filterActive = ref(false);
    const filter = reactive({
      filter: null,
    });
    const toggleFilter = () => {
      filterActive.value = !filterActive.value
      document.body.style.overflow = filterActive.value ? 'hidden' : 'auto'
    }
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form)
    }

    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("agent", "Контрагент", true, "left"),
        new UI.TableColumn("period", "Период", true, "left"),
        new UI.TableColumn("balance", "Баланс", true, "left"),
        new UI.TableColumn("toPay", "К оплате", true, "left"),
        new UI.TableColumn("accrued", "Начислено потребителям", true, "left"),
        new UI.TableColumn("received", "Получено", true, "left"),
        new UI.TableColumn("paid", "Оплачено", true, "left"),
        new UI.TableColumn("remainder", "Остаток", true, "left"),
      ])
    );
    watch(
      () => filter.filter,
      () => {
        loadData();
      },
      {deep: true}
    );
    onMounted(() => {
      loadData();
    });

    async function loadData(pagination) {
      // $q.loading.show({
      //   delay: 400,
      // });
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
      filter,
      Table,
      router,
      loadData,
      toggleFilter,
      FilterForm,
      filterActive
    };
  }
}
</script>

<style scoped>

</style>
