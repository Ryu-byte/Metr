<template>
  <div
    class="row justify-between items-center q-py-md customPagination"
    style="width: 100%"
  >
    <div class="row items-center paginationPages">
      <q-btn padding="0" flat dense icon="chevron_left" disable />
      <q-pagination
        v-model="current"
        :max="5"
        flat
        active-color="primary"
        active-text-color="gorodPrimary"
        text-color="gorodPrimary"
      ></q-pagination>
      <q-btn
        style="margin-right: 22px"
        padding="0"
        flat
        dense
        icon="chevron_right"
        disable
      />
      <span>Всего 44 объекта</span>
    </div>
    <div class="paginationControls">
      <span style="margin-right: 40px">Показывать на странице</span>
      <q-select
        class="paginationSelect inputGray"
        v-model="model"
        :options="options"
        outlined
        dense
        dropdown-icon="expand_more"
        emit-value
        map-options
      ></q-select>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "CustomPagination",
  props: ["scope", "pagination"],
  emits: ["loadData"],
  setup(props, { emit }) {
    const load = () => {
      emit("loadData");
    };

    let pageToGo = ref(null);

    watch(pageToGo, () => {
      if (pageToGo > props.scope.pagesNumber) {
        props.pagination.page = Number(props.scope.pagesNumber);
        emit("loadData");
      } else if (pageToGo === 0) {
        props.pagination.page = Number((pageToGo = 1));
        emit("loadData");
      } else {
        props.pagination.page = Number(pageToGo);
        emit("loadData");
      }
    });
    watch(props.pagination.page, () => {
      pageToGo = null;
    });
    return {
      perPageOptions: ref([
        { label: "10 / страницу", value: 10 },
        { label: "20 / страницу", value: 20 },
        { label: "50 / страницу", value: 50 },
      ]),
      current: ref(3),
      model: ref("10"),
      options: ["10", "20", "50", "100"],

      pageToGo,
      load,
    };
  },
});
</script>

<style lang="scss">
.customPagination {
  position: relative;

  .q-pagination .q-btn {
    width: 36px;
    height: 36px;
    background: transparent !important;
    border: 1px solid $borders-gray;
    border-radius: 4px;
    margin-right: 8px;

    &.text-gorodPrimary {
      border-color: $primary;
    }

    &::before {
      box-shadow: none;
    }
  }

  .q-pagination > .q-btn {
    &:last-child {
      margin-right: 14px;
    }
    &:first-child {
      margin-left: 14px;
    }

    &:nth-child(2),
    &:nth-last-child(2) {
      border: none;
      background: no-repeat center center;
      //url(../public/icons/more_horiz-24px.svg) !important;
      color: #fff !important;

      &:hover {
        background-color: $background-gray !important;
      }
    }
  }

  .paginationSelect {
    height: 36px;
    margin: 0 16px;
    font-size: 16px;
  }
  .q-field__append,
  .q-field__control,
  .q-field__control::before {
    height: 36px;
  }

  & span {
    font-size: 16px;
  }

  .paginationPageInput {
    width: 80px;
    margin-right: 16px;
  }

  .paginationControls {
    display: flex;
    align-items: center;
    //position: absolute;
    right: 0;

    @media (max-width: 1800px) {
      position: static;
    }
  }
}
</style>
