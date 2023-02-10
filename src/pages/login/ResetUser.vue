<template>
  <q-page
    class="row justify-center items-center link"
  >
    <BaseForm style="background: none" size="sm">
      <template v-slot:header>
        <router-link to="" @click="this.$router.back()">
          <q-icon class="micon blue" size="sm" name="arrow_back" />
        </router-link>
        <h5>Восстановление пароля</h5>
      </template>
      <template v-slot:body>
        <form class="forms">
          <TextInput
            name="email"
            label="Введите ваш телефон или адрес эл. почты"
            placeholder="Телефон или адрес эл. почты"
            type="email"
            v-model="form.email"
            :success-message="v$.email"
          />
          <q-btn no-caps style="width: 100%" class="btn btn__add">Отправить</q-btn>
        </form>
      </template>
    </BaseForm>
  </q-page>
</template>

<script>
import { computed, defineComponent, reactive } from "vue";
import BaseForm from "components/ui/Form";
import TextInput from "components/ui/input/TextInput";
import { email, helpers, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

export default defineComponent({
  name: "ResetUser",
  components: { TextInput, BaseForm },
  setup() {
    const form = reactive({
      email: "",
    });
    const rules = computed(() => {
      return {
        email: {
          required: helpers.withMessage(
            "Поле обязательное для заполнения",
            required,
            email
          ),
        },
      };
    });
    let v$ = useVuelidate(rules, form);
    return {
      form,
      v$,
    };
  },
});
</script>
