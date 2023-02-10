<template>
  <transition name="fade">
    <div>
      <div class="modal" :class="size ? 'modal__' + size : ''">
        <div class="modal__header">
          <slot name="header"></slot>
        </div>
        <div class="modal__body">
          <slot name="body"></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Form",
  props: ["size"],
  methods: {
    close() {
      this.$emit("close");
    }
  },
  computed: {}
});
</script>
