<template>
  <main>
    <div class="component_container">
      <ServiceFilter
        @close="toggleFilter"
        :is-show="filterActive"
        @FilterForm="FilterForm"
      />
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
              @click="router.push('/services/create')"
              label="Добавить услугу"
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
            table-header-class="table__header"
            @row-dblclick="editItem"
          >
            <template v-slot:bottom="scope">
              <div
                class="actions"
                v-if="selected.length > 0"
                @click="removeItems"
              >
                <q-btn-group style="border-radius: 0">
                  <q-btn icon="img:svg/trash.svg" data-tooltip="Удалить" />
                </q-btn-group>
              </div>
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
import ServiceFilter from "components/Service/ServiceFilter";
import UI from "src/lib/Table";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { api } from "src/lib/axios";
import { cloneDeep } from "lodash";
import { getEnumOptions } from "src/lib/helpers";

export default {
  name: "ListService",
  components: { ServiceFilter, SearchBar, CustomPagination },

  setup() {
    const selected = ref([]);
    const router = useRouter();
    const $q = useQuasar();
    const formula = getEnumOptions("getFormula");
    let store = useStore();
    let id = store.getters["user/getUser"].company.id;
    const filterActive = ref(false);
    const filter = reactive({
      search: null,
      filter: null,
    });
    const toggleFilter = () => {
      filterActive.value = !filterActive.value;
      document.body.style.overflow = filterActive.value ? "hidden" : "auto";
    };
    const removeItems = async () => {
      for (const item of selected.value) {
        await api.delete(`admin/service/single=${item.id}`);
      }
      await loadData();
      selected.value = [];
    };
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form);
    };
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("company_name", "Организация", true, "left"),
        new UI.TableColumn("type_service", "Тип услуги", true, "left"),
        new UI.TableColumn("service", "Услуги", true, "left"),
        new UI.TableColumn("name", "Название в квитанции", true, "left"),
        new UI.TableColumn("units", "Единица измерения", true, "left"),
        new UI.TableColumn("formula", "Формула расчёта услуги", true, "left"),
      ])
    );
    const editItem = (evt, row) => {
      router.push(`/services/single=${row.id}`);
    };
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

    async function loadData(pagination) {
      $q.loading.show({
        delay: 400,
      });
      try {
        pagination =
          pagination && pagination.pagination
            ? pagination.pagination
            : Table.pagination;
        Table.loading = true;
        apiList.service.list(pagination, filter, id).then((res) => {
          Table.loading = false;
          if (res) {
            const serviceTypes = store.getters["enums/getServiceType"];
            const service = store.getters["enums/getService"];
            const units = store.getters["enums/getServiceUnits"];
            Table.assign(res);
            Table.list.forEach((item) => {
              item.type_service = serviceTypes[item.type_service];
              item.service = service[item.service];
              item.units = units[item.units];
              formula.forEach((formula) => {
                if (formula.value === item.formula) {
                  item.formula = formula.label;
                }
              });
            });
          }
        });
        $q.loading.hide();
      } catch (e) {
        $q.notify({
          color: "negative",
          message: e.response.data.errors.message,
          icon: "warning",
          position: "top-right",
        });
      }
    }

    return {
      id,
      filter,
      Table,
      selected,
      filterActive,
      router,
      loadData,
      toggleFilter,
      FilterForm,
      editItem,
      removeItems,
      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${rows.length}`;
      },
    };
  },
};
</script>

<style scoped></style>
