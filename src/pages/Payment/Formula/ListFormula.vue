<template>
  <main>
    <div class="component_container">
      <q-pull-to-refresh>
        <div class="row q-mb-lg">
          <div class="col-md-6">
            <SearchBar title="Поиск" v-model="filter.search" :table-search="true"/>
          </div>
        </div>
        <div>
          <q-table
              wrap-cells
            class="table formula"
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
          >
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
  </main>
</template>

<script>
import SearchBar from "components/ui/Search/SearchBar";
import CustomPagination from "components/ui/CustomPagination";
import UI from "src/lib/Table";
import {onMounted, reactive, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  name: "ListFormula",
  components: {SearchBar, CustomPagination},

  setup() {
    const router = useRouter();
    const filter = reactive({
      search: null,
    });

    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("service", "Услуга", true, "left"),
        new UI.TableColumn("formula", "Формула", true, "left"),
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
      // $q.loading.show({
      //   delay: 400,
      // });
      Table.list = [
        {
          id: 1,
          service: "Водоотведение",
          formula: "1.1 ВО ПУ (показания прибора учета для водоотведения)\n1.2 ВО потребление\n1.3 ВО норматив"
        },
        {
          id: 2,
          service: "Электроснабжение",
          formula: "2.1 ЭЭ тариф одноставочный\n" +
            "2.2 ЭЭ тариф 2х зон\n" +
            "2.3 ЭЭ тариф 3х зон"
        },
        {
          id: 3,
          service: "Холодная вода",
          formula: "3.1 ХВ потребление\n" +
          "3.2 ХВ норматив"
        },
        {
          id: 4,
          service: "Горячая вода",
          formula: "4.1 ГВ однокомпонентный потребление\n" +
          "4.2 ГВ однокомпонентный норматив\n" +
          "4.3 ГВ двухкомпонентный потребление\n" +
          "4.4 ГВ двухкомпонентный норматив"
        },
        {
          id: 5,
          service: "Газоснабжение (в том числе бытовой газ в баллонах)",
          formula: "5.1 ГАЗ потребление\n" +
          "5.2 ГАЗ норматив"
        },
        {
          id: 6,
          service: "Вывоз мусора",
          formula: "6.1 ТКО жилые раздельное по кол-ву граждан\n" +
          "6.2 ТКО жилые раздельное по общей площади\n" +
          "6.3 ТКО жилые нераздельное по кол-ву граждан\n" +
          "6.4 ТКО жилые нераздельное по площади помещения\n" +
          "6.5 ТКО нежилые раздельное\n" +
          "6.6 ТКО нежилые нераздельное\n" +
          "6.7 ТКО ком.квартира по кол-ву граждан\n" +
          "6.8 ТКО ком.квартира по общей площади"
        },
      ]
      // try {
      //   pagination =
      //     pagination && pagination.pagination
      //       ? pagination.pagination
      //       : Table.pagination;
      //   Table.loading = true;
      //   apiList.company
      //     .list(pagination, filter)
      //     .then((res) => {
      //       Table.loading = false;
      //       if (res) {
      //         Table.assign(res);
      //         Table.list.forEach(item => {
      //           if (item.status) {
      //             item.status = 'Открыт'
      //           } else {
      //             item.status = 'Закрыт'
      //             let td = document.querySelectorAll('td.status')
      // td.forEach(item => {
      //   if(item.textContent === 'true') {
      //     item.classList.add("status__true")
      //   } else {
      //     item.classList.add("status__false")
      //   }
      // })
      //           }
      //         })
      //       }
      //     })
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
      filter,
      Table,
      router,
      loadData,
    };
  }
}
</script>

<style scoped>

</style>
