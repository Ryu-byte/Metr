<template>
  <div class="component_container object">
    <div class="forms">
      <main>
        <div class="tittle q-mb-lg">Добавить ОПУ</div>
        <div class="row no-wrap">
          <div class="col-md-4 q-pr-md">
            <SelectMultiple
              label="Выберите услугу"
              name="type"
              v-model="form.type_meter"
              :model-option="meterType_options"
              :success-message="v$.type_meter"
              title="Услуга: "
            />
          </div>
          <div class="col-md-4 q-pr-md q-pl-md">
            <TextInput
              label="Название счетчика:"
              name="brand"
              v-model="form.name_meter"
              type="text"
              :success-message="v$.name_meter"
              placeholder="Укажите название счётчика"
            />
          </div>
          <div class="col-md-4 q-pr-md q-pl-md">
            <TextInput
              label="Марка/модель ПУ:"
              name="brand"
              v-model="form.brand"
              type="text"
              :success-message="v$.brand"
              placeholder="Укажите марку / модель ПУ"
            />
          </div>
        </div>
        <div class="row no-wrap">
          <div class="col-md-4 q-pr-md">
            <TextInput
              label="Заводской заводской номер счетчика:"
              name="number_meter"
              v-model="form.number_meter"
              type="text"
              :success-message="v$.number_meter"
              placeholder="Укажите заводской номер счётчика"
            />
          </div>
          <div class="col-md-4 q-pl-md q-pr-md">
            <DateInput
              title="дд.мм.гггг"
              :is-range="false"
              name="date_install"
              label="Дата ввода в эксплуатацию:"
              style-date="input_date"
              dense="dense"
              v-model="form.date_exploitation"
              :success-message="v$.date_exploitation"
              v-maska="'##.##.####'"
            />
          </div>
          <div class="col-md-4 q-pl-md">
            <SelectMultiple
              label="Выберите вид ПУ по количеству тарифов"
              name="type_py"
              v-model="form.type_tariff_meter"
              :model-option="type_tariff_meter_options"
              :success-message="v$.type_tariff_meter"
              title="Вид ПУ по количеству тарифов:"
            />
          </div>
        </div>
        <div class="row no-wrap">
          <div class="col-md-4 q-pr-md">
            <TextInput
              label="Базовое показание:"
              name="indication_base"
              v-model="form.indication_base"
              type="text"
              v-maska="'#############'"
              :success-message="v$.indication_base"
              placeholder="Укажите базовое показание"
            />
          </div>
          <div class="col-md-4 q-pl-md q-pr-md">
            <DateInput
              title="дд.мм.гггг"
              :is-range="false"
              name="date_end_verification"
              label="Срок окончания поверки:"
              style-date="input_date"
              dense="dense"
              v-model="form.date_end_verification"
              :success-message="v$.date_end_verification"
              v-maska="'##.##.####'"
            />
          </div>
          <div class="col-md-4 q-pl-md">
            <SelectMultiple
              title="Статус:"
              name="status"
              label="Выберите название услуги"
              v-model="form.status_meter"
              :model-option="status_options"
              :success-message="v$.status_meter"
            />
          </div>
        </div>
        <div class="row no-wrap q-pt-lg">
          <div class="col-md-2 q-pr-md">
            <SwitchButton
              label="Дистанционное снятие показаний: "
              v-model="form.remote_control"
            />
          </div>
          <div class="col-md-2 q-pr-md q-pl-md">
            <SwitchButton
              label="Наличие датчиков температуры: "
              v-model="form.temperature_sensors"
            />
          </div>
          <div class="col-md-2 q-pl-md">
            <SwitchButton
              label="Наличие датчиков давления: "
              v-model="form.pressure_sensors"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <q-btn
              @click="save"
              no-caps
              size="14px"
              label="Сохранить"
              class="btn btn__save btn__continue btn__margin"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import {defineComponent, onMounted, reactive, computed} from "vue";
import {useQuasar} from "quasar";
import useVuelidate from "@vuelidate/core";
import TextInput from "components/ui/input/TextInput";
import {useStore} from "vuex";
import {cloneDeep, forEach} from "lodash";
import {maska} from "maska";
import {formData, rulesData} from "src/setup/Object/Opu";
import {useRoute, useRouter} from "vue-router";
import DateInput from "components/ui/DateInput/DateInput";
import SwitchButton from "components/ui/switch-button";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {getEnumOptions, toUnixFormat} from "src/lib/helpers";
import TypeTariffMeter from "src/Enum/TypeTariffMeter";

export default defineComponent({
  name: "CreateOpuObject",
  directives: {
    maska,
  },
  components: {
    DateInput,
    TextInput,
    SwitchButton,
    SelectMultiple,
  },
  setup() {
    const $q = useQuasar();
    let store = useStore();
    let router = useRouter();
    let route = useRoute();
    const form = reactive(cloneDeep(formData));
    const meterType_options = getEnumOptions("getMeterType")
    const type_tariff_meter_options = TypeTariffMeter
    const status_options = [
      {
        value: true,
        label: "Работает",
      },
      {
        value: false,
        label: "Не работает",
      },
    ];
    let v$ = useVuelidate(rulesData, form);
    const save = async () => {
      const sentForm = {...form};
      sentForm.house_id = route.params.id;
      sentForm.date_exploitation = toUnixFormat(sentForm.date_exploitation);
      sentForm.date_end_verification = toUnixFormat(sentForm.date_end_verification);
      v$.value.$validate();
      try {
        if (v$.value.$error) {
          throw new Error("Не все поля заполнены ");
        }
        $q.loading.show({
          delay: 0,
          message: "Сохранение данных",
        });
        await store.dispatch("object/CreateOpu", sentForm);
        let res = store.getters["object/getOpuObject"];
        if (res) {
          $q.notify({
            color: "positive",
            message: res.message,
            icon: "done",
            position: "top-right",
          });
          $q.loading.hide();
          await router.push(`/objects/single=${route.params.id}/opu`)
        }
      } catch (e) {
        $q.loading.hide();
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
    onMounted(() => {
      loadData();
    });

    async function loadData() {
      try {
        $q.loading.show({
          delay: 400,
        });
        $q.loading.hide();
      } catch (err) {
        $q.notify({
          color: "negative",
          message: err.response.data.errors.message,
          icon: "warning",
          position: "top-right",
        });
      }
    }

    return {
      save,
      form,
      v$,
      meterType_options,
      status_options,
      type_tariff_meter_options
    };
  },
});
</script>
