<template>
    <div class="component_container">
      <PaymentDocFilter
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
              @click="router.push(`${route.fullPath}` + `/create`)"
              label="Сформировать шаблон ПД"
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
              >
                <q-btn-group style="border-radius: 0">
                  <q-btn
                    icon="img:svg/document-download.svg"
                    data-tooltip="Скачать"
                  />
                  <q-btn
                    icon="img:svg/document-printer.svg"
                    data-tooltip="Печать"
                  />
                  <q-btn
                    icon="img:svg/document-report.svg"
                    data-tooltip="Отчет"
                  />
                  <q-btn
                    icon="img:svg/document-edit.svg"
                    data-tooltip="Редактировать"
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
    </div>
</template>

<script>
import SearchBar from "components/ui/Search/SearchBar";
import CustomPagination from "components/ui/CustomPagination";
import Formula from "src/Enum/Formula";
import apiList from "src/lib/ApiList";
import ServiceFilter from "components/Service/ServiceFilter";
import UI from "src/lib/Table";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { api } from "src/lib/axios";
import {cloneDeep, forEach} from "lodash";
import PaymentDocFilter from "components/PaymentDoc/PaymentDocFilter";
import TypeBuilder from "src/Enum/TypeBuilder";

export default {
  name: "ListPaymentDocs",
  components: {PaymentDocFilter, SearchBar, CustomPagination },

  setup() {
    const selected = ref([]);
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const store = useStore();
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
        new UI.TableColumn("house", "Объект", true, "left"),
        new UI.TableColumn("type_document", "Тип документа", true, "left"),
        new UI.TableColumn("service", "Услуга", true, "left"),
        new UI.TableColumn("company", "Организация исполнителя", true, "left"),
        new UI.TableColumn("client", "Наименование получателя", true, "left"),
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
      pagination =
        pagination && pagination.pagination
          ? pagination.pagination
          : Table.pagination;
      Table.loading = true;
      apiList.paymentDocument
        .list(pagination, filter)
        .then((res) => {
          Table.loading = false;
          if (res) {
            Table.assign(res);
            Table.list.forEach((item) => {
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
