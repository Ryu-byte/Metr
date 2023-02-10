<template>
  <div class="component_container">
    <q-pull-to-refresh>
      <h3 class="tittle q-mb-lg">
        Сотрудники
      </h3>
      <q-separator style="margin-bottom: 20px;"/>
      <div class="row q-mb-lg">
        <div class="col-md-6">
          <SearchBar title="Поиск" v-model="filter.search" :table-search="true"/>
        </div>
        <div class="col-md-6 flex justify-end">
          <q-btn
            class="btn btn__add"
            size="14px"
            dense
            no-caps
            @click="router.push(`${route.fullPath}` + `/create`)"
            label="Добавить сотдурника"
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
import SearchBar from "components/ui/Search/SearchBar";
import CustomPagination from "components/ui/CustomPagination";
import apiList from "src/lib/ApiList";
import UI from "src/lib/Table";
import {onMounted, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {api} from "src/lib/axios";

export default {
  name: "ListStaff",
  components: {SearchBar, CustomPagination},

  setup() {
    const selected = ref([]);
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const store = useStore();
    const company_id = route.params.id;
    const filter = reactive({
      search: null,
    });
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("name", "ФИО", true, "left"),
        new UI.TableColumn("position", "Должность", true, "left"),
        new UI.TableColumn("role", "Роль в системе", true, "left"),
        new UI.TableColumn("phone", "Контакты", true, "left"),
      ])
    );

    const removeItems = async () => {
      for (const item of selected.value) {
        await api.delete(`admin/user/single=${item.id}`)
      }
      await loadData();
      selected.value = [];
    };
    const editItem = (evt, row) => {
      router.push(`${route.fullPath}` + `/single=${row.id}`)
    };

    watch(
      () => filter.search,
      () => {
        loadData();
      },
      {deep: true}
    );
    onMounted(() => {
      $q.loading.show({
        delay: 400,
      });
      loadData();
      $q.loading.hide();
    });

    async function loadData(pagination) {
      try {
        pagination =
          pagination && pagination.pagination
            ? pagination.pagination
            : Table.pagination;
        Table.loading = true;
        apiList.user.list(pagination, filter, company_id).then((res) => {
          Table.loading = false;
          if (res) {
            Table.assign(res);
            Table.list.forEach((item) => {
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
      Table,
      selected,
      route,
      router,
      filter,
      loadData,
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
