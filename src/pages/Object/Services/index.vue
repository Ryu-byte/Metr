<template>
  <div class="component_container">
    <ServiceFilter
      @close="toggleFilter"
      :is-show="filterActive"
      :serviceFilter="true"
      @FilterForm="FilterForm"
    />
    <main>
      <q-pull-to-refresh>
        <div class="row q-mb-lg">
          <div class="col-md-6">
            <SearchBar title="Поиск" v-model="filter.search" :table-search="true" />
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
    </main>
  </div>
</template>

<script>
import { defineComponent, reactive, onMounted, ref, watch } from "vue";
import ObjectTab from "../../../components/Object/ObjectTab.vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import SearchBar from "components/ui/Search/SearchBar";
import UI from "src/lib/Table";
import apiList from "src/lib/ApiList";
import CustomPagination from "components/ui/CustomPagination";
import { cloneDeep } from "lodash";
import ServiceFilter from "components/Service/ServiceFilter";
import ServiceType from "src/Enum/ServiceType";
import Units from "src/Enum/Units";
import { useStore } from "vuex";

export default defineComponent({
  name: "ServicesIndex",
  components: { ServiceFilter, SearchBar, CustomPagination },
  setup() {
    let route = useRoute();
    const $q = useQuasar();
    let store = useStore();
    let id = route.params.id;
    const filterActive = ref(false);
    const filter = reactive({
      search: null,
      filter: null,
    });
    const toggleFilter = () => {
      filterActive.value = !filterActive.value;
      document.body.style.overflow = filterActive.value ? "hidden" : "auto";
    };
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form);
    };
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("company_name", "Организация", true, "left"),
        new UI.TableColumn("service", "Услуга", true, "left"),
        new UI.TableColumn("type_service", "Тип услуги", true, "left"),
        new UI.TableColumn("tariff", "Тариф", true, "left"),
        new UI.TableColumn("name", "Название услуги в квитанции", true, "left"),
        new UI.TableColumn("units", "Единицы измерения", true, "left"),
      ])
    );

    function loadData(pagination) {
      pagination =
        pagination && pagination.pagination
          ? pagination.pagination
          : Table.pagination;
      Table.loading = true;
      apiList.objectService
        .list(pagination, filter, id)
        .then((res) => {
          Table.loading = false;
          if (res) {
            const serviceType = store.getters["enums/getServiceType"];
            const units = store.getters["enums/getServiceUnits"];
            const service = store.getters["enums/getService"];
            Table.assign(res);
            Table.list.forEach((item) => {
              item.type_service = serviceType[item.type_service];
              item.units = units[item.units];
              item.service = service[item.service];
              item.tariff = item.tariff + " руб.";
            });
          }
        })
        .catch((err) => {
          $q.notify({
            color: "negative",
            message: err.response.data.errors.message,
            icon: "warning",
            position: "top-right",
          });
        });
    }

    watch(
      () => filter.search,
      () => {
        loadData();
      },
      { deep: true }
    );
    watch(
      () => filter.filter,
      () => {
        loadData();
      },
      { deep: true }
    );
    onMounted(() => {
      loadData();
    });
    return {
      id,
      filter,
      Table,
      loadData,
      toggleFilter,
      FilterForm,
      filterActive,
    };
  },
});
</script>
