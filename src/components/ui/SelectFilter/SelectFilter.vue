<template>
  <div class="forms_group">
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
      v-model="model"
      use-input
      option-value="id"
      emit-label
      option-label="label"
      input-debounce="0"
      :options="options"
      @filter="filterFn"
      behavior="menu"
      @popup-show="popupShow"
    >
      <template v-slot:selection="{ option }">
        <span class="q-select__selection-label">
          {{ option.label }}
        </span>
      </template>
    </q-select>
    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

let props = defineProps({
  name: {
    type: String,
    required: true,
    default: ""
  },
  label: {
    type: String,
    required: true
  },
  styleDate: {
    type: String,
    default: ""
  },
  disable: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object]
  },
  modelOption: { type: [Array, Object], default: Array },
  title: { type: String, required: false },
  dense: { type: Boolean, default: true },
  fullwidth: { type: Boolean, default: false },
  width23: { type: Boolean, default: false },
  nested: { type: Boolean, required: false, default: false },
  successMessage: {
    type: Object,
    default: () => ({ $dirty: true, $error: false }),
  }
});
let emit = defineEmits(["update:modelValue", "update:checked"]);
const stringOptions = [
 'Адрес проживания','fgre'
];
const popupShow = () => {

};

const options = ref(stringOptions);
const model = computed({
  set(val) {
    emit("update:modelValue", val);
  },
  get() {
    return props.modelValue;
  }
});


function filterFn(val, update) {

  if (val === "") {
    update(() => {
      options.value = stringOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1);

  });

}

</script>

