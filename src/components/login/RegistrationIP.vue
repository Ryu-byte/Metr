<template>
  <TextInput
      style="margin-bottom: 10px;"
      name="text"
      v-model="form.name"
      id="name"
      type="name"
      placeholder="Введите контактное лицо"
      :success-message="v$.name"
  />
  <TextInput
      style="margin-bottom: 10px;"
      name="email"
      v-model="form.email"
      id="email"
      type="email"
      placeholder="Введите электронную почту"
      :success-message="v$.email"
  />
  <TextInput
      style="margin-bottom: 10px;"
      name="tel"
      v-model="form.phone"
      id="phone"
      v-maska="['+7 (###) ###-##-##', '+7 (###) ###-##-##']"
      placeholder="Введите номер телефона"
      :success-message="v$.phone"
      type="tel"
  />
  <InputDaData
      style="margin-bottom: 10px;"
      token="59226899abf9e4d0157e2834fc109979d7fc5986"
      v-model="form.company_full_name"
      type="party"
      name="company_full_name"
      label=""
      placeholder="Введите название компании"
      :success-message="v$.company_full_name"
      v-model:data="data"
  />
  <SelectMultiple
      name="type"
      label="Тип организации"
      v-model="form.company_type"
      :model-option="TypeCompany"
      style="margin-bottom: 10px;"
      :success-message="v$.company_type"
  />
  <TextInput
      style="margin-bottom: 10px;"
      name="inn"
      v-maska="'################'"
      v-model="form.inn"
      id="company_inn"
      placeholder="Введите ИНН компании"
      :success-message="v$.inn"
  />
  <TextInput
      style="margin-bottom: 10px;"
      v-maska="'##########'"
      name="kpp"
      v-model="form.kpp"
      id="kpp"
      placeholder="Введите КПП компании"
      :success-message="v$.kpp"
  />
  <TextInput
      style="margin-bottom: 10px;"
      name="password"
      v-model="form.password"
      id="password"
      type="password"
      placeholder="Введите пароль"
      :success-message="v$.password"
  />
  <TextInput
      style="margin-bottom: 10px;"
      name="password_confirmation"
      v-model="form.password_confirmation"
      id="password_confirmation"
      type="password"
      placeholder="Подтвердите пароль"
      :success-message="v$.password_confirmation"
  />
  <q-btn no-caps class="btn width-100" color="primary" style="margin-bottom: 15px;" @click="submit">
    Зарегистрироваться
  </q-btn>
  <div class="row column relative-position">
    <q-checkbox color="orange" v-model="form.agreement">
      <span style="font-size: 14px"
      >Отправляя данные вы соглашаетесь с <br/>
        <router-link to="/police">политикой конфиденциальности</router-link>
        сервиса</span
      >
    </q-checkbox>
    <span v-if="v$.agreement.$error" class="forms__error"
    >{{ v$.agreement.$errors[0].$message }}
    </span>
  </div>
</template>

<script>
import {computed, defineComponent, reactive, ref, watch} from "vue";
import TextInput from "components/ui/input/TextInput";
import useVuelidate from "@vuelidate/core";
import {
  email,
  helpers,
  integer,
  minLength,
  required,
  sameAs,
} from "@vuelidate/validators";
import InputDaData from "components/ui/InputDaData/InputDaData";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {forEach} from "lodash";
import {maska} from "maska";
import TypeMainCompany from "src/Enum/TypeCompany";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";

export default defineComponent({
  name: "RegistrationIP",
  components: {SelectMultiple, InputDaData, TextInput},
  props: {
    type: {
      type: [Number, String],
      default: 2,
    },
  },
  directives: {
    maska,
  },
  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const form = reactive({
      name: null,
      email: null,
      phone: null,
      company_full_name: null,
      company_type: null,
      inn: null,
      password: null,
      password_confirmation: null,
      agreement: false,
    });
    const TypeCompany = TypeMainCompany;

    const rules = computed(() => {
      return {
        name: {
          required: helpers.withMessage(
              "Поле обязательное для заполнения",
              required
          ),
          min: helpers.withMessage(
              "Минимальная длина имени - 3 символа",
              minLength(3)
          ),
        },
        email: {
          required: helpers.withMessage(
              "Поле обязательное для заполнения",
              required
          ),
          regularExpression: helpers.withMessage(
              "Неверный формат адреса электронной почты",
              email
          ),
        },
        phone: {
          required: helpers.withMessage(
              "Поле обязательное для заполнения",
              required
          ),
          regularExpression: helpers.withMessage(
              "Неверный формат номера телефона",
              helpers.regex(
                  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm
              )
          ),
        },
        company_full_name: {
          required: helpers.withMessage(
              "Поле обязательное для заполнения",
              required
          ),
        },
        company_type: {
          required: helpers.withMessage(
              "Поле обязательное для заполнения",
              integer
          ),
        },
        inn: {
          required: helpers.withMessage(
              "Поле обязательное для заполнения",
              required
          ),
          integer: helpers.withMessage("Неверный формат ИНН", integer),
        },

        password: {
          required: helpers.withMessage(
              "Поле обязательное для заполнения",
              required
          ),
        },
        password_confirmation: {
          required: helpers.withMessage(
              "Поле обязательное для заполнения",
              required
          ),
          sameAs: helpers.withMessage(
              "Пароли не совпадают",
              sameAs(form.password)
          ),
        },
        agreement: {
          required: helpers.withMessage(
              "Поле обязательное для заполнения",
              sameAs(true)
          ),
        },
      };
    });
    let data = ref({});
    let submit = async () => {
      v$.value.$validate();
      try {
        if (v$.value.$invalid) {
          throw new Error("Не все поля заполнены");
        }
        form.type_user = props.type;
        await store.dispatch("auth/register", form);

        $q.notify({
          position: "top-right",
          type: "positive",
          message:
              "Потвердите ваш аккаунт по ссылке в письме, отправленном на вашу почту",
        });
      } catch (e) {
        let message = null;
        message = e.message;
        if (e.response !== undefined) {
          forEach(e.response.data.errors, function (item) {
            message = item;
          });
          $q.notify({
            position: "top-right",
            type: "negative",
            message: message,
          });
        }
      }
    };
    let v$ = useVuelidate(rules, form);
    watch(
        data,
        (value) => {
          if (value) {
            form.inn = value.data.inn;
          }
        },
        {deep: true}
    );
    return {
      v$,
      form,
      submit,
      data,
      TypeCompany,
    };
  },
});
</script>
