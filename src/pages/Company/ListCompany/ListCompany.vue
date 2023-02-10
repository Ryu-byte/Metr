<template>
  <main>
    <div class="component_container">
      <CompanyFilter
        @close="toggleFilter"
        :is-show="filterActive"
        :serviceFilter="true"
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
              @click="router.push('/company/create')"
              label="Добавить организацию"
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
            row-key="company_name"
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
import SearchBar from "components/ui/Search/SearchBar";
import CustomPagination from "components/ui/CustomPagination";
import apiList from "src/lib/ApiList";
import UI from "src/lib/Table";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { cloneDeep } from "lodash";
import CompanyFilter from "components/Company/CompanyFilter";
import {formatUnixDateTime, getEnumOptions} from "src/lib/helpers";

export default {
  name: "ListCompany",
  components: {CompanyFilter, SearchBar, CustomPagination },

  setup() {
    const selected = ref([]);
    const router = useRouter();
    const $q = useQuasar();
    const store = useStore();
    const id = store.getters["user/getUser"].company.id;
    const filterActive = ref(false);
    const status_document_options = getEnumOptions("getDocumentStatus");
    const filter = reactive({
      search: null,
      filter: null,
    });

    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("company_name", "Организация", true, "left"),
        new UI.TableColumn(
          "company_status",
          "Статус организации",
          true,
          "left"
        ),
        new UI.TableColumn("company_type", "Тип организации", true, "left"),
        new UI.TableColumn("number_document", "Номер договора", true, "left"),
        new UI.TableColumn(
          "date_start_document",
          "Дата начала договора",
          true,
          "left"
        ),
        new UI.TableColumn(
          "date_end_document",
          "Дата окончания договора",
          true,
          "left"
        ),
        new UI.TableColumn("status_document", "Статус договора", true, "left"),
      ])
    );
    const toggleFilter = () => {
      filterActive.value = !filterActive.value;
      document.body.style.overflow = filterActive.value ? "hidden" : "auto";
    };
    const removeItems = async () => {
      for (const item of selected.value) {
        // await api.delete(`admin/service/single=${item.id}`)
      }
      await loadData();
      selected.value = [];
    };
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form);
    };
    const editItem = (evt, row) => {
      router.push(`/company/single=${row.id}`);
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
        apiList.company.list(pagination, filter, id).then((res) => {
          Table.loading = false;
          if (res) {
            Table.assign(res);
            const company_types = store.getters["enums/getPartnerType"];
            Table.list.forEach((item) => {
              item.date_start_document = formatUnixDateTime(
                item.date_start_document
              );
              item.date_end_document = formatUnixDateTime(
                item.date_end_document
              );
              item.company_type = company_types[item.company_type];
              item.company_status = item.company_status === 1 ? "Клиент сервиса" : "Контрагент";

              // item.status_document = item.status_document ?
              //   status_document_options[item.status_document - 1].label
              //   : null;
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
