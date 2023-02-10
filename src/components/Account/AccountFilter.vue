<template>
  <div>
    <teleport to="body">
      <BaseForm v-show="isShow" @close="close" size="md">
        <template v-slot:header>
          <h5 class="filter__modal__header">Фильтр</h5>
        </template>
        <template v-slot:body>
          <div class="filter__modal__content">
            <div class="row q-mt-lg q-mb-lg">
              <div class="col-6 q-pr-md">
                <SelectMultiple
                  title="Объект:"
                  name="object"
                  @click.once="select"
                  label="Выберите объект"
                  v-model="form.house_id"
                  :model-option="object_options"
                />
              </div>
              <div class="col-6 q-pl-md">
                <SelectMultiple
                  title="Тип помещения:"
                  name="type_flat"
                  label="Выберите объект"
                  v-model="form.type_flat"
                  :model-option="type_flat_options"
                />
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="col-6 q-pr-md">
                <SelectMultiple
                  title="Наименование помещение:"
                  name="type_of_flat"
                  label="Выберите наименование помещения"
                  v-model="form.type_of_flat"
                  :model-option="type_of_flat_options"
                />
              </div>
              <div class="col-6 q-pl-md">
                <SelectMultiple
                  title="Статус:"
                  name="status"
                  label="Выберите название услуги"
                  v-model="form.status_account"
                  :model-option="status_options"
                />
              </div>
            </div>
          </div>
          <div class="row filter">
            <div class="col-12">
              <q-btn
                class="filter__btn reset"
                @click="resetFilter"
                no-caps
                label="Сбросить фильтр"
              />
              <q-btn
                class="filter__btn apply"
                no-caps
                label="Применить"
                @click="sendFilter"
              />
            </div>
          </div>
        </template>
      </BaseForm>
    </teleport>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import BaseForm from "components/ui/BaseForm";
import {getEnumOptions, selectCompany, selectObject} from "src/lib/helpers";

export default defineComponent({
  name: "AccountFilter",
  emits: ["FilterForm"],
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    filterActive: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    BaseForm,
    SelectMultiple,
  },

  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    let store = useStore();
    const $q = useQuasar();
    const form = reactive({
      house_id: null,
      type_flat: null,
      type_of_flat: null,
      status_account: null,
    });
    const status_options = [
      {
        value: true,
        label: "Открыт",
      },
      {
        value: false,
        label: "Закрыт",
      },
    ];
    let object_options = ref([]);
    async function select() {
        object_options.value = await selectObject(store)
      }
    let type_flat_options = getEnumOptions("getTypeFlats")
    let type_of_flat_options = getEnumOptions("getTypeOfFlat")
    const resetFilter = () => {
      for (let key in form) {
        form[key] = null;
      }
    };

    const sendFilter = () => {
      emit("FilterForm", form);
      emit("close");
    };

    return {
      close,
      form,
      object_options,
      type_flat_options,
      type_of_flat_options,
      status_options,
      resetFilter,
      sendFilter,
      select,
    };
  },
});
</script>
