<template>
  <q-page>
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
        <q-toolbar-title class="company__title">
          Мои организации
        </q-toolbar-title>
      </div>
    </q-toolbar>
    <main>
      <router-view />
    </main>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "CreateCompany",
});
</script>

<style scoped></style>
