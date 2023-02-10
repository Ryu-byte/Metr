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
                  title="Объект: "
                  name="house"
                  label="Выберите объект"
                  v-model="form.house"
                  :model-option="[]"
                />
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="col-6 q-pr-md">
                <SelectMultiple
                  title="Тип помещения:"
                  name="type_flat"
                  label="Жилое помещение"
                  v-model="form.type_flat"
                  :model-option="[]"
                />
              </div>
              <div class="col-6 q-pl-md">
                <SelectMultiple
                  title="Название услуги:"
                  name="service"
                  label="Выберите название услуги"
                  v-model="form.service_name"
                  :model-option="[]"
                />
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="col-6 q-pr-md">
                <SelectMultiple
                  title="Тип документа: "
                  name="type_document"
                  label="Выберите тип документа"
                  v-model="form.type_document"
                  :model-option="[]"
                />
              </div>
              <div class="col-6 q-pl-md">
                <DateInput
                  title="дд.мм.гггг"
                  :is-range="false"
                  name="date"
                  label="Период"
                  style-date="input_date"
                  dense="dense"
                  v-model="form.period"
                  v-maska="'##.##.####'"
                />
              </div>
            </div>
            <div class="row q-mb-lg q-mt-lg">
              <div class="col-12">
                <SelectMultiple
                  title="Организация исполнителя:"
                  name="company"
                  label="Выберите организацию исполнителя"
                  v-model="form.company"
                  :model-option="[]"
                />
              </div>
            </div>
            <div class="row q-mb-lg q-mt-lg">
              <div class="col-12">
                <SelectMultiple
                  title="Наименование получателя:"
                  name="client"
                  label="Выберите наименование получателя"
                  v-model="form.client"
                  :model-option="[]"
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
import {useStore} from "vuex";
import BaseForm from "components/ui/BaseForm";
import DateInput from "components/ui/DateInput/DateInput";
import {maska} from "maska";

export default defineComponent({
  name: "PaymentDocFilter",
  emits: ["FilterForm"],
  directives: {
    maska,
  },
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
    DateInput,
    BaseForm,
    SelectMultiple,
  },

  setup(props, {emit}) {
    const close = () => {
      emit("close");
    }
    let store = useStore();
    const form = reactive({
      house: null,
      company: null,
      client: null,
      period: null,
      service_name: null,
      type_flat: null,
      type_document:null
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
      sendFilter
    };
  },
});
</script>
