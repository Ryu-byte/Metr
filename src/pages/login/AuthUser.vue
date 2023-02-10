<template>
  <q-page class="row justify-center items-center link">
    <BaseForm style="background: none" size="s">
      <template v-slot:header>
        <h5 class="title flex justify-center">Вход в личный кабинет</h5>
      </template>
      <template v-slot:body>
        <form class="forms">
          <TextInput
            name="email"
            type="text"
            label=""
            style="margin-bottom: 10px;"
            v-model="form.email"
            placeholder="Телефон или адрес эл. почты"
            :success-message="v$.email"
          />
          <TextInput
            name="password"
            type="password"
            label=""
            v-model="form.password"
            placeholder="Пароль"
            :success-message="v$.password"
          />
          <q-btn
            no-caps
            @click="send"
            style="width: 100%"
            label="Войти"
            class="btn btn__add"
          ></q-btn>
          <div class="row items-center justify-between q-mt-md">
            <router-link to="/auth/reset" class="">Забыли пароль?</router-link>
            <router-link to="/auth/register" class="login__registration"
              >Регистрация
            </router-link>
          </div>
        </form>
      </template>
    </BaseForm>
  </q-page>
</template>

<script>
import { computed, defineComponent, reactive } from "vue";
import BaseForm from "components/ui/Form";
import TextInput from "components/ui/input/TextInput";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { maska } from "maska";

export default defineComponent({
  name: "AuthUser",
  components: { TextInput, BaseForm },
  directives: {
    maska,
  },

  setup() {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const form = reactive({
      email: "",
      password: "",
    });
    const rules = computed(() => {
      return {
        email: {
          required: helpers.withMessage(
            "Поле обязательное для заполнения",
            required
          ),
        },
        password: {
          required: helpers.withMessage(
            "Поле обязательное для заполнения",
            required
          ),
        },
      };
    });
    let v$ = useVuelidate(rules, form);
    const isValidPhone = (phone) => {
      let regex =
        /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
      return regex.test(phone);
    };
    const send = async () => {
      v$.value.$validate();
      try {
        if (v$.value.$error) {
          throw new Error("Не все поля заполнены");
        }
        if (isValidPhone(form.email)) {
          form.phone = form.email;
        }
        if (form.phone == form.email) {
          await store.dispatch("user/login", {
            phone: form.phone,
            password: form.password,
          });
        } else {
          await store.dispatch("user/login", {
            email: form.email,
            password: form.password,
          });
        }

        let res = store.getters["user/getToken"];
        await store.dispatch("user/getUser", res);
        await store.dispatch("enums/getAllEnums");
        await router.push("/");
      } catch (e) {
        let message;
        message = e.message;
        if (e.response !== undefined) {
          message = e.response.data.errors.message;
          if (e.response.data.errors.email) {
            message = e.response.data.errors.email;
          } else if (e.response.data.errors.phone) {
            message = e.response.data.errors.phone;
          }
        }

        $q.notify({
          color: "negative",
          message: message,
          icon: "warning",
          position: "top-right",
        });
      }
    };
    return {
      form,
      v$,
      send,
    };
  },
});
</script>
