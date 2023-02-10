<template>
  <main>
    <div class="component_container">
      <AccountFilter
        @close="toggleFilter"
        :is-show="filterActive"
        :accountsFilter="true"
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
              class="btn btn__load q-mr-sm"
              label="Загрузить реестр ЛС"
              no-caps
            />
            <q-btn
              class="btn btn__add"
              size="14px"
              dense
              no-caps
              @click="router.push('/account/create')"
              label="Добавить ЛС"
              icon="img:svg/add.svg"
            />
          </div>
        </div>
        <div>
          <q-table
              wrap-cells
            class="table object_accounts"
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
            <template v-slot:body-cell-status_account="props">
              <q-td
                v-if="props.row.status_account === 'Открыт'"
                class="status__true"
                :props="props"
              >
                {{ props.row.status_account }}
              </q-td>
              <q-td v-else class="status__false" :props="props">
                {{ props.row.status_account }}
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
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { cloneDeep, forEach } from "lodash";
import AccountFilter from "components/Account/AccountFilter";

export default {
  name: "ListAccounts",
  components: { AccountFilter, SearchBar, CustomPagination },

  setup() {
    const selected = ref([]);
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const store = useStore();
    const id = route.params.id;
    const filter = reactive({
      search: null,
      filter: null,
    });
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("fio", "Плательщик", true, "left"),
        new UI.TableColumn("address", "Объект", true, "left"),
        new UI.TableColumn("type_flat", "Тип помещения", true, "left"),
        new UI.TableColumn(
          "type_of_flat",
          "Наименование помещение",
          true,
          "left"
        ),
        new UI.TableColumn("apartment", "Номер помещения", true, "left"),
        new UI.TableColumn("number_of_account", "Лицевой счет", true, "left"),
        new UI.TableColumn("total_square", "Площадь помещения", true, "left"),
        new UI.TableColumn("debt", "Задолженность", true, "left"),
        new UI.TableColumn("status_account", "Статус", true, "left"),
      ])
    );
    const editItem = (evt, row) => {
      router.push(`/account/single=${row.id}`);
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
        apiList.account
          .list(pagination, filter)
          .then((res) => {
            Table.loading = false;
            if (res) {
              const TypeFlat = store.getters["enums/getTypeFlats"];
              const TypeOfFlat = store.getters["enums/getTypeOfFlat"];
              Table.assign(res);
              Table.list.forEach((item) => {
                item.type_flat = TypeFlat[item.type_flat];
                item.type_of_flat = TypeOfFlat[item.type_of_flat];
                item.status_account =
                  item.status_account === true ? "Открыт" : "Закрыт";
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
        $q.loading.hide();
      } catch (e) {
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
      }
    }

    const filterActive = ref(false);
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
    return {
      id,
      filter,
      Table,
      loadData,
      selected,
      filterActive,
      toggleFilter,
      FilterForm,
      editItem,
      removeItems,
      router,
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
