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
                  title="Плательщик:"
                  name="resident"
                  label="Выберите плательщика"
                  v-model="form.resident"
                  :model-option="[]"
                />
              </div>
              <div class="col-6 q-pl-md">
                <SelectMultiple
                  title="Тип помещения:"
                  name="type_flat"
                  label="Выберите тип помещения"
                  v-model="form.type_flat"
                  :model-option="type_flat_options"
                  @update:model-value="onChangeFilter"
                />
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="col-6 q-pr-md">
                <SelectMultiple
                  title="Наименование помещения:"
                  name="type_of_flat"
                  label="Выберите тип услуги"
                  v-model="form.type_of_flat"
                  :model-option="type_of_flat_options"
                  @update:model-value="onChangeFilter"
                />
              </div>
              <div class="col-6 q-pl-md">
                <SelectMultiple
                  title="Статус:"
                  name="status"
                  label="Выберите статус"
                  v-model="form.status"
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
              <q-btn class="filter__btn apply" no-caps label="Применить" @click="sendFilter"/>
            </div>
          </div>
        </template>
      </BaseForm>
    </teleport>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import _, {forEach} from "lodash";
import {useStore} from "vuex";
import BaseForm from "components/ui/BaseForm";
import {getEnumOptions} from "src/lib/helpers";

export default defineComponent({
  name: "ObjectAccountFilter",
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

  setup(props, {emit}) {
    const close = () => {
      emit("close");
    }
    let store = useStore();
    const form = reactive({
      resident: null,
      type_flat: null,
      type_of_flat: null,
      status: null,
    });
    let type_flat_options = getEnumOptions("getTypeFlats");
    let type_of_flat_options = ref([]);
    let type_of_flat = getEnumOptions("getTypeOfFlat");
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
    const onChangeFilter = () => {
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
    const resetFilter = () => {
      for (let key in form) {
        form[key] = null;
      }
    };

    const sendFilter = () => {
      emit("FilterForm", form);
      emit("close");
    }

    return {
      close,
      type_flat_options,
      type_of_flat_options,
      status_options,
      form,
      resetFilter,
      sendFilter,
      onChangeFilter
    };
  },
});
</script>
