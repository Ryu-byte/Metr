<template>
  <div class="company__permission">
    <div class="company__permission--top row" @click="open">
      <div class="col-md-6">
        <p class="title">{{ title }}</p>
      </div>
      <div class="col-md-6 flex justify-end">
        <q-icon :name="changeArrow" />
      </div>
    </div>
    <transition appear name="slide">
      <div class="company__permission--list" v-if="isOpen">
        <q-separator/>
        <div class="row company__permission--item">
          <div class="col-md-6 subtitle">Подразделы</div>
            <div class="col-md-3 justify-around flex subtitle">Просмотр</div>
            <div class="col-md-3 flex justify-around subtitle">Редактирование</div>
          </div>
        <div class="list q-mb-lg">
          <div
            v-for="(item, index) in permission"
            v-bind:key="index"
            class="row company__permission--subitem items-center"
          >
            <div class="col-md-6">{{ item.title }}:</div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-6 justify-around flex">
                  <q-checkbox
                    :val="item.view"
                    v-model="selection_view"
                    indeterminate-value="view"
                    color="primary"
                    @click="changeValue('view', item)"
                  />
                </div>
                <div class="col-md-6 justify-around flex">
                  <q-checkbox
                    :val="item.create"
                    v-model="selection_create"
                    indeterminate-value="create"
                    color="primary"
                    @click="changeValue('create', item)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-separator/>
        <div class="row items-center company__permission--item">
          <div class="col-md-6 subtitle">Выделить/очистить всё</div>
          <div class="col-md-3 justify-around flex">
            <q-checkbox
              v-model="view_all"
              color="primary"
              @click="changeSelection('view')"
            />
          </div>
          <div class="col-md-3 justify-around flex">
            <q-checkbox
              v-model="create_all"
              color="primary"
              @click="changeSelection('create')"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { ref } from "vue";
import permission from "src/store/permission";

export default defineComponent({
  name: "PermissionComponent",
  props: ["permission", "title"],
  setup(props) {
    let isOpen = ref(false);
    const open = () => {
      isOpen.value = !isOpen.value;
    };
    const changeArrow = computed(() => {
      if (!isOpen.value) {
        return "img:svg/chevron_down.svg";
      } else {
        return "img:svg/chevron_up.svg";
      }
    });
    let checkbox = computed({
      get() {
        return null;
      },
      set(value) {
        return null;
      },
    });
    let view_all = false
    let create_all = false
    const selection_view = ref([])
    const selection_create = ref([])
    const view_options = ref([])
    const create_options = ref([])
    props.permission.forEach(permission => {
      if(permission.is_view) {
        selection_view.value.push(permission.view)
      }
      if(permission.is_create) {
        selection_create.value.push(permission.create)
      }
      create_options.value.push(permission.create)
      view_options.value.push(permission.view)
    })
    const changeValue = (key, item) => {
      item.is_view = key==='view' ? !item.is_view : item.is_view
      item.is_create = key==='create' ? !item.is_create : item.is_create
    }
    const changeSelection = (key) => {
      if (key==='view') {
        view_all = !view_all
        selection_view.value = view_all ? view_options.value : []
        props.permission.forEach(permission => {
          permission.is_view = view_all
        })
      } else {
        create_all = !create_all
        selection_create.value = create_all ? create_options.value : []
          props.permission.forEach(permission => {
            permission.is_create = create_all
          })
      }
    }
    return {
      selection_view,
      selection_create,
      open,
      isOpen,
      changeArrow,
      checkbox,
      view_all,
      create_all,
      changeSelection,
      changeValue
    };
  },
});
</script>

<style scoped></style>
