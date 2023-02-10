<template>
  <div class="component_container object">
    <div class="forms">
      <main>
        <div class="tittle q-mb-lg">Редактировать ИПУ</div>
        <div class="row no-wrap">
          <div class="col-md-4 q-pr-md">
            <SelectMultiple
              label="Выберите тип помещения"
              title="Тип помещения: "
              name="type_flat"
              :model-value="form.type_flat"
              :model-option="type_flat_options"
              :success-message="v$.type_flat"
              @update:model-value="onChangeFilter($event, 'type_flat')"
            />
          </div>
          <div class="col-md-4 q-pl-md q-pr-md">
            <SelectMultiple
              label="Выберите наименование помещения"
              title="Наименование помещения: "
              name="type_of_flat"
              :model-value="form.type_of_flat"
              :model-option="type_of_flat_options"
              :disable="form.type_flat === null"
              :success-message="v$.type_of_flat"
              @update:model-value="onChangeFilter($event, 'type_of_flat')"
            />
          </div>
          <div class="col-md-4 q-pl-md">
            <SelectMultiple
              label="Выберите помещение"
              title="Помещение:"
              name="flat_id"
              :model-value="form.flat_id"
              :model-option="flat_options"
              :success-message="v$.flat_id"
              :disable="form.type_of_flat === null"
              height="300px"
              :next-page="requestPage"
              :loading="loading"
              @getRequestPage="getRequestPage"
              @update:model-value="onChangeFilter($event, 'flat_id')"
            />
          </div>
        </div>
        <div class="row no-wrap q-mb-lg">
          <div class="col-md-4 q-pr-md">
            <SelectMultiple
              label="Выберите услугу"
              name="type_meter"
              v-model="form.type_meter"
              :model-option="meterType_options"
              :success-message="v$.type_meter"
              title="Услуга: "
            />
          </div>
          <div class="col-md-8 q-pl-md">
            <TextInput
              label="Название счетчика:"
              name="name_meter"
              v-model="form.name_meter"
              type="text"
              :success-message="v$.name_meter"
              placeholder="Укажите название счётчика"
            />
          </div>
        </div>
        <div class="row no-wrap">
          <div class="col-md-4 q-pr-md">
            <TextInput
              label="Предыдущие показания:"
              name="previous_indication"
              v-model="form.previous_indication"
              type="number"
              :success-message="v$.previous_indication"
              placeholder="Укажите предыдущие показания"
            />
          </div>
          <div class="col-md-4 q-pl-md q-pr-md">
            <TextInput
              label="Текущие показания:"
              name="current_indication"
              v-model="form.current_indication"
              type="number"
              :success-message="v$.current_indication"
              placeholder="Укажите текущие показания:"
            />
          </div>
          <div class="col-md-4 q-pl-md">
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
            <SelectMultiple
              label="Выберите вид ПУ по количеству тарифов"
              name="type_tariff_meter"
              v-model="form.type_tariff_meter"
              :model-option="type_tariff_meter_options"
              :success-message="v$.type_tariff_meter"
              title="Вид ПУ по количеству тарифов:"
            />
          </div>
          <div class="col-md-4 q-pl-md">
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
        </div>
        <div class="row no-wrap q-mb-lg">
          <div class="col-md-4 q-pr-md">
            <DateInput
              title="дд.мм.гггг"
              :is-range="false"
              name="date_exploitation"
              label="Дата ввода в эксплуатацию:"
              style-date="input_date"
              dense="dense"
              v-model="form.date_exploitation"
              :success-message="v$.date_exploitation"
              v-maska="'##.##.####'"
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
              name="status_meter"
              label="Выберите название услуги"
              v-model="form.status_meter"
              :model-option="status_options"
              :success-message="v$.status_meter"
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
import {defineComponent, onMounted, reactive, ref} from "vue";
import {useQuasar} from "quasar";
import useVuelidate from "@vuelidate/core";
import TextInput from "components/ui/input/TextInput";
import {useStore} from "vuex";
import _, {cloneDeep, forEach} from "lodash";
import {maska} from "maska";
import {formData, rulesData} from "src/setup/Object/Ipu";
import {useRoute, useRouter} from "vue-router";
import DateInput from "components/ui/DateInput/DateInput";
import {formatUnixDateTime, getEnumOptions, selectObject, toUnixFormat} from "src/lib/helpers";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import TypeTariffMeter from "src/Enum/TypeTariffMeter";

export default defineComponent({
  name: "EditIpuObject",
  components: {SelectMultiple, TextInput, DateInput},
  directives: {maska},
  setup() {
    const store = useStore();
    const $q = useQuasar();
    let router = useRouter();
    let route = useRoute();
    const {id} = route.params;
    const form = reactive(cloneDeep(formData));
    let v$ = useVuelidate(rulesData, form);
    let type_of_flat = getEnumOptions("getTypeOfFlat")
    let type_flat_options = getEnumOptions("getTypeFlats")
    let type_of_flat_options = ref([]);
    let flat_options = ref([]);
    const type_tariff_meter_options = TypeTariffMeter
    const meterType_options = getEnumOptions("getMeterType")
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

    const requestPage = ref(1);
    const loading = ref(false);
    const updateOptions = ref(false);

    const getRequestPage = async (page) => {
      if (form.type_flat) {
        loading.value = true;
        if (flat_options.value.length === 1 && updateOptions.value) {
          flat_options.value.length = 0;
          updateOptions.value = false;
        }
        let arr = await selectObject(store, {
          data: {
            type_flat: form.type_flat,
            type_of_flat: form.type_of_flat,
            house_id: id,
            apartment: "",
          },
          page: requestPage.value
        }, "flats")
        arr.forEach(flat => {
          flat_options.value.push(flat)
        })
        if (arr) {
          loading.value = false;
        }
      }
      requestPage.value = page + 1
    }
    const onChangeFilter = (value, key) => {
      form[key] = value
      if (key === "type_of_flat") {
        requestPage.value = 1;
      }
      if (key === 'type_flat' || !form.type_flat) {
        form.type_of_flat = null
        form.flat_id = null
      }
      if (key === 'type_of_flat' || !form.type_of_flat) {
        form.flat_id = null
        flat_options.value.length = 0;
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

    async function loadData() {
      $q.loading.show({
        delay: 400,
      });
      await store.dispatch("object/getSingleObjectIpu", route.params.item);
      let data = store.getters["object/getIpuObject"]
      if (data) {
        for (let key in data) {
          if (key.indexOf('date') === 0) {
            form[key] = formatUnixDateTime(data[key])
          } else {
            form[key] = data[key]
          }
        }
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
      form.flat_id = form.apartment.flat_id
      flat_options.value.push({
        value: form.apartment.flat_id,
        label: form.apartment.apartment
      })
      updateOptions.value = true;
      $q.loading.hide();
    }

    onMounted(async () => {
      await loadData();
    });

    async function save() {
      const sentForm = {...form};
      sentForm.date_exploitation = toUnixFormat(sentForm.date_exploitation);
      sentForm.date_end_verification = toUnixFormat(sentForm.date_end_verification);
      sentForm.house_id = id
      delete sentForm.apartment
      v$.value.$validate();
      try {
        if (v$.value.$invalid) {
          throw new Error("Не все поля заполнены");
        }
        $q.loading.show({
          delay: 0,
          message: "Сохранение данных",
        });
        await store.dispatch("object/UpdateObjectIpu", sentForm);
        let res = store.getters["object/getIpuObject"];
        if (res) {
          $q.notify({
            color: "positive",
            message: res.message,
            icon: "done",
            position: "top-right",
          });
          $q.loading.hide();
          await router.push(`/objects/single=${route.params.id}/ipu`)
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
    }

    return {
      form,
      v$,
      save,
      onChangeFilter,
      meterType_options,
      status_options,
      flat_options,
      type_of_flat_options,
      type_flat_options,
      type_tariff_meter_options,
      getRequestPage,
      requestPage,
      loading
    };
  },
});
</script>
