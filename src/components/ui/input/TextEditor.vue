<template>
  <div class="forms_group" :style="style">
    <label
      v-if="label"
      class="label"
      :for="name"
    >{{ label }}</label
    >
    <q-editor
      :model-value="inputValue"
      :min-height="height"
      :val="val"
      :content-class="editorClass"
      :placeholder="placeholder"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['undo', 'redo'],
      ]"
    >
    </q-editor>
    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
  </div>
</template>
<script>
import { computed, defineComponent, watch } from "vue";

export default defineComponent({
  name: "TextEditor",
  props: {
    name: {
      type: String,
      required: true,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    editorClass: {
      type: String,
    },
    style: {
      type: String,
    },
    val: {
      type: String,
      default: "",
    },
    height: {
      type: String,
    },
    label: {
      type: String,
    },
    successMessage: {
      type: Object,
      default: () => ({ $dirty: true, $error: false }),
    },
    placeholder: {
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
</style>
