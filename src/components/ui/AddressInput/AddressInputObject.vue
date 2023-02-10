<template>
  <div class="forms_group">
    <label
      class="label"
      :for="name"
      >{{ label }}</label
    >
    <div class="row no-wrap">
      <div @click="isShow = true" style="width: 100%">
        <input
          :name="name"
          :id="name"
          :type="type"
          autocomplete="off"
          disabled
          :class="[ { 'forms__input_text--error': successMessage.$error }]"
          class="forms__input_text bg-grey-1"
          v-model="inputValue"
          :placeholder="placeholder"
        />
      </div>
    </div>
    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
  </div>

  <Teleport to="body">
    <BaseForm v-show="isShow" @close="close" size="sm">
      <template v-slot:header>
        <h5>{{ title }}</h5>
      </template>
      <template v-slot:body>
        <div class="form q-mt-lg">
          <InputDaDataAddress
            label="Субъект РФ"
            name="region"
            token="59226899abf9e4d0157e2834fc109979d7fc5986"
            v-model="form.region"
            :success-message="v$.region_fias_id"
            type="address"
            :params="{
              from_bound: { value: 'region' },
              to_bound: { value: 'region' },
            }"
            v-model:data="data"
          />

          <InputDaDataAddress
            label="Район  "
            name="district"
            token="59226899abf9e4d0157e2834fc109979d7fc5986"
            type="address"
            v-model:data="data"
            :params="{
              from_bound: { value: 'area' },
              to_bound: { value: 'area' },
              locations: [{ region_fias_id: fias_id.region_fias_id }],
              restrict_value: true,
            }"
            v-model="form.district"
          />

          <InputDaDataAddress
            label="Город"
            name="city"
            token="59226899abf9e4d0157e2834fc109979d7fc5986"
            v-model="form.city"
            type="address"
            v-model:data="data"
            :params="{
              from_bound: { value: 'city' },
              to_bound: { value: 'city' },
              locations: [
                {
                  area_fias_id: fias_id.area_fias_id,
                  region_fias_id: fias_id.region_fias_id,
                },
              ],
              restrict_value: true,
            }"
          />

          <InputDaDataAddress
            label="Населенный пункт  "
            name="settlement"
            token="59226899abf9e4d0157e2834fc109979d7fc5986"
            type="address"
            v-model:data="data"
            :params="{
              from_bound: { value: 'settlement' },
              to_bound: { value: 'settlement' },
              locations: [
                {
                  area_fias_id: fias_id.area_fias_id,
                  region_fias_id: fias_id.region_fias_id,
                  city_fias_id: fias_id.city_fias_id,
                },
              ],
              restrict_value: true,
            }"
            v-model="form.settlement"
          />

          <InputDaDataAddress
            label="Улица  "
            name="street"
            token="59226899abf9e4d0157e2834fc109979d7fc5986"
            type="address"
            v-model:data="data"
            :params="{
              from_bound: { value: 'street' },
              to_bound: { value: 'street' },
              locations: [
                {
                  area_fias_id: fias_id.area_fias_id,
                  region_fias_id: fias_id.region_fias_id,
                  city_fias_id: fias_id.city_fias_id,
                  settlement_fias_id: fias_id.settlement_fias_id,
                },
              ],
              restrict_value: true,
            }"
            v-model="form.street"
          />
          <InputDaDataAddress
            label="Дом  "
            name="house"
            token="59226899abf9e4d0157e2834fc109979d7fc5986"
            type="address"
            v-model:data="data"
            :params="{
              from_bound: { value: 'house' },
              to_bound: { value: 'house' },
              locations: [
                {
                  area_fias_id: fias_id.area_fias_id,
                  street_fias_id: fias_id.street_fias_id,
                  region_fias_id: fias_id.region_fias_id,
                  city_fias_id: fias_id.city_fias_id,
                  settlement_fias_id: fias_id.settlement_fias_id,
                },
              ],
              restrict_value: true,
            }"
            v-model="form.house"
            :success-message="v$.house_fias_id"
          />
          <q-btn
            no-caps
            label="Добавить адрес"
            @click="addAddress"
            class="btn btn__save"
            style="width: 100%"
            icon="img:svg/add.svg"
          />
          <q-checkbox
            v-if="name == 'legal_address'"
            v-model="val"
            label="Продублировать данный адрес для всех адресов"
          />
        </div>
      </template>
    </BaseForm>
  </Teleport>
</template>

<script>
import { computed, defineComponent, reactive, ref, watch } from "vue";
import BaseForm from "components/ui/BaseForm";
import useVuelidate from "@vuelidate/core";
import { useQuasar } from "quasar";
import { helpers, required } from "@vuelidate/validators";
import { forEach } from "lodash";
import InputDaDataAddress from "components/ui/InputDaData/InputDaDataAddress";

export default defineComponent({
  name: "AddressInputObject",
  components: { InputDaDataAddress, BaseForm },
  props: {
    modelValue: [String, Array, Number, Boolean, Object],
    type: {
      type: String,
      default: "text",
    },
    title: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: Object,
    },
    placeholder: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    geo_data: {
      type: Object || null,
      default: null,
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    let isShow = ref(false);
    let data = ref({});
    let inputValue = computed({
      get() {
        let address = props.modelValue;
        if (typeof props.modelValue == "string") {
          return address;
        } else if (typeof props.modelValue == "object") {
          address = "";
          forEach(props.modelValue, (value, key) => {
            const excluded = ["geo_data", "index"];
            if (value && !excluded.includes(key)) {
              return (address += `${value} `);
            }
          });
        }
        return address;
      },
      set(val) {
        return emit("update:modelValue", val);
      },
    });
    let options = ref({});

    let form = reactive({
      region: "",
      district: "",
      city: "",
      settlement: "",
      street: "",
      house: "",
    });
    let geo_data = reactive({
      geo_lat: "",
      geo_long: "",
      fias_id: "",
      oktmo: "",
    });
    let fias_id = reactive({
      region_fias_id: "",
      area_fias_id: "",
      city_fias_id: "",
      settlement_fias_id: "",
      street_fias_id: "",
      house_fias_id: "",
    });
    let rules = computed(() => {
      return {
        region_fias_id: {
          required: helpers.withMessage(
            "Поле обязательное для заполнения",
            required
          ),
        },
        house_fias_id: {
          required: helpers.withMessage(
            "Поле обязательное для заполнения",
            required
          ),
        },
      };
    });
    let v$ = useVuelidate(rules, fias_id);
    const close = () => {
      isShow.value = false;
    };
    const addAddress = () => {
      v$.value.$validate();
      try {
        if (v$.value.$error) {
          throw new Error("Не все поля заполнены ");
        }
        emit("update:modelValue", form);
        emit("update:geo_data", geo_data);
        close();
      } catch (e) {
        $q.notify({
          color: "negative",
          message: e.message,
          icon: "warning",
          position: "top-right",
        });
      }
    };

    watch(
      data,
      (value) => {
        if (value) {
          geo_data.fias_id = value.data.fias_id;
          geo_data.geo_lat = value.data.geo_lat;
          geo_data.geo_long = value.data.geo_lon;
          geo_data.oktmo = value.data.oktmo;
          for (let key in value.data) {
            if (key in fias_id) {
              fias_id[key] = value.data[key];
            }
          }
        }
      },
      { deep: true }
    );

    return {
      isShow,
      form,
      close,
      addAddress,
      data,
      inputValue,
      options,
      fias_id,
      v$,
    };
  },
});
</script>
