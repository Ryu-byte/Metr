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
                  title="Организация:"
                  name="company"
                  label="Выберите организацию"
                  v-model="form.client_id"
                  @click.once="select"
                  :model-option="company_options"
                />
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="col-6 q-pr-md">
                <SelectMultiple
                  title="Тип услуги:"
                  name="service_type"
                  label="Выберите тип услуги"
                  v-model="form.serviceType"
                  :model-option="serviceType_options"
                />
              </div>
              <div class="col-6 q-pl-md">
                <SelectMultiple
                  title="Название услуги:"
                  name="service"
                  label="Выберите название услуги"
                  v-model="form.service"
                  :model-option="service_options"
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
import {getEnumOptions, selectCompany, selectObject} from "src/lib/helpers";

export default defineComponent({
  name: "ServiceFilter",
  emits: ["FilterForm"],
  props: {
    isShow: {
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
      client_id: null,
      serviceType: null,
      service: null,
    });
    const service_options = getEnumOptions("getService")
    const serviceType_options = getEnumOptions("getServiceType")
    let company_options = ref([])
    async function select() {
        company_options.value = await selectCompany(store)
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
      company_options,
      resetFilter,
      sendFilter
    };
  },
});
</script>
