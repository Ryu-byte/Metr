<template>
  <ObjectOpuFilter
    @close="toggleFilter"
    :is-show="filterActive"
    :serviceFilter="true"
    @FilterForm="FilterForm"
  />
  <q-pull-to-refresh>
    <div style="padding-bottom: 24px" class="row">
      <div class="col-md-6">
        <div class="row items-center">
          <span style="font-size: 14px" class="text-weight-medium q-mr-md"
            >Период расчёта:
          </span>
          <DateInput
            class="name-date"
            label=""
            name=""
            v-model="period"
            style-date="input_date"
            type="month"
            :emitImmediately="true"
            style="font-size: 14px"
            :read-only="true"
            title=""
          />
        </div>
      </div>
      <div class="col-md-6 flex justify-end">
        <q-btn
          @click="toggleFilter"
          class="btn btn__filter q-mr-sm"
          icon="img:svg/filter-search.svg"
          label="Фильтры"
          no-caps
        />
      </div>
    </div>
    <div class="q-pt-lg">
      <q-table
        wrap-cells
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
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="type_meter" :props="props">
              {{ props.row.type_meter }}
            </q-td>
            <q-td key="number_meter" :props="props">
              {{ props.row.number_meter }}
            </q-td>
            <q-td key="previous_value" :props="props">
              {{ props.row.previous_value }}
            </q-td>
            <q-td class="actual_info" key="value" :props="props">
              {{ props.row.value }}
              <q-popup-edit
                class="popup_edit"
                v-model="props.row.value"
                title="Укажите текущее показание:"
                auto-save
                v-slot="scope"
              >
                <div class="row">
                  <q-input
                    borderless
                    type="number"
                    v-maska="'#######'"
                    v-model="scope.value"
                  ></q-input>
                  <q-btn
                    class="btn btn__save"
                    @click="saveValue(props.row, scope.value)"
                    set
                    v-close-popup
                    >Сохранить
                  </q-btn>
                </div>
              </q-popup-edit>
            </q-td>
            <q-td key="total" :props="props">
              {{ props.row.total }}
            </q-td>
            <q-td key="day_to_insert" :props="props">
              {{ props.row.day_to_insert }}
            </q-td>
            <q-td key="updated_at" :props="props">
              {{ props.row.updated_at }}
            </q-td>
          </q-tr>
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
</template>

<script>
import CustomPagination from "components/ui/CustomPagination";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import {
  formatUnixDateTime,
  getEnumOptions,
  toPeriodMount,
} from "src/lib/helpers";
import UI from "src/lib/Table";
import apiList from "src/lib/ApiList";
import DateInput from "components/ui/DateInput/DateInput";
import { maska } from "maska";
import moment from "moment";
import ObjectOpuFilter from "components/Object/ObjectOpuFilter";
import { cloneDeep, forEach } from "lodash";
import { api } from "src/lib/axios";

export default defineComponent({
  name: "ListIpuConsumption",
  directives: {
    maska,
  },
  components: { ObjectOpuFilter, DateInput, CustomPagination },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    let period = ref(moment().unix());
    const filterActive = ref(false);

    const meterType_options = getEnumOptions("getMeterType");
    let filter = reactive({
      filter: null,
    });
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form);
    };
    const editItem = (evt, row) => {
      router.push(`${route.fullPath}` + `/single=${row.id}`);
    };
    const toggleFilter = () => {
      filterActive.value = !filterActive.value;
      document.body.style.overflow = filterActive.value ? "hidden" : "auto";
    };
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("type_flat", "Тип помещения", true, "left"),
        new UI.TableColumn("type_of_flat", "Наименование помещения", true, "left"),
        new UI.TableColumn("apartment", "Номер помещения", true, "left"),
        new UI.TableColumn("type_meter", "Услуга", true, "left"),
        new UI.TableColumn(
            "previous_value",
            "Предыдущие показания",
            true,
            "left"
        ),
        new UI.TableColumn("value", "Текущие показания", true, "left"),
        new UI.TableColumn("total", "Объем потребления", true, "left"),
      ])
    );
    const isEdit = computed(() => {
      return false;
    });
    watch(
      () => filter.filter,
      () => {
        loadData();
      },
      { deep: true }
    );
    watch(
      () => period.value,
      () => {
        loadData();
      },
      { deep: true }
    );
    onMounted(() => {
      loadData();
    });

    async function saveValue(row, value) {
      if (value.trim().length > 0) {
        await api
          .post("/admin/meter/ipu/insert-history", {
            id: row.id,
            meter_id: row.ipu_id,
            period: toPeriodMount(period.value),
            house_id: row.house_id,
            value: value,
          })
          .then(() => {
            $q.notify({
              message: "Показания успешно сохранены",
              color: "positive",
              position: "top-right",
              timeout: 2000,
            });
            loadData();
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
      } else {
        $q.notify({
          message: "Показания не могут быть пустыми",
          color: "negative",
          position: "top-right",
          timeout: 2000,
        });
      }
    }

    async function loadData(pagination) {
      pagination =
        pagination && pagination.pagination
          ? pagination.pagination
          : Table.pagination;
      Table.loading = true;
      apiList.objectIpuHistory
        .list(pagination, filter, route.params.id, period.value)
        .then((res) => {
          Table.loading = false;
          if (res) {
            Table.assign(res);
            Table.list.forEach((item) => {
              item.type_meter = meterType_options[item.type_meter - 1].label;
              item.updated_at = formatUnixDateTime(item.updated_at);
              item.day_to_insert = formatUnixDateTime(item.day_to_insert);
              if (
                item.type_meter === "Холодная вода" ||
                item.type_meter === "Горячая вода" ||
                item.type_meter === "Газ"
              ) {
                item.total = item.total + " м3";
                item.previous_value = item.previous_value + " м3";
              }
              if (item.type_meter === "Электричество") {
                item.total = item.total + " кВт";
                item.previous_value = item.previous_value + " кВт";
              }
              if (item.type_meter === "Отопление") {
                item.total = item.total + " Гкал";
                item.previous_value = item.previous_value + " Гкал";
              }
              if (item.type_meter === "Сточные бытовые воды") {
                item.total = item.total + " м3";
                item.previous_value = item.previous_value + " м3";
              }
              if (item.type_meter === "Тепловая энергия") {
                item.total = item.total + " Гкал";
                item.previous_value = item.previous_value + " Гкал";
              }
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
      loadData,
      route,
      router,
      editItem,
      period,
      saveValue,
      toggleFilter,
      filterActive,
      FilterForm,
      isEdit,
    };
  },
});
</script>