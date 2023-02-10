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
                  title="Тип объекта:"
                  name="objects_type"
                  label="Выберите тип объекта"
                  v-model="form.type_building"
                  :model-option="object_type_options"
                />
              </div>
              <div class="col-6 q-pl-md">
                <SelectMultiple
                  title="Статус договора:"
                  name="service_type"
                  label="Выберите статус договора"
                  v-model="form.status_document"
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
import BaseForm from "components/ui/BaseForm";
import TypeBuilder from "src/Enum/TypeBuilder";

export default defineComponent({
  name: "ObjectFilter",
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
    const form = reactive({
      type_building: null,
      status_document: null,
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
    const object_type_options = TypeBuilder;
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
      status_options,
      object_type_options,
      resetFilter,
      sendFilter,
    };
  },
});
</script>
