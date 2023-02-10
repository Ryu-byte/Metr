<template>
  <div class="component_container object">
    <div class="tittle q-mb-lg">Добавить помещение</div>
    <div class="row no-wrap">
      <div class="col-md-4 q-pr-md">
        <SelectMultiple
          label="Выберите тип помещения"
          title="Тип помещения: "
          name="type_flat"
          :model-value="form.type_flat"
          :model-option="type_flat_options"
          @update:model-value="onChangeFilter($event, 'type_flat')"
        />
      </div>
      <div class="col-md-4 q-pl-md q-pr-md">
        <SelectMultiple
          label="Выберите наименование помещения"
          title="Наименование помещения: "
          name="type_of_flat"
          :model-value="form.type_of_flat"
          :model-option="type_of_flat_options"
          :disable="form.type_flat === null"
          @update:model-value="onChangeFilter($event, 'type_of_flat')"
        />
      </div>
      <div class="col-md-4 q-pl-md">
        <TextInput
          label="Номер помещения:"
          name="apartment"
          v-model="form.apartment"
          type="number"
          :success-message="v$.apartment"
          placeholder="Введите номер помещения"
          v-maska="'###'"
        />
      </div>
    </div>
    <div class="row no-wrap">
      <div class="col-md-4 q-pr-md">
        <TextInput
          label="Кадастровый номер:  "
          name="cadastral_number"
          v-maska="'##:##:######:###'"
          v-model="form.cadastral_number"
          :success-message="v$.cadastral_number"
          placeholder="Введите кадастровый номер"
        />
      </div>
      <div class="col-md-4 q-pl-md q-pr-md">
        <TextInput
          label="Общая площадь: "
          name="total_area"
          type="number"
          placeholder="Введите общую площадь"
          v-model="form.total_square"
          :success-message="v$.total_square"
        />
      </div>
      <div class="col-md-4 q-pl-md">
        <TextInput
          label="Жилая площадь: "
          name="living_area"

          type="number"
          placeholder="Введите жилую площадь"
          v-model="form.living_square"
          :success-message="v$.living_square"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 q-pr-md">
        <TextInput
          label="Количество комнат: "
          name="rooms"
          v-model="form.rooms"
          type="number"
          :success-message="v$.rooms"
          placeholder="Введите число комнат"
          v-maska="'###'"
        />
      </div>
      <div class="col-md-3 q-pr-md q-pl-md">
        <TextInput
          label="Количество проживающих: "
          name="residents"
          v-model="form.residents"
          :success-message="v$.residents"
          type="number"
          placeholder="Укажите количество проживающих"
          v-maska="'##'"
        />
      </div>
      <div class="col-md-3 q-pr-md q-pl-md">
        <TextInput
          label="Подъезд: "
          name="entrance"
          v-model="form.entrance"
          :success-message="v$.entrance"
          type="number"
          placeholder="Введите подъезд"
          v-maska="'###'"
        />
      </div>
      <div class="col-md-3 q-pl-md">
        <TextInput
          label="Этаж:"
          name="floor"
          v-model="form.floor"
          :success-message="v$.floor"
          type="number"
          placeholder="Введите этаж"
          v-maska="'###'"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <q-btn
          @click="send"
          no-caps
          size="14px"
          label="Сохранить"
          class="btn btn__save btn__continue btn__margin"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import {FlatsRules} from "src/setup/Object/Flats";
import useVuelidate from "@vuelidate/core/dist/index.esm";
import {useStore} from "vuex";
import {useQuasar} from "quasar";
import TextInput from "components/ui/input/TextInput";
import _, {forEach} from "lodash";
import {maska} from "maska";
import {useRoute, useRouter} from "vue-router";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {getEnumOptions} from "src/lib/helpers";

export default defineComponent({
  name: "CreateFlatsObject",
  components: {SelectMultiple, TextInput},
  directives: {
    maska
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const form = reactive({
      type_flat: null,
      type_of_flat: null,
      apartment: null,
      total_square: null,
      living_square: null,
      rooms: null,
      floor: null,
      cadastral_number: null,
      residents: null,
      entrance: null,
      house_id: null,
    });
    const rules = FlatsRules;
    let type_of_flat = getEnumOptions("getTypeOfFlat")
    let type_flat_options = getEnumOptions("getTypeFlats")
    let type_of_flat_options = ref([]);
    let v$ = useVuelidate(rules, form);

    const onChangeFilter = (value, key) => {
      form[key] = value
      form.type_of_flat = key === "type_flat"
        ? null
        : form.type_of_flat;
      form.apartment = key === "type_flat" || key === "type_of_flat"
        ? null
        : form.apartment;
      if (form.type_flat == 1) {
        type_of_flat_options.value = _.filter(type_of_flat, (o) => {
          return o.value < 3;
        });
      } else {
        type_of_flat_options.value = _.filter(type_of_flat, (o) => {
          return o.value >= 3;
        });
      }
    };

    async function send() {
      v$.value.$validate();
      try {
        if (v$.value.$invalid) {
          throw new Error("Не все поля заполнены");
        }
        form.house_id = route.params.id;
        $q.loading.show({
          delay: 0,
          message: "Сохранение данных",
        });
        await store.dispatch("object/CreateObjectFlats", form);
        let res = store.getters["object/getFlatsObject"];
        if (res) {
          $q.notify({
            color: "positive",
            message: res.message,
            icon: "done",
            position: "top-right",
          });
          $q.loading.hide();
          await router.push(`/objects/single=${route.params.id}/flats`)
        }
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
    }

    return {
      form,
      v$,
      type_flat_options,
      type_of_flat_options,
      send,
      onChangeFilter,
    };
  },
});
</script>
