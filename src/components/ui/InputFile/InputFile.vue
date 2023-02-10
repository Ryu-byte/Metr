<template>
  <div class="forms_group">
    <label
      style="color: #3e424f; padding-bottom: 5px; font-size: 15px"
      :for="name"
      >{{ label }}</label
    >

    <input
      accept="image/jpeg,image/png,application/pdf"
      :name="name"
      :id="name"
      :type="type"
      :disabled="disabled"
      class="forms__input_text bg-grey-1"
      :class="styleDate"
      v-model="inputValue"
      :placeholder="placeholder"
    />
    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputFile",
  props: {
    modelValue: {
      type: [String, Number, null, Array],
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
    styleDate: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    let inputValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        return emit("update:modelValue", val);
      },
    });

    return {
      inputValue,
    };
  },
});
</script>
