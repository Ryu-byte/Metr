<template>
  <div>
    <teleport to="body">
      <BaseForm v-show="isShow" @close="close" size="md" style="width: 360px">
        <template v-slot:header>
          <h5 class="filter__modal__header">Фильтр</h5>
        </template>
        <template v-slot:body>
          <div class="filter__modal__content">
            <div class="row filter q-mt-lg q-mb-lg">
              <div class="col-12">
                <SelectMultiple
                  title="Тип документа:"
                  name="document_type"
                  label="Выберите тип документа"
                  v-model="form.document_type"
                  :model-option="document_type_options"
                />
              </div>
            </div>
            <div class="row filter" style="margin-bottom: 10px;">
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
  name: "CompanyDocumentsFilter",
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
    const form = reactive({
      document_type: null
    });
    const document_type_options = [
      {
        value: 1,
        label: "Лицензия"
      },
      {
        value: 2,
        label: "Устав"
      },
      {
        value: 3,
        label: "Скан печати"
      },
      {
        value: 4,
        label: "Скан подписи"
      },
      {
        value: 5,
        label: "Договор"
      },
      {
        value: 6,
        label: "Другое"
      }
    ]
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
      form,
      resetFilter,
      document_type_options,
      sendFilter,
    };
  },
});
</script>
