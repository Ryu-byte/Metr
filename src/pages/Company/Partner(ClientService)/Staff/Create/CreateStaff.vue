<template>
  <div class="component_container">
    <div class="forms">
      <main>
        <div class="tittle q-mb-lg">Добавить сотрудника</div>
        <div class="row">
          <div class="col-md-6 q-pr-md">
            <TextInput
              name="fio"
              v-model="form.name"
              placeholder="Укажите ФИО"
              type="text"
              label="ФИО соотрудника:"
              :success-message="v$.name"
            />
          </div>
          <div class="col-md-6 q-pl-md q-pr-md">
            <TextInput
              name="position"
              v-model="form.position"
              placeholder="Укажите должность"
              type="text"
              label="Должность:"
              :success-message="v$.position"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 q-pr-md">
            <TextInput
              label="Контактный телефон:"
              name="tel"
              v-model="form.phone"
              id="phone"
              v-maska="['+7 (###) ###-##-##', '+7 (###) ###-##-##']"
              placeholder="Укажите контактный телефон"
              :success-message="v$.phone"
              type="tel"
            />
          </div>
          <div class="col-md-4 q-pl-md q-pr-md">
            <TextInput
              label="Email:"
              name="email"
              v-model="form.email"
              id="email"
              type="email"
              placeholder="Укажите email"
              :success-message="v$.email"
            />
          </div>
          <div class="col-md-4 q-pl-md">
            <SelectMultiple
              label="Выберите роль в организации"
              name="role"
              title="Роль в системе:"
              v-model="form.role"
              :model-option="role_options"
              :success-message="v$.role"
            />
          </div>
        </div>
        <div class="tittle q-mb-lg">Права доступа</div>
        <div class="row">
          <div v-for="(permission, index) in permissions" :key="index" class="col-md-6 q-mb-lg">
            <div :class="active_class(index)">
              <PermissionComponent
                :title="permission.title"
                :permission="permission.children"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <q-btn
              @click="send"
              no-caps
              label="Cохранить"
              class="btn btn__save btn__continue btn__margin"
            />
          </div>
        </div>
      </main>
    </div>
  </div>

</template>

<script>
import {computed, defineComponent, reactive} from "vue";
import {useStore} from "vuex";
import {useQuasar} from "quasar";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import TextInput from "components/ui/input/TextInput";
import {formData, rulesData} from "src/setup/Company/Staff"
import _, {cloneDeep, forEach} from "lodash";
import useVuelidate from "@vuelidate/core";
import {useRoute, useRouter} from "vue-router";
import {maska} from "maska";
import PermissionComponent from "components/Permission";
import Roles from "src/Enum/Roles";

export default defineComponent({
    name: "CreateStaff",
    components: {PermissionComponent, SelectMultiple, TextInput},
    directives: {
      maska
    },
    setup() {
      const store = useStore();
      const $q = useQuasar();
      const route = useRoute();
      const router = useRouter();
      const form = reactive(cloneDeep(formData));
      let v$ = useVuelidate(rulesData, form);
      const user = store.getters["user/getUser"];
      const company_id = route.params.id;
      const permissions = reactive(cloneDeep(user.user.permissions));
      permissions.forEach(permission => {
        delete permission.id
        permission.children.forEach(children => {
          delete children.id
          children.parent_id = null
          children.view = children.path + '_view'
          children.create = children.path + '_create'
        })
      });
      const active_class = (index) => {
        return index === 0 || index % 2 === 0 ? "q-pr-md" : "q-pl-md"
      }
      const roles = Roles;
      const role_options = computed(() => {
        if (user.user.roles[0].slug === 'Администратор') {
          return _.filter(roles, (o) => {
            return o.value > 1
          })
        } else {
          return roles
        }
      })

      async function send() {
        v$.value.$validate();
        form.company_id = company_id;
        form.permissions = permissions;
        const sentForm = {...form};
        try {
          if (v$.value.$invalid) {
            throw new Error("Не все поля заполнены");
          }
          $q.loading.show({
            delay: 0,
            message: "Сохранение данных",
          });
          await store.dispatch("company/CreateStaff", sentForm)
          let res = store.getters["company/getStaff"]
            if (res) {
                $q.notify({
                  color: "positive",
                  message: res.message,
                  icon: "done",
                  position: "top-right",
                });
              $q.loading.hide();
              await router.push(`/company/single=${route.params.id}/staff`)
            }
        } catch (e) {
          let message = null;
          message = e.message;
          if (e.response !== undefined) {
            forEach(e.response.data.errors, function (item) {
              message = item;
            });
          }
          $q.notify({
            color: "negative",
            message: message,
            icon: "warning",
            position: "top-right",
          });
          $q.loading.hide();
        }
      }

      return {
        send,
        permissions,
        form,
        v$,
        role_options,
        active_class
      };
    }
    ,
  }
)
;
</script>
