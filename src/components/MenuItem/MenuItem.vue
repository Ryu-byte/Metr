<template>
  <q-card v-if="true" class="card__company">
    <router-link to="/dashboard/about">
      <q-card-section class="card__section" :class="classObject">
        <p class="card__title">{{ item.company_name }}</p>
      </q-card-section>
    </router-link>
  </q-card>
  <q-list v-for="menu in menuItem" :key="menu.title">
    <q-expansion-item
      v-if="menu.is_menu && menu.children.length > 0"
      class="menu menu__list"
      expand-separator
      expand-icon-class="expand__icon"
      :icon="menu.icon"
      :label="menu.title"
    >
      <q-list v-for="subMenu in menu.children" :key="subMenu.title">
        <q-item
          v-if="subMenu.is_menu"
          :to="subMenu.path"
          class="menu__item"
          active-class="menu__item-active"
        >
          <q-item-section>
            <q-item-label>{{ subMenu.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </q-list>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  props: ["item"],
  name: "MenuItem",
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => ({
      active:
        route.path === `/dashboard/about` ||
        route.path === `/dashboard/date` ||
        route.path === `/dashboard/bank` ||
        route.path === `/dashboard/credential` ||
        route.path === `/dashboard/user` ||
        route.path === `/dashboard/document` ||
        route.path === `/dashboard/setting` ||
        route.path === `/dashboard/document/create` ||
        route.path === `/dashboard/document/single=${route.params.id}` ||
        route.path === `/dashboard/user/single=${route.params.id}` ||
        route.path === `/dashboard/user/create`,
    }));

    const store = useStore();
    let menuItem = computed(() => {
      const menu = store.getters["user/getUser"].user.permissions;
      return menu;
    });
    const classObject = computed(() => ({
      active:
        route.path === `/dashboard/about` ||
        route.path === `/dashboard/date` ||
        route.path === `/dashboard/bank` ||
        route.path === `/dashboard/credential` ||
        route.path === `/dashboard/user` ||
        route.path === `/dashboard/document` ||
        route.path === `/dashboard/setting` ||
        route.path === `/dashboard/document/create` ||
        route.path === `/dashboard/document/single=${route.params.id}` ||
        route.path === `/dashboard/user/single=${route.params.id}` ||
        route.path === `/dashboard/user/create`,
    }));

    const items = ref("props.item.items");
    return {
      items,
      isActive,
      classObject,
      menuItem,
    };
  },
});
</script>
