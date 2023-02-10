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
                  title="Тип организации:"
                  name="company"
                  label="Выберите тип организации"
                  v-model="form.company_type"
                  :model-option="company_type_options"
                />
              </div>
            </div>
            <div class="row q-mb-md">
              <div class="col-6 q-pr-md">
                <SelectMultiple
                  title="Статус организации:"
                  name="company"
                  label="Выберите статус организации"
                  v-model="form.company_status"
                  :model-option="company_status_options"
                />
              </div>
              <div class="col-6 q-pl-md">
                <SelectMultiple
                  title="Статус договора: "
                  name="service_type"
                  label="Выберите статус договора"
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
import {forEach} from "lodash";
import {useStore} from "vuex";
import BaseForm from "components/ui/BaseForm";
import {getEnumOptions} from "src/lib/helpers";

export default defineComponent({
  name: "CompanyFilter",
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
      company_status: null,
      company_type: null,
      status: null
    });
    const service_options = getEnumOptions("getService")
    const company_type_options = getEnumOptions("getPartnerType")
    const company_status_options = [
      {
        value: "Контрагент",
        label: "Контрагент"
      },
      {
        value: "Клиент сервиса",
        label: "Клиент сервиса"
      }
    ]
    const status_options = [
      {
        value: 1,
        label: "Открыт"
      },
      {
        value: 2,
        label: "Закрыт"
      }
    ]
    const resetFilter = () => {
      for (let key in form) {
        form[key] =null;
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
      service_options,
      company_type_options,
      company_status_options,
      status_options
    };
  },
});
</script>
