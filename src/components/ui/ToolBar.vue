<template>
  <div class="toolbar">
    <q-toolbar class="bg-white">
      <q-btn
        class="btn_back q-mr-md"
        @click="$router.go(-1)"
        icon="img:svg/arrow-left.svg"
      />
      <div class="row column justify-start">
        <q-breadcrumbs
          :separator="'>'"
          class="breadcrumbs"
          gutter="xs"
          active-color=""
        >
          <q-breadcrumbs-el
            v-for="item in breadcrumbs"
            :key="item.title + item.url"
            :to="item.url"
            :label="item.title"
          />
        </q-breadcrumbs>
        <q-space></q-space>
        <q-toolbar-title class="title">{{ routeData[routeData.length - 1].title }}</q-toolbar-title>
      </div>
    </q-toolbar>
  </div>
</template>
<script>
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "ToolBar",
  props: {
    section: {
      type: String,
      required: true,
    },
    routeData: {
      type: [Array],
      required: true
    }
  },
  setup(props) {
    const breadcrumbs = computed(() => {
      return props.routeData.length === 1 ? props.routeData : props.routeData.slice(0, props.routeData.length - 1)
    });
    return {
      breadcrumbs
    }
  }
});
</script>
