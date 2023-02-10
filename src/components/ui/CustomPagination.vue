<template>
  <div class="row justify-between items-center q-py-md pagination">
    <div class="row items-center pagination__pages">
      <q-btn
        flat
        dence
        class="pagination__btn"
        icon="img:svg/chevron_left.svg"
        :disable="scope.isFirstPage"
        @click="scope.prevPage"
      />
      <q-pagination
        :boundary-numbers="true"
        :max-pages="6"
        :max="scope.pagesNumber"
        v-model="current"
      />
      <q-btn
        class="pagination__btn"
        flat
        dense
        icon="img:svg/chevron_right.svg"
        :disable="scope.isLastPage"
        @click="scope.nextPage"
      />
      <span>Перейти</span>

      <q-input
        class="pagination__input"
        debounce="500"
        type="number"
        min="1"
        :max="scope.pagesNumber"
        outlined

        dense
        v-model="pageToGo"
      />
    </div>
    <div class="pagination__control">
      <q-select
        outlined
        dense
        emit-value
        map-options
        v-model="rowsPerPage"
        :options="perPageOptions"
      ></q-select>


      <span class="text-caption">Всего записей: {{ scope.pagination.rowsNumber }}</span>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "CustomPagination",
  props: ["scope", "pagination"],
  emits: ["loadData"],
  setup(props, { emit }) {
    const perPageOptions = ref([
      { label: "5 / страницу", value: 5 },
      { label: "10 / страницу", value: 10 },
      { label: "20 / страницу", value: 20 },
      { label: "50 / страницу", value: 50 },
    ]);
    const pageToGo = ref(null);
    const current = computed({
      get: () => props.pagination.page,
      set: (val) => {
        return emit("loadData", {
          pagination: {
            page: Number(val),
            rowsPerPage: Number(props.pagination.rowsPerPage),
          },
        });
      },
    });
    watch(pageToGo, (val) => {
      if (val > props.scope.pagesNumber) {
        emit("loadData", {
          pagination: {
            page: Number(props.scope.pagesNumber),
            rowsPerPage: Number(props.pagination.rowsPerPage),
          },
        });
      } else if (val == 0) {
        emit("loadData", {
          pagination: {
            page: 1,
            rowsPerPage: Number(props.pagination.rowsPerPage),
          },
        });
      } else {
        emit("loadData", {
          pagination: {
            page: Number(val),
            rowsPerPage: Number(props.pagination.rowsPerPage),
          },
        });
      }
    });
    let load = (val) => {
      return emit("loadData", {
        pagination: {
          page: Number(val),
          rowsPerPage: Number(props.pagination.rowsPerPage),
        },
      });
    };

    let rowsPerPage = computed({
      get: () => props.pagination.rowsPerPage,
      set: (val) => {
        return emit("loadData", {
          pagination: {
            page: Number(props.pagination.page),
            rowsPerPage: Number(val),
          },
        });
      },
    });
    return {
      current,
      rowsPerPage,
      perPageOptions,
      pageToGo,
      load,
    };
  },
});
</script>
