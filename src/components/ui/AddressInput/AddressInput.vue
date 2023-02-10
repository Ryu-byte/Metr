<template>
  <div class="forms_group" :style="style">
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
          class="forms__input_text bg-grey-1"
          :class="[ { 'forms__input_text--error': successMessage.$error }]"
          v-model="inputValue"
          :placeholder="placeholder"
          ref="clone"
          v-on:focus="$event.target.select()"
        />
      </div>

    </div>
    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
  </div>

  <Teleport to="body">
    <BaseForm v-show="isShow" @close="close" size="sm" style="border: none;">
      <template v-slot:header>
        <h5>{{ title }}</h5>
      </template>
      <template v-slot:body>
        <div class="form q-mt-lg">
          <InputDaDataAddress
            label="Регион"
            name="region"
            token="59226899abf9e4d0157e2834fc109979d7fc5986"
            v-model="form.region"
            type="address"
            :params="{
              from_bound: { value: 'region' },
              to_bound: { value: 'region' },
            }"
            v-model:data="data"
            style="margin-bottom: 15px;"
          />
          <InputDaDataAddress
            label="Район  "
            name="area"
            token="59226899abf9e4d0157e2834fc109979d7fc5986"
            type="address"
            v-model:data="data"
            :params="{
              from_bound: { value: 'area' },
              to_bound: { value: 'area' },
              locations: [{ region_fias_id: `${fias_id.region_fias_id}` }],
              restrict_value: true,
            }"
            v-model="form.area"
            style="margin-bottom: 15px;"
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
                { area_fias_id: `${fias_id.area_fias_id}` },
                { region_fias_id: `${fias_id.region_fias_id}` },
              ],
              restrict_value: true,
            }"
            style="margin-bottom: 15px;"
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
                { area_fias_id: `${fias_id.area_fias_id}` },
                { region_fias_id: `${fias_id.region_fias_id}` },
                { city_fias_id: `${fias_id.city_fias_id}` },
              ],
              restrict_value: true,
            }"
            v-model="form.settlement"
            style="margin-bottom: 15px;"
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
                { city_fias_id: `${fias_id.city_fias_id}` },
                { settlement_fias_id: `${fias_id.settlement_fias_id}` },
              ],
              restrict_value: true,
            }"
            v-model="form.street"
            style="margin-bottom: 15px;"
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
              locations: [{ street_fias_id: `${fias_id.street_fias_id}` }],
              restrict_value: true,
            }"
            v-model="form.house"
          />
          <q-btn
            label="Сохранить и закрыть"
            @click="addAddress"
            no-caps
            class="btn btn__save q-mt-md filter__btn"
            style="width: 100%"
          />
        </div>
      </template>
    </BaseForm>
  </Teleport>
</template>

<script>
import {computed, defineComponent, reactive, ref, watch} from "vue";
import useClipboard from "vue-clipboard3";
import BaseForm from "components/ui/BaseForm";
import InputDaDataAddress from "components/ui/InputDaData/InputDaDataAddress";

export default defineComponent({
  name: "AddressInput",
  components: {InputDaDataAddress, BaseForm},
  props: {
    modelValue: [String, Array, Number, Object],
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
    style: {
      type: [String, Number, null, Array, Object, FormData],
      default: "",
    },
    label: {
      type: String,
      required: true,
    },
    successMessage: {
      type: Object,
      default: () => ({$dirty: true, $error: false}),
    },
    placeholder: {
      type: String,
      default: "",
    },
    address: {
      type: [String, Object],
      default: "",
    },
  },
  setup(props, {emit}) {
    const {toClipboard} = useClipboard();

    const isShow = ref(false);
    const data = ref({});
    const inputValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        return emit("update:modelValue", val);
      },
    });
    let fias_id = reactive({
      area: "",
      area_fias_id: "",
      region_fias_id: "",
      region: "",
      city: "",
      city_fias_id: "",
      settlement: "",
      settlement_fias_id: "",
      street: "",
      street_fias_id: "",
    });
    const clone = ref(null);
    let form = reactive({
      index: inputValue.value ? inputValue.value.split(",")[0] : "",
      region: inputValue.value ? inputValue.value.split(",")[1] : "",
      area: inputValue.value ? inputValue.value.split(",")[2] : "",
      city: inputValue.value ? inputValue.value.split(",")[3] : "",
      settlement: inputValue.value ? inputValue.value.split(",")[4] : "",
      street: inputValue.value ? inputValue.value.split(",")[5] : "",
      house: inputValue.value ? inputValue.value.split(",")[6] : "",
    });
    const show = () => {
      isShow.value = true;
    };
    const clean = () => {
      form = {
        index: null,
        region: null,
        area: null,
        city: null,
        settlement: null,
        street: null,
        home: null,
      };
      emit("update:modelValue", "");
    };

    const copy = async () => {
      await toClipboard(inputValue.value);
    };
    const close = () => {
      isShow.value = false;
    };

    const addAddress = () => {
      let address = ''
      let arr = []
      for (let key in form) {
        if (form[key]) {
          arr.push(form[key])
        }
        address = arr.join(', ')
      }
      emit("update:modelValue", address);
      close();
    };
    watch(
      data,
      (value) => {
        if (value) {
          fias_id.region_fias_id = value.data.region_fias_id;
          fias_id.area_fias_id = value.data.area_fias_id;
          fias_id.city_fias_id = value.data.city_fias_id;
          fias_id.settlement_fias_id = value.data.settlement_fias_id;
          fias_id.street_fias_id = value.data.street_fias_id;
          fias_id.region = value.data.region;
          form.area = value.data.area;
          form.city = value.data.city_with_type;
          form.settlement = value.data.settlement;
          form.street = value.data.street;
          form.house = value.data.house;
        }
      },
      {deep: true}
    );

    return {
      inputValue,
      show,
      clean,
      copy,
      clone,
      isShow,
      form,
      close,
      addAddress,
      data,
      fias_id,
    };
  },
});
</script>
<style scoped lang="scss">

.forms__input_text--error {
  border: 2px solid #ff0000;
}
</style>
