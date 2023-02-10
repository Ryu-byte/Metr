<template>
  <div class="component_container">
    <q-pull-to-refresh>
      <div class="row q-mb-lg">
        <div class="col-md-12 flex justify-end">
          <q-btn
            class="btn btn__load q-mr-sm"
            size="14px"
            label="Сформировать"
            no-caps />
          <q-btn
            class="btn btn__add"
            size="14px"
            dense
            no-caps
            label="Опубликовать" />
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
          <template v-slot:bottom="scope">
            <div class="actions" v-if="selected.length > 0">
              <q-btn-group style="border-radius: 0">
                <q-btn
                  icon="img:svg/document-download.svg"
                  data-tooltip="Скачать"
                />
                <q-btn
                  icon="img:svg/document-printer.svg"
                  data-tooltip="Печать"
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
import CustomPagination from "components/ui/CustomPagination";
import apiList from "src/lib/ApiList";
import UI from "src/lib/Table";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  name: "ListAccounts",
  components: { CustomPagination },

  setup() {
    const selected = ref([]);
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const id = route.params.id;

    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("address", "Объект", true, "left"),
        new UI.TableColumn("period", "Период", true, "left"),
        new UI.TableColumn("number_of_account", "Лицевой счет", true, "left"),
        new UI.TableColumn("accrued", "Начислено", true, "left"),
        new UI.TableColumn("paid", "Оплачено", true, "left"),
        new UI.TableColumn("date_to_pay", "Дата оплаты", true, "left"),
      ])
    );
    onMounted(() => {
      loadData();
    });

    async function loadData(pagination) {
      // $q.loading.show({
      //   delay: 400,
      // });
      // try {
      //   pagination =
      //     pagination && pagination.pagination
      //       ? pagination.pagination
      //       : Table.pagination;
      //   Table.loading = true;
      //   apiList.account.list(pagination, filter).then((res) => {
      //     Table.loading = false;
      //     if (res) {
      //       const TypeFlat = store.getters["enums/getTypeFlats"];
      //       const TypeOfFlat = store.getters["enums/getTypeOfFlat"];
      //       Table.assign(res);
      //       Table.list.forEach((item) => {
      //         item.type_flat = TypeFlat[item.type_flat];
      //         item.type_of_flat = TypeOfFlat[item.type_of_flat];
      //         item.status_account =
      //           item.status_account === true ? "Открыт" : "Закрыт";
      //       });
      //     }
      //   });
      //   $q.loading.hide();
      // } catch (e) {
      //   $q.notify({
      //     color: "negative",
      //     message: e.response.data.errors.message,
      //     icon: "warning",
      //     position: "top-right",
      //   });
      // }
    }

    return {
      id,
      Table,
      loadData,
      selected,
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
