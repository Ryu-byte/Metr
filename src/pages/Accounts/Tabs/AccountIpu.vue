<template>
  <div class="account__ipu">
    <div class="row account__ipu-table">
      <div class="col-md-12">
        <q-table
            wrap-cells
          class="table"
          :rows="TableIpu.list"
          :columns="TableIpu.columns"
          no-data-label="Нет данных"
          row-key="id"
          @request="loadData"
          separator="cell"
          v-model:pagination="TableIpu.pagination"
          hide-pagination
          color="primary"
          table-header-class="table__header"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="type" :props="props">
                {{ props.row.type }}
              </q-td>
              <q-td key="number" :props="props">
                {{ props.row.number }}
              </q-td>
              <q-td key="lastInfo" :props="props">
                {{ props.row.lastInfo }}
              </q-td>
              <q-td class="actual_info" key="actualInfo" :props="props">
                {{ props.row.actualInfo }}
                <q-popup-edit class="popup_edit" v-model="props.row.actualInfo" title="Укажите текущее показание:" auto-save v-slot="scope">
                  <div class="row">
                    <q-input borderless type="number" v-model="scope.value"></q-input>
                      <q-btn class="btn btn__save" set v-close-popup>Сохранить</q-btn>
                  </div>
                </q-popup-edit>
              </q-td>
              <q-td key="date_end" :props="props">
                {{ props.row.date_end }}
              </q-td>
              <q-td class="status" key="status" :props="props">
                {{ props.row.status }}
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>

</template>

<script>
import {defineComponent, reactive, ref, onMounted} from "vue";
import UI from "src/lib/Table";
import apiList from "src/lib/ApiList";
import {formatUnixDateTime} from "src/lib/helpers";

export default defineComponent({
  name: "AccountIpu",
  setup() {
    const TableIpu = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("type", "Тип счётчика", true, "left"),
        new UI.TableColumn("number", "Заводской номер счетчика", true, "left"),
        new UI.TableColumn("lastInfo", "Предыдущие показания", true, "left"),
        new UI.TableColumn("actualInfo", "Текущие показания", true, "left"),
        new UI.TableColumn("date_end", "Срок окончания поверки", true, "left"),
        new UI.TableColumn("status", "Статус", true, "left"),
      ])
    );
    TableIpu.list = [
      {
        id: 1,
        type: null,
        number: null,
        lastInfo: null,
        actualInfo: 0,
        date_end: null,
        status: true
      },
      {
        id: 2,
        type: null,
        number: null,
        lastInfo: null,
        actualInfo: 30,
        date_end: null,
        status: false
      }
    ]
    onMounted(() => {
      loadData()
    })

    async function loadData(pagination) {
      // try {
      //   $q.loading.show({
      //     delay: 400,
      //   });
      // pagination =
      //   pagination && pagination.pagination
      //     ? pagination.pagination
      //     : Table.pagination;
      // TableIpu.loading = true;
      // apiList.objectIpu.list(pagination, filter,).then((res) => {
      //   Table.loading = false;
      //   if (res) {
      //     Table.assign(res);
      TableIpu.list.forEach((item) => {
        if (item.status) {
          item.status = 'Работает'
        } else {
          item.status = 'Не работает'
        }
      });
      let td = document.querySelectorAll('td.status')
      td.forEach(item => {
        if(item.textContent === 'true') {
          item.classList.add("status__true")
        } else {
          item.classList.add("status__false")
        }
      })
    }

    //     });
    //     $q.loading.hide();
    //   } catch (err) {
    //     $q.notify({
    //       color: "negative",
    //       message: err.response.data.errors.message,
    //       icon: "warning",
    //       position: "top-right",
    //     });
    //   }
    // }
    // });

    return {
      TableIpu,
    }
  }
});

</script>

<style scoped>

</style>

