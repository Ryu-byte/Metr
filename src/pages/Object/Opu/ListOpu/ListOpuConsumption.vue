<template>
  <ObjectOpuFilter
      @close="toggleFilter"
      :is-show="filterActive"
      :serviceFilter="true"
      @FilterForm="FilterForm"
  />
  <q-pull-to-refresh>
    <div class="row q-mb-lg">
      <div class="col-md-6">
        <div class="row items-center ">   <span style="font-size: 14px" class="text-weight-medium q-mr-md">Период расчёта:
        </span>
          <DateInput
              class="name-date"
              label=""
              name=""
              v-model="period"
              style-date="input_date"
              type="month"
              :emitImmediately="true"
              style="font-size: 11px"
              :read-only="true"
              title=""/>

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
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="type_meter" :props="props">
              {{ props.row.type_meter }}
            </q-td>
            <q-td key="number_meter" :props="props">
              {{ props.row.number_meter }}
            </q-td>
            <q-td key="value_old" :props="props">
              {{ props.row.value_old }}
            </q-td>
            <q-td class="actual_info" key="value_now" :props="props">
              {{ props.row.value_now }}
              <q-popup-edit class="popup_edit" v-model="props.row.value_now" title="Укажите текущее показание:"
                            auto-save v-slot="scope">
                <div class="row">
                  <q-input borderless type="number" v-maska="'#######'" v-model="scope.value"></q-input>
                  <q-btn class="btn btn__save" @click="saveValue(scope.value)" set v-close-popup>Сохранить</q-btn>
                </div>
              </q-popup-edit>
            </q-td>
            <q-td key="value" :props="props">
              {{ props.row.value }}
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
import {useRoute, useRouter} from "vue-router";
import {useQuasar} from "quasar";
import {defineComponent, onMounted, reactive, ref, watch} from "vue";
import {formatUnixDateTime, getEnumOptions} from "src/lib/helpers";
import UI from "src/lib/Table";
import apiList from "src/lib/ApiList";
import DateInput from "components/ui/DateInput/DateInput";
import {maska} from "maska";
import moment from "moment";
import ObjectOpuFilter from "components/Object/ObjectOpuFilter";
import {cloneDeep} from "lodash";

export default defineComponent({
  name: "ListOpuConsumption",
  directives: {
    maska
  },
  components: {ObjectOpuFilter, DateInput, CustomPagination},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    let period = ref(moment().unix());
    const filterActive = ref(false);

    const meterType_options = getEnumOptions("getMeterType")
    let filter = reactive({
      search: null,
      filter: 0,
    });
    const FilterForm = (form) => {
      filter.filter = cloneDeep(form);
    };
    const editItem = (evt, row) => {
      router.push(`${route.fullPath}` + `/single=${row.id}`)
    }
    const toggleFilter = () => {
      filterActive.value = !filterActive.value;
      document.body.style.overflow = filterActive.value ? "hidden" : "auto";
    };
    const Table = reactive(
        new UI.TableContainer("id", false, 10, [
          new UI.TableColumn("type_meter", "Услуга", true, "left"),
          new UI.TableColumn("number_meter", "Заводской номер счетчика", true, "left"),
          new UI.TableColumn("value_old", "Предыдущие показания", true, "left",),
          new UI.TableColumn("value_now", "Текущие показания", true, "left",),
          new UI.TableColumn("value", "Текущие показания", true, "left",)
        ])
    );
    watch(
        () => filter.search,
        () => {
          loadData();
        },
        {deep: true}
    );
    Table.list = [
      {
        id: 1,
        type_meter: 1,
        number_meter: "asdasd",
        value_old: 0,
        value_now: 0,
        value: 12
      },
      {
        id: 2,
        type_meter: 2,
        number_meter: 123123,
        value_old: 0,
        value_now: 0,
        value: 12
      }
    ]
    onMounted(() => {
      loadData();
    });

    function saveValue(value) {
      console.log(value)
    }

    async function loadData(pagination) {
      // pagination =
      //     pagination && pagination.pagination
      //         ? pagination.pagination
      //         : Table.pagination;
      // Table.loading = true;
      // apiList.objectOpu
      //     .list(pagination, filter, route.params.id)
      //     .then((res) => {
      //       Table.loading = false;
      //       if (res) {
      //         Table.assign(res);
      //         Table.list.forEach((item) => {
      //           item.date_end_verification = formatUnixDateTime(item.date_end_verification);
      //           item.type_meter = meterType_options[item.type_meter - 1].label;
      //           item.status_meter = item.status_meter ? 'Работает' : 'Не работает'
      //         });
      //       }
      //     })
      //     .catch((err) => {
      //       $q.notify({
      //         color: "negative",
      //         message: err.response.data.errors.message,
      //         icon: "warning",
      //         position: "top-right",
      //       });
      //     });
      Table.list.forEach((item) => {
        item.type_meter = meterType_options[item.type_meter - 1].label;
      });
      let td = document.querySelectorAll('td.status')
      td.forEach(item => {
        if (item.textContent === 'true') {
          item.classList.add("status__true")
        } else {
          item.classList.add("status__false")
        }
      })
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
      FilterForm
    };
  },
});
</script>
