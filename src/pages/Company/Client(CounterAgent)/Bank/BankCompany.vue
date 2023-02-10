<template>
  <div class="component_container company">
    <div class="tittle q-mb-lg">Банковские реквизиты</div>
    <div class="forms">
      <div class="row">
        <div class="col-md-3">
          <TextInput
            label="Банк:"
            name="bank_name"
            v-model="form.bank_name"
            type="text"
            placeholder="Укажите название банка"
            :success-message="{ $dirty: true, $error: false }"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <TextInput
            v-model="form.bank_bik"
            label="БИК:"
            type="text"
            name="bank_bik"
            placeholder="Укажите банковский идентификатор"
            :success-message="{ $dirty: true, $error: false }"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <TextInput
            v-model="form.bank_account"
            label="Расчётный счёт:"
            type="text"
            name="bank_account"
            placeholder="Укажите номер расчётного счёта"
            :success-message="{ $dirty: true, $error: false }"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <TextInput
            v-model="form.bank_correspondent_account"
            label="Корреспондентский счёт:"
            type="text"
            name="bank_correspondent_account"
            placeholder="Укажите номер корреспондентского счёта"
            :success-message="{ $dirty: true, $error: false }"
          />
        </div>
      </div>
    </div>
    <q-btn
      no-caps
      @click="save"
      size="14px"
      label="Сохранить"
      class="btn btn__save btn__continue btn__margin"
    />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import TextInput from "components/ui/input/TextInput";
import useVuelidate from "@vuelidate/core";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router/dist/vue-router";
import { useStore } from "vuex";
import { CompanyClientBank } from "src/store/company/actions";

export default defineComponent({
  name: "BankDashboard",
  components: { TextInput },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const route = useRoute();
    const id = route.params.id;
    const form = reactive({
      id: null,
      bank_name: null,
      bank_bik: null,
      bank_account: null,
      bank_correspondent_account: null,
    });

    const rules = computed(() => {
      return {};
    });

    async function loadData() {
      $q.loading.show({
        delay: 400,
      });
      await store.dispatch("company/getCompanyClientBank", route.params.id);
      let data = store.getters["company/getCompanyClientBank"];
      if (data) {
        for (let key in data[0]) {
          form[key] = data[0][key];
        }
      }
      $q.loading.hide();
    }

    onMounted(async () => {
      await loadData();
    });

    let v$ = useVuelidate(rules, form);
    const save = async () => {
      try {
        let sentForm = [{ ...form }];
        await store.dispatch("company/CompanyClientBank", {
          form: sentForm,
          id: id,
        });
        if (v$.value.$invalid) {
          throw new Error("Не все поля заполнены");
        }
        $q.notify({
          color: "positive",
          message: "Банковский счёт успешно обновлен",
          icon: "done",
          position: "top-right",
        });
      } catch (e) {
        $q.notify({
          color: "negative",
          message: e.message,
          icon: "warning",
          position: "top",
        });
      }
    };
    return {
      save,
      form,
      id,
    };
  },
});
</script>