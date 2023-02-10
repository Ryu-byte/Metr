<template>
  <q-toolbar class="bg-white company__toolbar">
    <q-btn
      class="btn_back q-mr-md"
      @click="this.$router.push('/company')"
      icon="img:svg/arrow-left.svg"
    />
    <div class="row column justify-start">
      <q-breadcrumbs separator=">" class="breadcrumbs">
        <q-breadcrumbs-el to="/" label="Управление" />
        <q-breadcrumbs-el to="/company" label="Мои организации" />
      </q-breadcrumbs>
      <q-space></q-space>
      <q-toolbar-title v-text="CompanyName" class="company__title">
      </q-toolbar-title>
    </div>
  </q-toolbar>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "ClientToolbar",
  props: {
    CompanyName: {
      type: String,
      default: "",
    },
  },
});
</script>
