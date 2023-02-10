<template>
  <main>
    <div class="component_container">
      <ObjectFilter
        @close="toggleFilter"
        :is-show="filterActive"
        @FilterForm="FilterForm"
      />
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
            <q-btn
              class="btn btn__add"
              size="14px"
              dense
              no-caps
              @click="router.push('/objects/create')"
              label="Добавить объект"
              icon="img:svg/add.svg"
            />
          </div>
        </div>
        <div>
          <q-table
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
            <template v-slot:body-cell-status_document="props">
              <q-td
                v-if="props.row.status_document === 'Действует'"
                class="status__true"
                :props="props"
              >
                {{ props.row.status_document }}
              </q-td>
              <q-td v-else class="status__false" :props="props">
                {{ props.row.status_document }}
              </q-td>
            </template>
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
import {
  defineComponent,
  onMounted,
  reactive,
  watch,
  ref,
} from "vue";
import SearchBar from "components/ui/Search/SearchBar";
import UI from "src/lib/Table";
import CustomPagination from "components/ui/CustomPagination";
import apiList from "src/lib/ApiList";
import { useQuasar } from "quasar";
import {formatUnixDate, getEnumOptions} from "src/lib/helpers";
import { useRouter } from "vue-router/dist/vue-router";
import { api } from "src/lib/axios";
import { cloneDeep, forEach } from "lodash";
import ObjectFilter from "components/Object/ObjectFilter";
import TypeBuilder from "src/Enum/TypeBuilder";
import { useStore } from "vuex";

export default defineComponent({
  name: "ListObject",
  components: { ObjectFilter, SearchBar, CustomPagination },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const selected = ref([]);
    const filterActive = ref(false);
    const status_document_options = getEnumOptions("getDocumentStatus");
    const store = useStore();
    const id = store.getters["user/getUser"].company.id;
    const filter = reactive({
      search: null,
      filter: null,
    });
    const toggleFilter = () => {
      filterActive.value = !filterActive.value;
      document.body.style.overflow = filterActive.value ? "hidden" : "auto";
    };
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("address", "Адрес объекта", true, "left"),
        new UI.TableColumn(
          "company_name",
          "Обслуживающая организация",
          true,
          "left"
        ),
        new UI.TableColumn("type_building", "Тип дома", true, "left"),
        new UI.TableColumn("number_document", "Номер договора", true, "left"),
        new UI.TableColumn(
          "count_accounts",
          "Кол-во открытых ЛС",
          true,
          "left"
        ),
        new UI.TableColumn("total_square", "Общая площадь", true, "left"),
        new UI.TableColumn("status_document", "Статус договора", true, "left"),
      ])
    );
    let setDate = (unix) => {
      return formatUnixDate(unix, false);
    };
    const editItem = (evt, row) => {
      router.push(`/objects/single=${row.id}`);
    };
    const removeItems = async () => {
      for (const item of selected.value) {
        await api.delete(`/admin/house/single=${item.id}`);
      }
      await loadData();
      selected.value = [];
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
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form);
    };

    async function loadData(pagination) {
      pagination =
        pagination && pagination.pagination
          ? pagination.pagination
          : Table.pagination;
      Table.loading = true;
      apiList.object
        .list(pagination, filter, id)
        .then((res) => {
          Table.loading = false;
          if (res) {
            Table.assign(res);
            const type_building = TypeBuilder;
            Table.list.forEach((item) => {
              item.type_building =
                type_building.value[item.type_building - 1].label;
              item.total_square = item.total_square + " м²";
              item.count_accounts = item.count_accounts + " шт.";
              item.status_document = item.status_document ?
                status_document_options[item.status_document - 1].label
                : null;
            });
          }
        })
        .catch((e) => {
          let message = null;
          message = e.message;
          if (e.response !== undefined) {
            forEach(e.response.data.errors, function (item) {
              message = item;
            });
          }
          $q.notify({
            color: "negative",
            message: message,
            icon: "warning",
            position: "top-right",
          });
        });
    }

    return {
      Table: Table,
      filter,
      selected,
      filterActive,
      router,
      refresh: () => {},
      setDate,
      loadData,
      editItem,
      removeItems,
      toggleFilter,
      FilterForm,
      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${rows.length}`;
      },
    };
  },
});
</script>
<style scoped>
.table_th {
  display: table-cell;
  white-space: pre-line;
}
</style>
