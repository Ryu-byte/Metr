<template>
  <div class="component_container">
    <q-pull-to-refresh>
      <div class="row q-mb-lg">
        <div class="col-md-6">
          <SearchBar title="Поиск" v-model="filter.search" :table-search="true"/>
        </div>
        <div class="col-md-6 flex justify-end">
          <q-btn
            icon="img:svg/add_2.svg"
            no-caps
            class="btn btn__download q-mr-sm"
            label="Загрузить реестр счетчиков"
          />
          <q-btn
            class="btn btn__add"
            size="14px"
            dense
            no-caps
            @click="router.push(`${route.fullPath}` + `/create`)"
            label="Добавить ИПУ"
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
          row-key="id"
          @request="loadData"
          separator="cell"
          v-model:pagination="Table.pagination"
          hide-pagination
          color="primary"
          table-header-class="table__header"
          @row-dblclick="editItem"
        >
          <template v-slot:body-cell-status_meter="props">
            <q-td
              v-if="props.row.status_meter === 'Работает'"
              class="status__true"
              :props="props">
              {{ props.row.status_meter }}
            </q-td>
            <q-td
              v-else
              class="status__false"
              :props="props">
              {{ props.row.status_meter }}
            </q-td>
          </template>
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
</template>

<script>
import {defineComponent, reactive, onMounted, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useQuasar} from "quasar";
import SearchBar from "components/ui/Search/SearchBar";
import UI from "src/lib/Table";
import apiList from "src/lib/ApiList";
import CustomPagination from "components/ui/CustomPagination";
import {formatUnixDateTime, getEnumOptions} from "src/lib/helpers";
import {useStore} from "vuex";


export default defineComponent({
  name: "ListIpu",
  components: {SearchBar, CustomPagination},
  setup() {
    let route = useRoute();
    let router = useRouter();
    const $q = useQuasar();
    let id = route.params.id;
    let store = useStore();
    let filter = reactive({
      search: null,
      type: 0,
    });
    const meterType_options = getEnumOptions("getMeterType")
    const editItem = (evt, row) => {
      router.push(`${route.fullPath}` + `/single=${row.id}`)
    }
    let house_id = id;
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("type_meter", "Услуга", true, "left"),
        new UI.TableColumn("name_meter", "Название", true, "left"),
        new UI.TableColumn("number_meter", "Заводской номер счетчика", true, "left"),
        new UI.TableColumn("date_end_verification", "Срок окончания поверки", true, "left"),
        new UI.TableColumn("status_meter", "Статус", true, "left"),
      ])
    );
    watch(
      () => filter.search,
      () => {
        loadData();
      },
      {deep: true}
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
        apiList.objectIpu.list(pagination, filter, house_id).then((res) => {
          Table.loading = false;
          if (res) {
            Table.assign(res);
            Table.list.forEach((item) => {
              item.date_end_verification = formatUnixDateTime(item.date_end_verification);
              item.type_meter = meterType_options[item.type_meter - 1].label;
              item.status_meter = item.status_meter ? 'Работает' : 'Не работает'
            });
          }
        });
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
      filter,
      Table: Table,
      loadData,
      editItem,
      route,
      router,
    };
  },
});
</script>
