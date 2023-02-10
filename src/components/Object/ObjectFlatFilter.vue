<template>
  <div>
    <teleport to="body">
      <BaseForm v-show="isShow" @close="close" size="md">
        <template v-slot:header>
          <h5 class="filter__modal__header">Фильтр</h5>
        </template>
        <template v-slot:body>
          <div class="filter__modal__content">
            <div class="row q-mb-lg q-mt-lg">
              <div class="col-6 q-pr-md">
                <SelectMultiple
                  title="Тип помещения:"
                  name="type_flat"
                  label="Выберите тип помещения"
                  v-model="form.type_flat"
                  :model-option="type_flat_options"
                />
              </div>
              <div class="col-3 q-pl-md q-pr-md">
                <SelectMultiple
                  title="Подъезд: "
                  name="type_flat"
                  label="Выберите подъезд"
                  v-model="form.entrance"
                  :model-option="entrance_options"
                />
              </div>
              <div class="col-3 q-pl-md">
                <SelectMultiple
                  title="Этаж: "
                  name="type_flat"
                  label="Выберите этаж"
                  v-model="form.floor"
                  :model-option="floor_options"
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
  name: "ObjectFlatFilter",
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
      type_flat: null,
      entrance: null,
      floor: null,
    });
    let type_flat_options = getEnumOptions("getTypeFlats");
    let entrance_options = [];
    let floor_options = [];
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
      form,
      resetFilter,
      entrance_options,
      floor_options,
      sendFilter,
    };
  },
});
</script>
