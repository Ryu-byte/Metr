<template>
  <div class="component_container object q-pt-lg">
    <h3 class="tittle q-mb-lg">Основные данные</h3>
    <div class="row q-mb-xl">
      <div class="col-md-6 q-pr-md">
        <div class="address">
          <AddressInputObject
            name="address"
            label="Адрес объекта:"
            title="Адрес объекта"
            placeholder="Укажите адрес объекта"
            :success-message="v$.address"
            v-model="form.address"
            v-model:geo_data="form.geo_data"
          />
        </div>
      </div>
      <div class="col-md-6 q-pl-md">
        <div class="company">
          <SelectMultiple
            title="Управляющая организация: "
            label="Выберите управляющую компанию"
            name="company"
            height="300px"
            :loading="loading"
            @getRequestPage="getRequestPage"
            v-model="form.company_id"
            :model-option="company_options"
            :success-message="v$.company_id"
          />
        </div>
      </div>
    </div>
    <q-btn
      @click="save"
      no-caps
      label="Сохранить"
      class="btn__continue btn btn__save"
    />
  </div>
</template>

<script>
import {computed, defineComponent, reactive, ref} from "vue";
import {useQuasar} from "quasar";
import useVuelidate from "@vuelidate/core";
import {useStore} from "vuex";
import {cloneDeep, forEach} from "lodash";
import AddressInputObject from "components/ui/AddressInput/AddressInputObject";
import {maska} from "maska";
import {useRouter} from "vue-router";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {helpers, required} from "@vuelidate/validators";
import {formData} from "src/setup/Object/Data";
import {selectCompany} from "src/lib/helpers";

export default defineComponent({
  name: "DataObject",
  directives: {
    maska,
  },
  components: {
    SelectMultiple,
    AddressInputObject,
  },
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const form = reactive(cloneDeep(formData));
    const company_options = ref([]);
    const rules = computed(() => {
      return {
        address: {
          required: helpers.withMessage(
            "Поле обязательное для заполнения",
            required
          ),
        },
        company_id: {
          required: helpers.withMessage(
            "Поле обязательное для заполнения",
            required
          ),
        },
      };
    });
    const v$ = useVuelidate(rules, form);
    const loading = ref(false);

    const getRequestPage = async (page) => {
      loading.value = true;
      let arr = await selectCompany(store, "company", page)
      arr.forEach(company => {
        company_options.value.push(company)
      })
      if (arr) {
        loading.value = false;
      }
    }
    const save = async () => {
      const sentForm = {...form};
      v$.value.$validate();
      try {
        if (v$.value.$error) {
          throw new Error("Не все поля заполнены ");
        }
        sentForm.geo_long = sentForm.geo_data.geo_long;
        sentForm.geo_lat = sentForm.geo_data.geo_lat;
        sentForm.fias_id = sentForm.geo_data.fias_id;
        sentForm.oktmo = sentForm.geo_data.oktmo;
        delete sentForm.geo_data;
        $q.loading.show({
          delay: 0,
          message: "Сохранение данных",
        });
        await store.dispatch("object/CreateObject", sentForm);
        let answer = store.getters["object/getSingleObject"];
        if (answer) {
          $q.notify({
            color: "positive",
            message: answer.message,
            icon: "done",
            position: "top-right",
          });
          $q.loading.hide();
          await router.push("/objects/single=" + answer.object_id);
        }
        sentForm.address = "";
      } catch (e) {
        $q.loading.hide();
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
      }
    };

    return {
      save,
      getRequestPage,
      form,
      v$,
      company_options,
      loading
    };
  },
});
</script>
