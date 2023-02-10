<template>
  <div :class="customWidth">
    <label
      v-if="label.length > 0"
      class="label"
      :for="name"
      >{{ label }}</label
    >
    <q-select
      class="forms__select bg-grey-1"
      outlined
      :name="name"
      :id="name"
      type="type"
      :class="[styleDate, { 'forms__input_text--error': successMessage.$error }]"
      option-value="value"
      option-label="label"
      v-model="inputValue"
      emit-value

      map-options
      :disable="disable"
      :options="modelOption"
    >
      <template v-slot:option="{ itemProps, opt, selected }">
        <q-item v-bind="itemProps">
          <q-item-section side>
            <q-checkbox :model-value="selected"></q-checkbox>
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="opt.label"></q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
  </div>
</template>
<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "CustomSelect",
  props: {
    modelValue: [String, Number, Boolean],
    name: {
      type: String,
      required: true,
      default: "",
    },
    label: {
      type: String,
      required: true,
    },
    styleDate: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "Choose an option"
    },
    modelOption: { type: Array, default: Array },
    title: { type: String, default: "" },
    dense: { type: Boolean, default: true },
    fullwidth: { type: Boolean, default: false },
    width23: { type: Boolean, default: false },
    nested: { type: Boolean, required: false, default: false },
    customWidth: { type: String, default: "forms_group" },
    successMessage: {
      type: Object,
      default: () => ({ $dirty: true, $error: false }),
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
    return { inputValue };
  },
});
</script>
<style scoped lang="scss">

.forms__input_text--error {
  border: 2px solid #ff0000;
}
</style>
