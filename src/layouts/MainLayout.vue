<template>
  <q-layout view="hHh Lpr lff" class="layout">
    <q-header class="bg-white">
      <q-toolbar elevated class="header__toolbar container">
        <q-toolbar-title class="header__title">
          <q-icon
            style="width: 156px; height: 20px"
            name="img:svg/logo.svg"
          />
        </q-toolbar-title>

        <div class="row items-center no-wrap header__actions">
          <q-btn
            round
            dense
            flat
            style="margin-right: 20px;"
            color="grey-8"
            icon="img:svg/notification.svg"
          >
            <q-badge text-color="white" rounded floating>4</q-badge>
            <q-tooltip>Уведомления</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            outlined
            icon="img:svg/avatar_demo.svg"
            class="q-pr-sm"
            @click="logout"
          >
            <q-tooltip>Профиль</q-tooltip>
          </q-btn>
          <div class="q-pl-sm row items-center no-wrap">
            <div>
              <p class="name q-pl-sm">
                {{ getUser.name }}
              </p>
              <p class="position q-pl-sm text-grey">
                {{ getUser.position }}
              </p>
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      class="bg-white justify-center items-baseline q-pa-sm"
      :width="280"
    >
      <menu-item :item="getUser.userCompany" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import MenuItem from "components/MenuItem/MenuItem";

export default defineComponent({
  name: "MainLayout",
  components: { MenuItem },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    const getUser = computed(() => {
      let item = store.getters["user/getUser"];
      if (!item)
        return {
          name: "",
          position: "Не назначен",
          userCompany: "",
        };
      return {
        name: item.user.name || "",
        position:
          item.user.profile == null
            ? "Не назначен"
            : item.user.profile.position,
        userCompany: item.company || "",
      };
    });
    const leftDrawerOpen = ref(false);
    const value = ref(null);
    const miniState = ref(false);
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };
    const toggleMiniState = () => {
      miniState.value = !miniState.value;
    };
    onMounted(async () => {});
    let logout = async () => {
      await store.dispatch("user/signOut");
      await router.push("/auth/login");
    };
    return {
      leftDrawerOpen,
      toggleMiniState,
      toggleLeftDrawer,
      miniState,
      value,
      getUser,
      logout,
    };
  },
});
</script>
