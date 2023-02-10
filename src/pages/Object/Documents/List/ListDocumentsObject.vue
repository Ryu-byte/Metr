<template>
  <div class="component_container">
    <ObjectDocumentsFilter @close="toggleFilter" :is-show="filterActive" :serviceFilter="true" @FilterForm="FilterForm"/>
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
            <q-btn
              class="btn btn__add"
              size="14px"
              dense
              no-caps
              @click="router.push(`${route.fullPath}` + `/create`)"
              label="Добавить документ"
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
              <div class="actions" v-if="selected.length > 0">
                <q-btn-group style="border-radius: 0">
                  <q-btn
                    icon="img:svg/document-download.svg"
                    data-tooltip="Скачать"
                  />
                  <q-btn
                    @click="removeItems"
                    icon="img:svg/trash.svg"
                    data-tooltip="Удалить"
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
import { defineComponent, onMounted, reactive, watch, ref } from "vue";
import { useRoute } from "vue-router";
import UI from "src/lib/Table";
import { cloneDeep } from "lodash";
import apiList from "src/lib/ApiList";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import SearchBar from "components/ui/Search/SearchBar";
import CustomPagination from "components/ui/CustomPagination";
import { useRouter } from "vue-router/dist/vue-router";
import ObjectDocumentsFilter from "components/Object/ObjectDocumentsFilter";
import { getEnumOptions } from "src/lib/helpers";

export default defineComponent({
  name: "ListDocumentsObject",
  components: {ObjectDocumentsFilter, SearchBar, CustomPagination },
  setup() {
    let route = useRoute();
    let router = useRouter();
    const $q = useQuasar();
    const id = route.params.id;
    const selected = ref([]);
    const filterActive = ref(false);
    const filter = reactive({
      search: null,
      filter: null,
    });
    const type_document_options = getEnumOptions("getDocumentType");

    let house_id = id;
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("name_document", "Название документа", true, "left"),
        new UI.TableColumn("type_document", "Тип документа", true, "left"),
      ])
    );
    const editItem = (evt, row) => {
      router.push(`${route.fullPath}` + `/single=${row.id}`);
    };
    const toggleFilter = () => {
      filterActive.value = !filterActive.value;
      document.body.style.overflow = filterActive.value ? "hidden" : "auto";
    };
    const removeItems = async () => {
      for (const item of selected.value) {
      }
      await loadData();
      selected.value = [];
    };
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form);
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
      try {
        $q.loading.show({
          delay: 400,
        });
        pagination =
          pagination && pagination.pagination
            ? pagination.pagination
            : Table.pagination;
        Table.loading = true;
        apiList.objectDocument
          .list(pagination, filter, house_id)
          .then((res) => {
            Table.loading = false;
            if (res) {
              Table.assign(res);
              Table.list.forEach((item) => {
                item.type_document =
                  type_document_options[item.type_document - 1].label;
              });
            }
          })
        $q.loading.hide();
      } catch (err) {
        $q.notify({
          color: "negative",
          message: err.response.data.errors.message,
          icon: "warning",
          position: "top-right",
        });
      }
    }
    return {
      id,
      loadData,
      filter,
      route,
      router,
      Table: Table,
      toggleFilter,
      FilterForm,
      removeItems,
      selected,
      filterActive,
      editItem,
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
