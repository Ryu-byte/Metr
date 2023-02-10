<template>
  <div class="component_container">
    <ObjectFlatFilter @close="toggleFilter" :is-show="filterActive" :serviceFilter="true" @FilterForm="FilterForm"/>
    <q-pull-to-refresh>
      <div class="row q-mb-lg">
        <div class="col-md-6">
          <SearchBar title="Поиск" v-model="filter.search" :table-search="true"/>
        </div>
        <div class="col-md-6 flex justify-end">
          <q-btn
            @click="toggleFilter"
            class="btn btn__filter"
            icon="img:svg/filter-search.svg"
            label="Фильтры"
            no-caps
          />
          <q-btn
            icon="img:svg/add_2.svg"
            no-caps
            class="btn btn__download q-mr-sm"
            label="Загрузить реестр помещений"
          />
          <q-btn
            class="btn btn__add"
            size="14px"
            dense
            no-caps
            @click="router.push(`${route.fullPath}` + `/create`)"
            label="Добавить помещение"
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
            <div class="actions" v-if="selected.length > 0" @click="removeItems">
              <q-btn-group style="border-radius: 0">
                <q-btn
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
  </div>
</template>

<script>
import {defineComponent, onMounted, reactive, watch, ref} from "vue";
import SearchBar from "components/ui/Search/SearchBar";
import CustomPagination from "components/ui/CustomPagination";
import {useRoute} from "vue-router/dist/vue-router";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import UI from "src/lib/Table";
import apiList from "src/lib/ApiList";
import {cloneDeep} from "lodash";
import {useRouter} from "vue-router";
import {api} from "src/lib/axios";
import ObjectFlatFilter from "components/Object/ObjectFlatFilter";

export default defineComponent({
  name: "ListFlats",
  components: {
    ObjectFlatFilter,
    SearchBar,
    CustomPagination,
  },
  setup() {

    let route = useRoute();
    let router = useRouter();
    const $q = useQuasar();
    const store = useStore();
    let id = route.params.id
    let house_id = id;
    const selected = ref([])
    const filterActive = ref(false);
    const filter = reactive({
      search: null,
      filter: null,
    });
    const toggleFilter = () => {
      filterActive.value = !filterActive.value
      document.body.style.overflow = filterActive.value ? 'hidden' : 'auto'
    }
    const removeItems = async () => {
      for (const item of selected.value) {
        await api.delete(`admin/house/flat/single=${item.id}`)
      }
      await loadData()
      selected.value = []
    }
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form)
    }
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("apartment", "Номер помещения", true, "left"),
        new UI.TableColumn("total_square", "Общая площадь", true, "left"),
        new UI.TableColumn("entrance", "Подъезд", true, "left"),
        new UI.TableColumn("floor", "Этаж", true, "left"),
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

    function loadData(pagination) {
      pagination =
        pagination && pagination.pagination
          ? pagination.pagination
          : Table.pagination;
      Table.loading = true;
      apiList.objectFlat
        .list(pagination, filter, house_id)
        .then((res) => {
          Table.loading = false;
          if (res) {
            const type_flat = store.getters["enums/getTypeFlats"]
            const type_of_flat = store.getters["enums/getTypeOfFlat"]
            Table.assign(res);
            Table.list.forEach(item => {
              item.type_flat = type_flat[item.type_flat]
              item.type_of_flat = type_of_flat[item.type_of_flat]
              item.total_square = item.total_square + ' м2'
            })
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

    return {
      id,
      filter,
      Table: Table,
      filterActive,
      loadData,
      toggleFilter,
      removeItems,
      editItem,
      FilterForm,
      getSelectedString() {
        return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
      },
      selected,
      route,
      router,
    };
  },
});
</script>
