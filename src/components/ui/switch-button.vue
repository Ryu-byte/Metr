<template>
  <div class="forms_group">
    <label class="switch-label">{{ label }}</label>
    <div class="switch-button-control">
      <span class="switch-state" style="padding-right: 7px;">Нет</span>
      <div class="switch-button" :class="{ enabled: modelValue }" @click="toggle" :style="{'--color': color}">
        <div class="button"></div>
      </div>
      <span class="switch-state" style="padding-left: 7px;">Да</span>
    </div>
  </div>

</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ""

  },
  color: {
    type: String,
    required: false,
    default: "#5584FF"
  }
});
const toggle = function() {
  emit("update:modelValue", !props.modelValue);
};
</script>


