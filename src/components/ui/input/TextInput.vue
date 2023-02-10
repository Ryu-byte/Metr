<template>
  <div class="forms_group" :style="style">
    <label
        v-if="label"
        class="label"
        :for="name"
    >{{ label }}</label
    >
    <input
        accept="image/jpeg,image/png,application/pdf, application/msword, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :name="name"
        :id="name"
        :type="type"
        :disabled="disabled"
        :val="val"
        class="forms__input_text bg-grey-1"
        :class="[styleDate, { 'forms__input_text--error': successMessage.$error }]"
        v-model="inputValue"
        :placeholder="placeholder"
        multiple
    />
    <label v-if="type === 'file'" :for="name" class="justify-center items-center" style="display: flex;">
      <q-icon
          :name="loadIcon"
          style="padding-right: 10px; width: 17px; height: 17px"
      />
      {{ loadString }}</label
    >
    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
  </div>
</template>
<script>
import {computed, defineComponent, watch} from "vue";

export default defineComponent({
  name: "TextInput",
  props: {
    modelValue: {
      type: [String, Number, null, Array, Object, FormData],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loadString: {
      type: String,
    },
    loadIcon: {
      type: String,
    },
    style: {
      type: [String, Number, null, Array, Object, FormData],
      default: "",
    },
    val: {
      type: [String, Number, null, Array, Object, FormData],
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    label: {
      type: String,
    },
    successMessage: {
      type: Object,
      default: () => ({$dirty: true, $error: false}),
    },
    placeholder: {
      type: String,
      default: "",
    },
    styleDate: {
      type: String,
      default: "",
    },
  },
  setup(props, {emit}) {
    let inputValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        return emit("update:modelValue", val);
      },
    });
    let value = computed({
      get() {
        return props.val;
      },
      set(val) {
        emit("update:modelValue", val);
      },
    });
    watch(value, (val) => {
      if (val) {
        emit("update:modelValue", val);
      }
    });
    return {
      inputValue,
    };
  },
});
</script>
<style scoped lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.forms__input_text--error {
  border: 2px solid #ff0000;
}
</style>
