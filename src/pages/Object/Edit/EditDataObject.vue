<template>
  <div class="component_container object">
    <div class="object__info">
      <div class="tittle">Дом</div>
      <div class="row q-mb-lg">
        <div class="col-md-4 q-pr-md">
          <SelectMultiple
            title="Тип дома: "
            name="type_"
            :model-option="type_building"
            v-model="form.type_building"
            label="Выберите тип дома"
            :success-message="v$.type_building"
          />
        </div>
        <div class="col-md-4 q-pl-md q-pr-md">
          <TextInput
            v-maska="['##:##:######:###', '##:##:######:###']"
            label="Кадастровый номер дома:  "
            placeholder="XX:XX:XXXXXX:XXX"
            fill-mask="true"
            name="cadastral_number"
            v-model="form.cadastral_number"
          />
        </div>
        <div class="col-md-4 q-pl-md">
          <TextInput
            label="Кадастровый номер земельного участка: "
            v-maska="['##:##:######:###', '##:##:######:###']"
            placeholder="XX:XX:XXXXXX:XXX"
            name="cadastral_number_plot"
            v-model="form.cadastral_number_plot"
          />
        </div>
      </div>
      <div class="row q-mb-lg">
        <div class="col-md-2 q-pr-md">
          <TextInput
            label="ОКТМО:"
            name="oktmo"
            v-maska="'########'"
            v-model="form.oktmo"
            :is-number="true"
            :success-message="v$.oktmo"
          />
        </div>
        <div class="col-md-2 q-pl-md q-pr-md">
          <DateInput
            title="гггг"
            :is-range="false"
            name="year_of_construction"
            label="Год постройки:  "
            type="year"
            style-date="input_date"
            dense="dense"
            v-model="form.year_of_construction"
            :success-message="v$.year_of_construction"
            v-maska="'####'"
          />
        </div>
        <div class="col-md-2 q-pl-md q-pr-md">
          <DateInput
            title="гггг"
            :is-range="false"
            name="year_of_commissioning"
            label="Год ввода в эксплуатацию:"
            style-date="input_date"
            dense="dense"
            type="year"
            :success-message="v$.year_of_commissioning"
            v-model="form.year_of_commissioning"
            v-maska="'####'"
          />
        </div>
        <div class="col-md-2 q-pr-md ">
          <SelectMultiple
              title="Состояние здания: "
              label="Выберите состояние здания"
              name="state_building"
              v-model="form.state_building"
              :model-option="state_building"
              :success-message="v$.state_building"
          />
        </div>
        <div class="col-md-1 q-pl-md q-pr-md">
          <TextInput
              label="Износ:"
              name="wear"
              v-model="form.wear"
              type="number"
              :success-message="v$.wear"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <DateInput
              title="дд.мм.гггг"
              :is-range="false"
              name="date_of_wear"
              label="Дата на которую установлен износ здания:  "
              style-date="input_date"
              dense="dense"
              v-model="form.date_of_wear"
              v-maska="'##.##.####'"
          />
        </div>
      </div>

      <div class="tittle q-mb-lg">Площадь</div>
      <div class="row q-mb-lg">
        <div class="col-md-3 q-pr-md">
          <TextInput
            disabled
            placeholder="Вычисляется автоматически"
            name="name"
            label="Площадь жилых и нежилых помещений: "
            v-model="totalSquare"
            type="number"
            :success-message="v$.total_square"
          />
        </div>
        <div class="col-md-3 q-pl-md q-pr-md">
          <TextInput
            label="Жилая площадь: "
            name="living_square"
            type="number"
            @keypress="isNumber($event)"
            v-model="form.living_square"
            :success-message="v$.living_square"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <TextInput
            label="Нежилая площадь: "
            name="non_residential_square"
            type="number"
            @keypress="isNumber($event)"
            v-model="form.non_residential_square"
            :success-message="v$.non_residential_square"
          />
        </div>
      </div>
      <div class="row q-mb-lg">
        <div class="col-md-3 q-pr-md">
          <TextInput
            label="Площадь МОП уборочная:"
            name="cleaning_square"
            v-model="form.cleaning_square"
            type="number"
            @keypress="isNumber($event)"
            :success-message="v$.cleaning_square"
          />
        </div>
        <div class="col-md-3 q-pl-md q-pr-md">
          <TextInput
            label="Площадь МОП освещаемая:  "
            name="illuminated__square"
            v-model="form.illuminated_square"
            type="number"
            @keypress="isNumber($event)"
            :success-message="v$.illuminated_square"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <TextInput
            label="Площадь земельного участка: "
            name="land_square"
            v-model="form.land_square"
            type="number"
            @keypress="isNumber($event)"
            :success-message="v$.land_square"
          />
        </div>
      </div>
      <div class="tittle q-mb-lg">Характеристики дома</div>
      <div class="row q-mb-lg">
        <div class="col-md-3 q-pr-md">
          <TextInput
            label="Серия, тип проекта здания:   "
            name="serial_type_project"
            v-model="form.serial_type_project"
          />
        </div>
        <div class="col-md-3 q-pl-md q-pr-md">
          <TextInput
            label="Количество этажей: "
            name="floors"
            type="number"
            v-model="form.floors"
            v-maska="'###'"
            :success-message="v$.floors"
          />
        </div>
        <div class="col-md-3 q-pl-md q-pr-md">
          <TextInput
            label="Количество подземных этажей: "
            name="floors_under"
            v-model="form.floors_under"
            type="number"
            v-maska="'##'"
            :success-message="v$.floors_under"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <TextInput
            label="Число подъездов:"
            name="entrance"
            v-model="form.entrance"
            type="number"
            v-maska="'##'"
            :success-message="v$.entrance"
          />
        </div>
      </div>
      <div class="row q-mb-lg">
        <div class="col-md-3 q-pr-md">
          <SelectMultiple
            title="Класс энергетической эффективности: "
            name="energy_class"
            :model-option="energy_class"
            v-model="form.energy_class"
            label="Выберите класс энергетической эффективности"
            :success-message="v$.energy_class"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <SelectMultiple
            title="Стадии жизненного цикла: "
            name="energy_class"
            :model-option="life_cycle"
            v-model="form.life_cycle"
            label="Выберите стадии жизненного цикла"
            :success-message="v$.life_cycle"
          />
        </div>
      </div>
      <div class="tittle q-mb-lg">Дополнительная информация</div>
      <div class="row">
        <div class="col-md-3 q-pr-md">
          <SwitchButton
            class="status"
            label="Статус культурного наследия: "
            v-model="form.is_culture"
          />
        </div>
        <div class="col-md-3 q-pl-md q-pr-md">
          <SwitchButton
            class="parking"
            label="Наличие подземного паркинга: "
            v-model="form.is_parking"
          />
        </div>
        <div class="col-md-3 q-pl-md q-pr-md">
          <SwitchButton
            class="gaz"
            label="Использование газа: "
            v-model="form.is_gas"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <SwitchButton
            class="invalid"
            label="Наличие приспособлений для инвалидов: "
            v-model="form.is_invalid"
          />
        </div>
      </div>
      <q-btn
        @click="save"
        no-caps
        label="Сохранить"
        class="btn__continue btn btn__save btn__margin"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { rulesData } from "src/setup/Object/Data";
import TextInput from "components/ui/input/TextInput";
import StateBuilding from "../../../Enum/StateBuilding.js";
import EnergyClass from "../../../Enum/EnergyClass.js";
import LifeCycle from "../../../Enum/LifeCycle.js";
import TypeBuilder from "src/Enum/TypeBuilder";
import { toUnixFormat } from "src/lib/helpers";
import DateInput from "/src/components/ui/DateInput/DateInput";
import SwitchButton from "components/ui/switch-button";
import { useRouter } from "vue-router/dist/vue-router";
import { maska } from "maska";
import { cloneDeep, forEach } from "lodash";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import useVuelidate from "@vuelidate/core/dist/index.esm";

export default defineComponent({
  name: "EditDataObject",
  components: { SelectMultiple, SwitchButton, DateInput, TextInput },
  directives: {
    maska,
  },
  emits: ["getNewData"],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const id = route.params.id;
    const router = useRouter();
    const store = useStore();
    const $q = useQuasar();
    const state_building = StateBuilding;
    const energy_class = EnergyClass;
    const life_cycle = LifeCycle;
    const type_building = TypeBuilder;
    const form = computed(() => {
      return props.data;
    });
    const totalSquare = computed(() => {
      if (form.value.living_square && form.value.non_residential_square) {
        let a = form.value.living_square;
        let b = form.value.non_residential_square;
        let sum = Number(a) + Number(b);
        return sum.toFixed(2);
      } else {
        return 0;
      }
    });

    function isNumber(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }

    let v$ = useVuelidate(rulesData, form);
    const save = async () => {
      const sentForm = { ...form.value };
      v$.value.$validate();
      sentForm.total_square = totalSquare.value;
      sentForm.date_of_wear = toUnixFormat(sentForm.date_of_wear);
      sentForm.year_of_construction = toUnixFormat(
        sentForm.year_of_construction
      );
      sentForm.year_of_commissioning = toUnixFormat(
        sentForm.year_of_commissioning
      );
      delete sentForm.company_name;
      try {
        if (v$.value.$error) {
          throw new Error("Не все поля заполнены ");
        }
        $q.loading.show({
          delay: 0,
          message: "Сохранение данных",
        });
        await store.dispatch("object/UpdateObject", sentForm);
        let res = store.getters["object/getSingleObject"];
        if (res) {
          $q.notify({
            color: "positive",
            message: res.message,
            icon: "done",
            position: "top-right",
          });
          $q.loading.hide();
          emit("getNewData");
        }
      } catch (e) {
        let message = null;
        message = e.message;
        if (e.response !== undefined) {
          forEach(e.response.data.errors, function (item) {
            message = item;
          });
        }
        $q.notify({
          color: "negative",
          message: message,
          icon: "warning",
          position: "top-right",
        });
      }
    };

    return {
      save,
      v$,
      id,
      state_building,
      energy_class,
      life_cycle,
      type_building,
      totalSquare,
      form,
      isNumber,
    };
  },
});
</script>
