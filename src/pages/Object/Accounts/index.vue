<template>
  <div class="component_container">
    <ObjectAccountFilter
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
          <div class="col-md-6 flex justify-end items-center">
            <q-btn
              @click="toggleFilter"
              class="btn btn__filter q-mr-sm"
              icon="img:svg/filter-search.svg"
              label="Фильтры"
              no-caps
            />
            <TextInput
              name="document"
              type="file"
              @change="uploadFile"
              style="margin: 0"
              style-date="inputFile primary"
              load-icon="img:svg/add_primary.svg"
              load-string="Загрузить реестр ЛС"
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
              <div class="actions" v-if="selected.length > 0">
                <q-btn-group style="border-radius: 0">
                  <q-btn
                    icon="img:svg/document-report.svg"
                    data-tooltip="Отчет"
                  />
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
    </main>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import SearchBar from "components/ui/Search/SearchBar";
import UI from "src/lib/Table";
import apiList from "src/lib/ApiList";
import CustomPagination from "components/ui/CustomPagination";
import { cloneDeep, forEach } from "lodash";
import ObjectAccountFilter from "components/Object/ObjectAccountFilter";
import { useStore } from "vuex";
import TextInput from "components/ui/input/TextInput";
import axios from "axios";

export default defineComponent({
  name: "indexAccounts",
  components: { TextInput, ObjectAccountFilter, SearchBar, CustomPagination },
  setup() {
    let route = useRoute();
    const $q = useQuasar();
    const store = useStore();
    const selected = ref([]);
    let company_id = store.getters["object/getSingleObject"].company_id;
    let id = route.params.id;
    const filterActive = ref(false);
    let filter = reactive({
      search: null,
      type: 0,
    });
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("fio", "Плательщик", true, "left"),
        new UI.TableColumn("type_flat", "Тип помещения", true, "left"),
        new UI.TableColumn("type_of_flat", "Наименование помещения", true, "left"),
        new UI.TableColumn("apartment", "Номер помещения", true, "left"),
        new UI.TableColumn("number_of_account", "Номер ЛС", true, "left"),
        new UI.TableColumn("total_square", "Площадь помещения", true, "left"),
        new UI.TableColumn("residents", `Кол-во зарегистр.`, true, "left"),
        new UI.TableColumn("balance_account", "Задолженность", true, "left"),
        new UI.TableColumn("status_account", "Статус", true, "left"),
      ])
    );
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form);
    };
    const toggleFilter = () => {
      filterActive.value = !filterActive.value;
      document.body.style.overflow = filterActive.value ? "hidden" : "auto";
    };

    const uploadFile = async (e) => {
      let file = e.target.files[0];
      if (file) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("company_id", company_id);
        $q.loading.show({
          message: "Загрузка файла",
          spinnerSize: 100,
          spinnerColor: "primary",
        });
        await axios
          .post("http://dev.metry.land/api/registry/account", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          })
          .then((res) => {
            let message = null;
            if (res.data.data.message) {
              message = res.data.data.message;
            }
            $q.loading.hide();
            $q.notify({
              message: message,
              color: "positive",
              position: "top-right",
            });
            loadData();
          })
          .catch((e) => {
            $q.loading.hide();
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
    };

    function loadData(pagination) {
      pagination =
        pagination && pagination.pagination
          ? pagination.pagination
          : Table.pagination;
      Table.loading = true;
      apiList.objectAccount
        .list(pagination, filter, id)
        .then((res) => {
          Table.loading = false;

          if (res) {
            const TypeFlat = store.getters["enums/getTypeFlats"];
            const TypeOfFlat = store.getters["enums/getTypeOfFlat"];
            Table.assign(res);
            Table.list.forEach((item) => {
              item.type_flat = TypeFlat[item.type_flat];
              item.type_of_flat = TypeOfFlat[item.type_of_flat];
              item.total_square = item.total_square + " м²";
              item.status_account =
                item.status_account === true ? "Открыт" : "Закрыт";
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
      () => filter.type,
      () => {
        loadData();
      },
      { deep: true }
    );
    onMounted(() => {
      loadData();
    });
    return {
      company_id,
      filter,
      Table,
      loadData,
      FilterForm,
      toggleFilter,
      uploadFile,
      getSelectedString() {
        return selected.value.length === 0
          ? ""
          : `${selected.value.length} record${
              selected.value.length > 1 ? "s" : ""
            } selected of ${rows.length}`;
      },
      selected,
      filterActive,
    };
  },
});
</script>
