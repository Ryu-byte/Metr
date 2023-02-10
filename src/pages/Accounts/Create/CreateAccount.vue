<template>
  <div class="service__info">
    <div class="service__forms">
      <main>
        <div class="component_container">
          <div class="title q-mb-lg">
            Лицевой счет:№{{ number_of_account }} от {{ date }}
          </div>
          <div class="row no-wrap justify-between q-mb-md">
            <div class="col-md-6 q-pr-md">
              <SelectMultiple
                title="Объект: "
                label="Выберите объект"
                name="object"
                height="300px"
                @getRequestPage="getRequestPageObjects"
                v-model="form.house_id"
                :loading="loadingObject"
                :model-option="object_options"
                :success-message="v$.house_id"
                @update:model-value="onChangeFilter($event, 'house')"
              />
              {{ object_options.value }}
            </div>
            <div class="col-md-6 q-pl-md">
              <SelectMultiple
                title="Тип помещения: "
                label="Выберите тип помещения"
                name="type_flat"
                v-model="form.type_flat"
                :model-option="type_flat_options"
                :disable="form.house_id === null || form.house_id.length <= 0"
                @update:model-value="onChangeFilter($event, 'type_flat')"
              />
            </div>
          </div>
          <div class="row no-wrap justify-between q-mb-md">
            <div class="col-md-6 q-pr-md">
              <SelectMultiple
                title="Наименование помещения: "
                label="Выберите наименование помещения"
                name="type_of_flat"
                v-model="form.type_of_flat"
                :model-option="type_of_flat_options"
                :disable="form.type_flat === null || form.type_flat.length <= 0"
                @update:model-value="onChangeFilter($event, 'type_of_flat')"
              />
            </div>
            <div class="col-md-6 q-pl-md">
              <SelectMultiple
                title="Номер помещения: "
                label="Выберите номер помещения"
                name="type_of_flat"
                v-model="form.flat_id"
                :model-option="flat_options"
                :success-message="v$.flat_id"
                :next-page="requestPage"
                :loading="loadingFlat"
                height="300px"
                @getRequestPage="getRequestPageFlats"
                :disable="
                  form.type_of_flat === null || form.type_of_flat.length <= 0
                "
              />
            </div>
          </div>
          <div class="row no-wrap q-mb-md items-center services__title">
            Плательщик
          </div>
          <div class="row q-mb-md">
            <div class="q-gutter-md">
              <q-radio
                v-model="type_resident"
                @click="clearData('fiz')"
                val="1"
                label="Физическое лицо"
              />
              <q-radio
                v-model="type_resident"
                val="2"
                @click="clearData('ur')"
                label="Юридическое лицо"
              />
            </div>
          </div>
          <div v-if="type_resident === '1'" class="fiz">
            <div class="row no-wrap justify-between">
              <div class="col-md-6 q-pr-md">
                <TextInput
                  label="Фамилия Имя Отчество:"
                  name="fio"
                  class=""
                  v-model="form.fio"
                  type="text"
                  :success-message="v$.fio"
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div class="col-md-3 q-pl-md q-pr-md">
                <TextInput
                  label="E-mail:"
                  name="email_resident"
                  class=""
                  v-model="form.email_resident"
                  type="email"
                  :success-message="v$.email_resident"
                  placeholder="mail@mail.ru"
                />
              </div>
              <div class="col-md-3 q-pl-md">
                <TextInput
                  name="phone_resident"
                  label="Телефон"
                  type="tel"
                  placeholder="+7 (999) 999 - 99 -99"
                  v-model="form.phone_resident"
                  :success-message="v$.phone_resident"
                  v-maska="['+7 (###) ###-##-##', '+7 (###) ###-##-##']"
                />
              </div>
            </div>
          </div>
          <div v-else class="ur">
            <div class="row no-wrap justify-between">
              <div class="col-md-3 q-pr-md">
                <TextInput
                  label="Название организации:"
                  name="company_name"
                  class=""
                  v-model="form.company_name"
                  type="text"
                  :success-message="v$.company_name"
                  placeholder="Введите название организации"
                />
              </div>
              <div class="col-md-3 q-pl-md q-pr-md">
                <TextInput
                  label="ИНН организации:"
                  name="inn"
                  class=""
                  v-model="form.inn"
                  type="text"
                  :success-message="v$.inn"
                  placeholder="Введите ИНН организации"
                  v-maska="'#############'"
                />
              </div>
              <div class="col-md-3 q-pl-md">
                <TextInput
                  label="E-mail организации:"
                  name="company_email"
                  type="email"
                  placeholder="mail@mail.ru"
                  v-model="form.company_email"
                  :success-message="v$.company_email"
                />
              </div>
              <div class="col-md-3 q-pl-md">
                <TextInput
                  label="Телефон организации:"
                  name="company_phone"
                  type="tel"
                  placeholder="+7 (999) 999 - 99 -99"
                  v-model="form.company_phone"
                  :success-message="v$.company_phone"
                  v-maska="['+7 (###) ###-##-##', '+7 (###) ###-##-##']"
                />
              </div>
            </div>
            <div class="row no-wrap justify-between">
              <div class="col-md-6 q-pr-md">
                <TextInput
                  label="Контактное лицо организации:"
                  name="fio"
                  class=""
                  v-model="form.fio"
                  type="text"
                  :success-message="v$.fio"
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div class="col-md-3 q-pl-md q-pr-md">
                <TextInput
                  label="E-mail:"
                  name="email_resident"
                  class=""
                  v-model="form.email_resident"
                  type="email"
                  :success-message="v$.email_resident"
                  placeholder="mail@mail.ru"
                />
              </div>
              <div class="col-md-3 q-pl-md">
                <TextInput
                  name="phone_resident"
                  label="Телефон"
                  type="tel"
                  placeholder="+7 (999) 999 - 99 -99"
                  v-model="form.phone_resident"
                  :success-message="v$.phone_resident"
                  v-maska="['+7 (###) ###-##-##', '+7 (###) ###-##-##']"
                />
              </div>
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
      </main>
    </div>
  </div>
</template>
<script>
import {defineComponent, onMounted, reactive, ref, computed} from "vue";
import {useQuasar} from "quasar";
import useVuelidate from "@vuelidate/core";
import TextInput from "components/ui/input/TextInput";
import {useStore} from "vuex";
import _, {cloneDeep, forEach} from "lodash";
import {maska} from "maska";
import {formData, rulesData} from "src/setup/Account/Data";
import {useRouter} from "vue-router";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {api} from "src/lib/axios";
import {getEnumOptions, selectObject} from "src/lib/helpers";

export default defineComponent({
  name: "CreateService",
  directives: {
    maska,
  },
  components: {
    TextInput,
    SelectMultiple,
  },
  setup: function () {
    const $q = useQuasar();
    const store = useStore();
    const router = useRouter();
    const number_of_account = ref(null);
    const flat_options = ref([]);
    const type_resident = ref("1");
    const form = reactive(cloneDeep(formData));
    let date = new Date(Date.now()).toLocaleDateString();
    let objects = store.getters["service/getObjectVariables"];
    const object_options = ref([])
    const type_flat_options = getEnumOptions("getTypeFlats");
    const type_of_flat_options = ref([]);
    const type_of_flat = getEnumOptions("getTypeOfFlat");
    const requestPage = ref(1);
    const loadingObject = ref(false);
    const loadingFlat = ref(false);
    const getRequestPageObjects = async (page) => {
      loadingObject.value = true;
      let arr = await selectObject(store, {
        data: {
          address: "",
          house_id: null,
          type_flat: null,
          apartment: null,
        },
        page: page
      }, "houses")
      arr.forEach(object => {
        object_options.value.push(object)
      })
      if (arr) {
        loadingObject.value = false;
      }
    }
    const getRequestPageFlats = async (page) => {
      if (form.type_flat) {
        loadingFlat.value = true;
        let arr = await selectObject(store, {
          data: {
            type_flat: form.type_flat,
            type_of_flat: form.type_of_flat,
            house_id: form.house_id,
            apartment: "",
          },
          page: requestPage.value
        }, "flats")
        arr.forEach(flat => {
          flat_options.value.push(flat)
        })
        if (arr) {
          loadingFlat.value = false;
        }
      }
      requestPage.value = page + 1
    }
    const onChangeFilter = (value, key) => {
      form.type_flat = key === "house" ? null : form.type_flat;
      form.type_of_flat =
        key === "house" || key === "type_flat" ? null : form.type_of_flat;
      form.flat_id =
        key === "house" || key === "type_flat" || key === "type_of_flat"
          ? null
          : form.flat_id;
      if (key === "type_of_flat") {
        requestPage.value = 1;
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
    const clearData = (key) => {
      if (key === "fiz") {
        form.inn = null;
        form.company_email = null;
        form.company_phone = null;
        form.company_name = null;
        form.email_resident = null;
        form.phone_resident = null;
        form.fio = null;
      } else {
        form.email_resident = null;
        form.phone_resident = null;
        form.fio = null;
      }
    };
    let v$ = useVuelidate(rulesData, form);
    const save = async () => {
      const sentForm = {...form};
      sentForm.number_of_account = number_of_account.value;
      sentForm.type_resident = Number(type_resident.value);
      v$.value.$validate();
      try {
        if (v$.value.$error) {
          throw new Error("Не все поля заполнены ");
        }
        await store.dispatch("account/CreateAccount", sentForm);
        await router.back();
        $q.notify({
          position: "top-right",
          type: "positive",
          message: "Лицевой счет успешно создан",
        });
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
    onMounted(() => {
      loadData();
    });

    async function loadData() {
      try {
        $q.loading.show({
          delay: 400,
        });
        const {
          data: {data},
        } = await api.get("/admin/account/new");
        number_of_account.value = Object.values(data)[0];
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
      store,
      save,
      type_resident,
      number_of_account,
      date,
      form,
      v$,
      objects,
      object_options,
      type_flat_options,
      type_of_flat_options,
      flat_options,
      onChangeFilter,
      clearData,
      requestPage,
      getRequestPageObjects,
      getRequestPageFlats,
      loadingObject,
      loadingFlat
    };
  },
});
</script>
