<template>
  <transition name="fade">
    <div class="modalbackground"   @click.self="close">
      <div class="modal" :class="size ? 'modal__' + size : ''">
        <div class="modal__header" :style="style">
          <slot name="header"></slot>
          <q-icon
            class="close_icon"
            name="img:svg/close_icon_new.svg"
            @click="close"
          />
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
  name: "BaseForm",
  props: ["size", "style"],
  methods: {
    close() {
      this.$emit("close");
    }
  },
  computed: {}
});
</script>
