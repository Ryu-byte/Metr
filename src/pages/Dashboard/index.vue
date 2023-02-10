<template>
  <q-page>
    <div class="toolbar">
      <q-toolbar class="bg-white">
        <q-btn
          class="btn_back q-mr-md"
          @click="this.$router.back()"
          icon="img:svg/arrow-left.svg"
        />
        <div class="row column justify-start">
          <q-breadcrumbs separator=">" class="breadcrumbs">
            <q-breadcrumbs-el to="/" label="Моя организация"/>
          </q-breadcrumbs>
          <q-space></q-space>
          <q-toolbar-title class="title">
            {{ getCompanyName }}
          </q-toolbar-title>
        </div>
      </q-toolbar>
    </div>
      <DashboardTab :role="role"/>
      <main>
        <router-view/>
      </main>
  </q-page>

</template>

<script>
import {computed, defineComponent} from "vue";
import {useStore} from "vuex";
import DashboardTab from "components/Dashboard/DashboardTab";

export default defineComponent({
  name: "DashboardPage",
  components: {DashboardTab},
  setup() {
    const store = useStore();
    const user = store.getters["user/getUser"];
    const getCompanyName = computed(() => {
      return user.company.company_name;
    });
    const role = user.user.roles[0].slug
    return {getCompanyName, role};
  },
});
</script>
