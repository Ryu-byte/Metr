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
              <div class="col-12">
                <SelectMultiple
                  title="Тип документа:"
                  name="document_type"
                  label="Выберите тип документа"
                  v-model="form.type_document"
                  :model-option="type_document_options"
                />
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
          </div>
        </template>
      </BaseForm>
    </teleport>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import BaseForm from "components/ui/BaseForm";
import { getEnumOptions } from "src/lib/helpers";

export default defineComponent({
  name: "ObjectDocumentsFilter",
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
    const form = reactive({
      type_document: null,
    });
    const type_document_options = getEnumOptions("getDocumentType");
    const resetFilter = () => {
      for (let key in form) {
        form[key] = null;
      }
    };

    const sendFilter = () => {
      emit("FilterForm", form);
      close();
    };

    return {
      close,
      form,
      resetFilter,
      type_document_options,
      sendFilter,
    };
  },
});
</script>
