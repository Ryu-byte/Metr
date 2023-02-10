<template>
  <div>
    <teleport to="body">
      <BaseForm v-show="isShow" @close="close" size="md">
        <template v-slot:header>
          <h5 class="filter__modal__header">Фильтр</h5>
        </template>
        <template v-slot:body>
          <div class="filter__modal__content">
            <div class="col-6 q-mt-lg">
              <div>
                <SelectMultiple
                    title="Услуга:"
                    name="type_flat"
                    label="Выберите тип услуги"
                    v-model="form.type_meter"
                    :model-option="type_meter_options"
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
import {reactive} from "vue";
import BaseForm from "components/ui/BaseForm";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {getEnumOptions} from "src/lib/helpers";

export default {
  name: "ObjectOpuFilter",
  components: {SelectMultiple, BaseForm},
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
  setup(props, {emit}) {
    const form = reactive({
      type_meter: null,
    });
    const close = () => {
      emit("close");
    }
    const type_meter_options = getEnumOptions("getMeterType");
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
      resetFilter,
      sendFilter,
      type_meter_options,
    };
  }
}
</script>

