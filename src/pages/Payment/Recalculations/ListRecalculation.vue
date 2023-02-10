<template>
  <div v-if="$route.fullPath.split('/').slice(-1)[0].includes('recalculations')" class="component_container">
    <PaymentRecalculationFilter @close="toggleFilter" :is-show="filterActive" :serviceFilter="true"
                                @FilterForm="FilterForm"/>
    <q-pull-to-refresh>
      <div class="row q-mb-lg">
        <div class="col-md-6">
          <SearchBar title="Поиск" v-model="filter.search" :table-search="true"/>
        </div>
        <div class="col-md-6 flex justify-end">
          <q-btn
            @click="toggleFilter"
            class="btn btn__filter q-mr-sm"
            icon="img:svg/filter-search.svg"
            label="Фильтры"
            no-caps
          />
          <q-btn
            class="btn btn__add"
            size="14px"
            dense
            no-caps
            @click="router.push(`${route.fullPath}` + `/create`)"
            label="Добавить перерасчет"
            icon="img:svg/add.svg"
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
          selection="multiple"
          v-model:selected="selected"
          row-key="id"
          @request="loadData"
          separator="cell"
          v-model:pagination="Table.pagination"
          hide-pagination
          :selected-rows-label="getSelectedString"
          color="primary"
          table-header-class="table__header recalculation"
          @row-dblclick="editItem"
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
  <router-view v-else/>
</template>

<script>
import SearchBar from "components/ui/Search/SearchBar";
import CustomPagination from "components/ui/CustomPagination";
import apiList from "src/lib/ApiList";
import ServiceFilter from "components/Service/ServiceFilter";
import UI from "src/lib/Table";
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {api} from "src/lib/axios";
import {cloneDeep} from "lodash";
import PaymentRecalculationFilter from "components/Payment/PaymentRecalculationFilter";

export default {
  name: "ListRecalculation",
  components: {PaymentRecalculationFilter, SearchBar, CustomPagination},

  setup() {
    const selected = ref([])
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const id = route.params.id;
    const filterActive = ref(false);
    const filter = reactive({
      search: null,
      filter: null,
    });
    const toggleFilter = () => {
      filterActive.value = !filterActive.value
      document.body.style.overflow = filterActive.value ? 'hidden' : 'auto'
    }
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form)
    }
    let status_class = ref('status')
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("company_name", "Период", true, "left"),
        new UI.TableColumn("type_service", "Дата добавления перерасчёта", true, "left"),
        new UI.TableColumn("service", "Объект", true, "left"),
        new UI.TableColumn("name", `Тип помещ.`, true, "left"),
        new UI.TableColumn("units", "Наимен помещ.", true, "left"),
        new UI.TableColumn("formulaName", "Номер помещ.", true, "left"),
        new UI.TableColumn("formulaName", "Лицевой счет", true, "left"),
        new UI.TableColumn("formulaName", "Статус ЛС", true, "left", status_class),
        new UI.TableColumn("formulaName", "Услуга", true, "left"),
        new UI.TableColumn("formulaName", "Пени начислено", true, "left"),
        new UI.TableColumn("formulaName", "Сумма перерасчёта", true, "left"),
        new UI.TableColumn("formulaName", "Комментарий", true, "left"),
      ])
    );
    const editItem = (evt, row) => {
      router.push(`${route.fullPath}` + `/single=${row.id}`)
    }
    watch(
      () => filter.search,
      () => {
        loadData();
      },
      {deep: true}
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
      Table.list = [
        {
          id: 1
        }
      ]
      // $q.loading.show({
      //   delay: 400,
      // });
      // try {
      //     pagination =
      //       pagination && pagination.pagination
      //         ? pagination.pagination
      //         : Table.pagination;
      //     Table.loading = true;
      //     apiList.service
      //       .list(pagination, filter)
      //       .then((res) => {
      //           Table.loading = false;
      //           if (res) {
      //             Table.assign(res);
      //             Table.list.forEach(item => {
      //                 if (item.status) {
      //                   item.status = 'Открыт'
      //                 } else {
      //                   item.status = 'Закрыт'
      //                 }
      //                 let td = document.querySelectorAll('td.status')
      //                 td.forEach(item => {
      //                   if (item.textContent === 'true') {
      //                     item.classList.add("status__true")
      //                   } else {
      //                     item.classList.add("status__false")
      //                   }
      //                 })
      //               }
      //             )
      //           }
      //         }
      //       )
      //     $q.loading.hide();
      //   } catch
      //     (e) {
      //     $q.notify({
      //       color: "negative",
      //       message: e.response.data.errors.message,
      //       icon: "warning",
      //       position: "top-right",
      //     });
      //   }
    }


    return {
      id,
      filter,
      Table,
      selected,
      filterActive,
      router,
      route,
      loadData,
      toggleFilter,
      FilterForm,
      editItem,
      getSelectedString() {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
      }
    };
  }
}
</script>

<style scoped>

</style>
