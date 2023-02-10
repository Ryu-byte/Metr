<template>
  <div class="component_container">
    <PaymentAddRecalculation @close="toggleFilter" :is-show="filterActive" :serviceFilter="true" @FilterForm="FilterForm"/>
    <div class="tittle q-mb-lg">Добавить перерасчёт</div>
    <div class="row no-wrap justify-between q-mb-md">
      <div class="col-md-4 q-pr-md">
        <DateInput
          label="Период перерасчёта:"
          name="period"
          v-model="form.period"
          style-date="input_date"
          title=""/>
      </div>
      <div class="col-md-4 q-pr-md q-pl-md">
        <SelectMultiple
          label="Выберите объект"
          title="Объект:"
          name="house"
          v-model="form.house"
          @click.once="select"
          :model-option="object_options"
          @update:model-value="onChangeFilter($event,'house')"
        />
      </div>
      <div class="col-md-4 q-pl-md">
        <SelectMultiple
          label="Выберите тип помещения"
          title="Тип помещения: "
          name="type_flat"
          v-model="form.type_flat"
          :model-option="type_flat_options"
          @update:model-value="onChangeFilter($event,'type_flat')"
        />
      </div>
    </div>
    <div class="row no-wrap q-mb-md">
      <div class="col-md-4 q-pr-md">
        <SelectMultiple
          label="Выберите наименование помещения"
          title="Наименование помещения: "
          name="type_of_flat"
          v-model="form.type_of_flat"
          :model-option="type_of_flat_options"
          @update:model-value="onChangeFilter($event, 'type_of_flat')"
        />
      </div>
      <div class="col-md-4 q-pl-md q-pr-md">
        <SelectMultiple
          label="Выберите номер помещения"
          title="Номер помещения:"
          name="flat"
          v-model="form.flat"
          :model-option="flat_options"
          @update:model-value="onChangeFilter($event, 'flat')"
        />
      </div>
      <div class="col-md-4 q-pl-md">
        <SelectMultiple
          label="Выберите лицевой счет"
          title="Лицевой счёт:"
          name="account"
          :model-value="form.account"
          :model-option="account_options"
        />
      </div>
    </div>
    <div class="row no-wrap justify-between q-mb-md">
      <div class="col-md-4 q-pr-md">
        <TextInput
          label="Статус лицевого счёта:"
          name="account_status"
          class=""
          v-model="form.status"
          type="text"
          disabled
          placeholder="Подтягивается автоматически"
        />
      </div>
      <div class="col-md-4 q-pl-md q-pr-md">
        <SelectMultiple
          title="Услуга: "
          label="Выберите услугу"
          name="service"
          v-model="form.service"
          :model-option="service_options"
        />
      </div>
      <div class="col-md-4 q-pl-md">
        <SelectMultiple
          title="Формула перерасчёта:"
          name="formula"
          label="Выберите формулу перерасчёта"
          v-model="form.formula"
          :model-option="formula_options"
        />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-md-4 q-pr-md">
        <TextInput
          label="Сумма перерасчёта:"
          name="sum"
          class=""
          v-model="form.sum_recalculation"
          type="text"
          placeholder="Укажите сумму перерасчёта"
        />
      </div>
      <div class="col-md-8 q-pl-md">
        <TextInput
          label="Комментарий:"
          name="comment"
          class=""
          v-model="form.comment"
          type="text"
          placeholder="Укажите комментарий"
        />
      </div>
    </div>
    <div class="row btn__margin">
        <q-btn
        @click="save"
        no-caps
        size="14px"
        label="Сохранить"
        class="btn btn__save q-mr-md"
      />
        <q-btn
          class="btn btn__load"
          @click="toggleFilter"
          no-caps
          label="Предпросмотр"
        />
    </div>
  </div>
</template>
<script>
import {defineComponent, reactive, ref} from "vue";
import {useQuasar} from "quasar";
import useVuelidate from "@vuelidate/core";
import TextInput from "components/ui/input/TextInput";
import {useStore} from "vuex";
import _, {cloneDeep, forEach} from "lodash";
import {formData, rulesData} from "src/setup/Payment/Recalculation";
import {useRouter} from "vue-router";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {getEnumOptions, selectCompany, selectObject} from "src/lib/helpers";
import DateInput from "components/ui/DateInput/DateInput";
import PaymentAddRecalculation from "components/Payment/PaymentAddRecalculation";

export default defineComponent({
  name: "CreateRecalculation",
  components: {
    PaymentAddRecalculation,
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
    let company_options = ref([]);
    let flat_options = ref([]);
    let type_flat_options = getEnumOptions("getTypeFlats");
    let type_of_flat_options = ref([]);
    let type_of_flat = getEnumOptions("getTypeOfFlat");
    let objects = null;
    const filterActive = ref(false);
    let object_options = ref([]);
    const account_options = [];
    const formula_options = [
      {
        value: 1,
        label: "Фиксированная сумма на лс"
      },
      {
        value: 2,
        label: "Сумма разделить по м2 выбранных помещений"
      },
      {
        value: 3,
        label: "Сумма умножить по м2 выбранных помещений"
      },
      {
        value: 4,
        label: "Сумма разделить на количество выбранных помещений"
      },
      {
        value: 5,
        label: "Отменить начисления (перерасчет по возврату средств за указанный период и выбранной услуге)"
      },
      {
        value: 6,
        label: "Сторно пени за период"
      },
    ]
    const toggleFilter = () => {
      filterActive.value = !filterActive.value
      document.body.style.overflow = filterActive.value ? 'hidden' : 'auto'
    }
    const FilterForm = (form) => {
      console.log(form)
    }
    async function select(key) {
        object_options.value = await selectObject(store)
    }
    const getSelectData = async () => {
      if (
        form.type_flat !== null &&
        form.house !== null &&
        form.type_of_flat !== null
      ) {
        const { address } = objects.houses.find(
          ({ id }) => id === form.house
        );
        try {
          await store
            .dispatch("service/ObjectVariables", {
              address,
              type_flat: form.type_flat,
              house_id: form.house,
              type_of_flat: form.type_of_flat,
              apartment: "",
            })
            .then(() => {
              let { flats } = store.getters["service/getObjectVariables"];
              if (flats && flats.length > 0) {
                flat_options.value = flats.map(({ apartment, id }) => ({
                  value: id,
                  label: apartment,
                }));
              } else {
                flat_options.value = [];
              }
            });
        } catch (err) {
          $q.notify({
            color: "negative",
            message: err.response.data.errors.message,
            icon: "warning",
            position: "top-right",
          });
        }
      }
    };

    const onChangeFilter = (value, key) => {
      form.type_flat = key === "house" ? null : form.type_flat;
      form.type_of_flat =
        key === "house" || key === "type_flat" ? null : form.type_of_flat;
      form.flat_id =
        key === "house" || key === "type_flat" || key === "type_of_flat"
          ? null
          : form.flat_id;
      if (key === "type_of_flat") {
        getSelectData(form);
      }
      if (form.type_flat == 1) {
        type_of_flat_options.value = _.filter(type_of_flat, (o) => {
          return o.value < 3;
        });
      } else {
        type_of_flat_options.value = _.filter(type_of_flat, (o) => {
          return o.value >= 3;
        });
      }
    };
    const save = async () => {};
    return {
      form,
      v$,
      save,
      selectObject,
      select,
      toggleFilter,
      FilterForm,
      company_options,
      service_options,
      filterActive,
      object_options,
      type_flat_options,
      type_of_flat_options,
      flat_options,
      account_options,
      formula_options,
      onChangeFilter,
    };
  },
});
</script>
