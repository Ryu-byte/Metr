<template>
  <div>
    <teleport to="body">
      <BaseForm v-show="isShow" @close="close" size="md">
        <template v-slot:header>
          <h5 class="filter__modal__header">Фильтр</h5>
        </template>
        <template v-slot:body>
          <div class="filter__modal__content">
            <div class="row q-mt-lg">
              <div class="col-12">
                <SelectMultiple
                  title="Контрагент: "
                  name="company"
                  label="Выберите контрагента"
                  v-model="form.agent"
                  :model-option="agent_options"
                />
              </div>
            </div>
            <div class="row">
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
                  label="Применить" @click="sendFilter"/>
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
import {forEach} from "lodash";
import {useStore} from "vuex";
import BaseForm from "components/ui/BaseForm";
import {getEnumOptions} from "src/lib/helpers";

export default defineComponent({
  name: "PaymentClientsFilter",
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
    const agent_options = []
    let store = useStore();
    const form = reactive({
      agent: null,
    });
    const resetFilter = () => {
      for (let key in form) {
        form[key] = [];
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
      sendFilter,
      agent_options
    };
  },
});
</script>
