<template>
  <div class="component_container">
    <div class="row no-wrap q-mb-md items-center">
      <div class="title">Тарифы услуг сервиса</div>
      <q-btn
        class="btn services__tariff-add q-ml-lg"
        no-caps
        @click.prevent="addTariff"
      >
        <q-icon
          name="img:svg/add_icon.svg"
          class="services__tariff-img"
        />
        Добавить услугу
      </q-btn>
    </div>
    <div class="tariff_form" v-for="(item, index) in tariffs" :key="index">
      <div class="row no-wrap justify-between q-mb-md">
        <div class="col-md-6 q-pr-md">
          <SelectMultiple
            label="Выберите услугу сервиса"
            title="Услуга сервиса:"
            name="service"
            v-model="item.service"
            :model-option="service_options"
          />
        </div>
        <div class="col-md-3 q-pr-md q-pl-md">
          <DateInput
            title="дд.мм.гггг"
            :is-range="false"
            name="date_start"
            label="Дата начала действия услуги:"
            style-date="input_date"
            dense="dense"
            v-model="item.date_start"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <DateInput
            title="дд.мм.гггг"
            :is-range="false"
            name="date_end"
            label="Дата окончания действия услуги:"
            style-date="input_date"
            dense="dense"
            v-model="item.date_end"
          />
        </div>
      </div>
      <div class="row no-wrap justify-between q-mb-md">
        <div class="col-md-3 q-pr-md">
          <SelectMultiple
            label="Выберите формат списания"
            title="Формат списания:"
            name="format"
            v-model="item.format"
            :model-option="format_options"
          />
        </div>
        <div class="col-md-3 q-pl-md q-pr-md">
          <TextInput
            label="Стоимость:"
            name="price"
            type="text"
            v-model="item.price"
            placeholder="Укажите стоимость"
            @update:model-value="onChangePrice($event)"
          />
        </div>
        <div class="col-md-3 q-pr-md q-pl-md">
          <SelectMultiple
            label="Выберите тип тарифа"
            title="Тип тарифа:"
            name="tariff_type"
            v-model="item.tariff_type"
            :model-option="tariff_type_options"
            :disable="item.format === null"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <TextInput
            label="Площадь:"
            name="square"
            type="text"
            v-model="item.square"
            placeholder="Укажите площадь"
            :disabled="item.tariff_type === 1 || item.tariff_type===null "
          />
        </div>
      </div>
      <div v-if="index > 0" class="row no-wrap q-mb-md">
        <q-btn
          class="services__tariff-delete btn"
          no-caps
          @click="deleteTariff(index, item.id, item)"
        >
          <q-icon
            name="img:svg/close_icon_red.svg"
            class="services__tariff-img on-left"
          />
          Удалить услугу
        </q-btn>
      </div>
    </div>
    <div class="row">
      Итоговая стоимость услуг по организации за <span style="color: #5584FF;"> &nbsp; {{ month }} {{
        date.getFullYear()
      }} &nbsp;</span> составляет: <span
      style="color: #545E79; font-weight: 600;">&nbsp;{{ price_sum }}&nbsp; ₽ &nbsp;</span>
    </div>
    <q-btn
      no-caps
      @click="save"
      size="14px"
      label="Сохранить"
      class="btn btn__save btn__continue btn__margin"
    />
  </div>

</template>

<script>
import TextInput from "components/ui/input/TextInput";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {computed, defineComponent, reactive, ref, watch} from "vue";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import _, {cloneDeep} from "lodash";
import {formData, rulesData} from "src/setup/Company/Tariffs"
import DateInput from "components/ui/DateInput/DateInput";
import useVuelidate from "@vuelidate/core/dist/index.esm";

export default defineComponent({
  name: "TariffDashboard",
  components: {
    DateInput,
    SelectMultiple,
    TextInput,
  },

  setup() {
    const $q = useQuasar();
    const store = useStore();
    let tariffs = reactive([cloneDeep(formData)])
    let add = reactive({
      id: null,
      service: null,
      date_start: null,
      date_end: null,
      format: null,
      price: null,
      tariff_type: null,
      square: null,
    });
    let addTariff = () => {
      tariffs.push(add);
    };
    const date = new Date();
    const month = date.toLocaleString('default', {month: 'long'})
    let price_sum = ref(0)
    const service_options = [
      {
        value: 1,
        label: "Использование сервиса",
      },
      {
        value: 2,
        label: "Открытые ЛС, руб.",
      },
      {
        value: 3,
        label: "Закрытые ЛС, руб.",
      },
      {
        value: 4,
        label: "Открытые ЛС капремонт, руб",
      },
      {
        value: 5,
        label: "Закрытые ЛС капремонт, руб",
      },
      {
        value: 6,
        label: "Бухгалтерское сопровождение, руб.",
      },
      {
        value: 7,
        label: "Юридическое сопровождение, руб",
      },
      {
        value: 8,
        label: "Печать руб.",
      },
      {
        value: 9,
        label: "Конвертирование руб.",
      },
      {
        value: 10,
        label: "Доставка руб.",
      },
    ]
    const tariff_type_options = [
      {
        value: 1,
        label: "Фиксированный",
      },
      {
        value: 2,
        label: "От площади",
      },
    ]
    const format_options = [
      {
        value: 1,
        label: "Щт",
      },
      {
        value: 2,
        label: "Ежемесячно",
      },
      {
        value: 3,
        label: "Разово",
      },
    ]
    const onChangePrice = (price) => {
      price_sum.value = Number(price)
      if(tariffs.length > 1) {
        let sum = 0
        tariffs.forEach(tariff => {
          sum += Number(tariff.price)
          price_sum.value = sum
        })
      }
    }
    const deleteTariff = async (index, id) => {
      tariffs = tariffs.splice(index, 1);
      if (id !== null && id < 90000) {
        // api.delete("admin/tariff/single=" + id);
      }
    };
    let v$ = useVuelidate(rulesData, tariffs);
    const save = async () => {
      try {
        if (v$.value.$invalid) {
          throw new Error("Не все поля заполнены");
        }
        // await router.push(`/dashboard/about`)
      } catch (e) {
        $q.notify({
          color: "negative",
          message: e.message,
          icon: "warning",
          position: "top",
        });
      }
    };

    return {
      tariffs,
      v$,
      deleteTariff,
      addTariff,
      service_options,
      tariff_type_options,
      format_options,
      save,
      date,
      month,
      price_sum,
      onChangePrice
    };
  },
});
</script>
