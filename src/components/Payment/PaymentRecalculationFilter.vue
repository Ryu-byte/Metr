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
                  title="Объект: "
                  name="house"
                  label="Выберите объект"
                  v-model="form.house"
                  @click.once="select('object')"
                  :model-option="object_options"
                />
              </div>
            </div>
            <div class="row  q-mt-lg">
              <div class="col-6  q-pr-md">
                <SelectMultiple
                  title="Организация:"
                  name="company"
                  label="Выберите организацию"
                  v-model="form.client_id"
                  @click.once="select('company')"
                  :model-option="company_options"
                />
              </div>
              <div class="col-6 q-pl-md">
                <SelectMultiple
                  title="Лицевой счет: "
                  name="account"
                  label="Выберите лицевой счет"
                  v-model="form.account"
                  :model-option="account_options"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-6 q-pr-md">
                <SelectMultiple
                  title="Услуга:"
                  name="service"
                  label="Выберите услугу"
                  v-model="form.service"
                  :model-option="service_options"
                />
              </div>
              <div class="col-6 q-pl-md">
                <DateInput
                  style="width: 100%"
                  class="name-date"
                  label="Период перерасчётов: "
                  name="period"
                  v-model="form.period"
                  style-date="input_date"
                  title=""/>
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
import {getEnumOptions, selectCompany, selectObject} from "src/lib/helpers";
import DateInput from "components/ui/DateInput/DateInput";

export default defineComponent({
  name: "PaymentRecalculationFilter",
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
      house:null,
      account:null,
      client_id: null,
      period: null,
      service: null,
    });
    const service_options = getEnumOptions("getService")
    const serviceType_options = getEnumOptions("getServiceType")
    const account_options = []
    let company_options = ref([])
    let object_options = ref([]);
    async function select(key) {
      if (key === 'object') {
        object_options.value = await selectObject(store)
      } else {
        company_options.value = await selectCompany(store)
      }
    }

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
      service_options,
      serviceType_options,
      select,
      selectCompany,
      selectObject,
      company_options,
      object_options,
      resetFilter,
      sendFilter,
      account_options
    };
  },
});
</script>
