<template>
        <div class="component_container">
          <div class="tittle q-mb-lg">Добавить пени</div>
          <div class="row no-wrap justify-between q-mb-md">
            <div class="col-md-4 q-pr-md">
              <SelectMultiple
                title="Организация: "
                label="Выберите организацию"
                name="company"
                @click.once="select('company')"
                v-model="form.client_id"
                :model-option="company_options"
                :success-message="v$.client_id"
              />
            </div>
            <div class="col-md-4 q-pr-md q-pl-md">
              <SelectMultiple
                label="Выберите объект"
                title="Объект:"
                name="house"
                :model-value="form.house"
                :multiple="true"
                @click.once="select('object')"
                :model-option="object_options"
              />
            </div>
            <div class="col-md-4 q-pl-md">
              <SelectMultiple
                title="Тип услуги: "
                label="Выберите тип услуги"
                name="type"
                v-model="form.type_service"
                :model-option="serviceType_options"
                :success-message="v$.type_service"
              />
            </div>
          </div>
          <div class="row no-wrap justify-between q-mb-md">
            <div class="col-md-4 q-pr-md">
              <SelectMultiple
                title="Услуга: "
                label="Выберите услугу"
                name="service"
                v-model="form.service"
                :success-message="v$.service"
                :model-option="service_options"
              />
            </div>
            <div class="col-md-4 q-pl-md q-pr-md">
              <DateInput
                label="Срок выставления квитанций:"
                name="date_receipt"
                v-model="form.date_receipt"
                style-date="input_date"
                title=""/>
            </div>
            <div class="col-md-4 q-pl-md">
              <DateInput
                label="Срок оплаты:"
                name="date_payment"
                v-model="form.date_payment"
                style-date="input_date"
                title=""/>
            </div>
          </div>
          <div class="row no-wrap justify-between q-mb-md">
            <div class="col-md-4 q-pr-md">
              <TextInput
                label="День просрочки:"
                name="dayDelay"
                class=""
                v-model="form.dayDelay"
                type="text"
                :success-message="v$.dayDelay"
                placeholder="Укажите день просрочки"
              />
            </div>
            <div class="col-md-4 q-pl-md q-pr-md">
              <SelectMultiple
                label="Выберите ставку для начисления пени"
                title="Ставка для начисления пени:"
                name="bet_rate"
                v-model="form.bet_rate"
                :model-option="bet_rate_options"
                :success-message="v$.bet_rate"
              />
            </div>
            <div class="col-md-4 q-pl-md">
              <TextInput
                label="Размер ставки:"
                name="bet_size"
                class=""
                v-model="form.bet_size"
                type="text"
                :success-message="v$.bet_size"
                placeholder="Укажите размер ставки"
              />
            </div>
          </div>
          <q-btn
            @click="save"
            no-caps
            size="14px"
            label="Сохранить"
            class="btn btn__save btn__continue btn__margin"
          />
        </div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import useVuelidate from "@vuelidate/core";
import TextInput from "components/ui/input/TextInput";
import { useStore } from "vuex";
import { cloneDeep, forEach } from "lodash";
import { formData, rulesData } from "src/setup/Payment/Fine";
import { useRouter } from "vue-router";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {getEnumOptions, selectCompany, selectObject} from "src/lib/helpers";
import DateInput from "components/ui/DateInput/DateInput";

export default defineComponent({
  name: "CreateFine",
  components: {
    DateInput,
    TextInput,
    SelectMultiple,
  },
  setup() {
    const $q = useQuasar();
    let store = useStore();
    let router = useRouter();
    const form = reactive(cloneDeep(formData));
    let v$ = useVuelidate(rulesData, form);
    const service_options = getEnumOptions("getService");
    const serviceType_options = getEnumOptions("getServiceType");
    const bet_rate_options = [];
    let company_options = ref([]);
    let object_options = ref([]);
    async function select(key) {
      if (key === 'object') {
        object_options.value = await selectObject(store)
      } else {
        company_options.value = await selectCompany(store)
      }
    }


    onMounted(() => {});
    const save = async () => {
    };
    return {
      form,
      v$,
      save,
      selectObject,
      select,
      company_options,
      serviceType_options,
      service_options,
      object_options,
      bet_rate_options
    };
  },
});
</script>
