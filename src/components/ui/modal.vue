<template>
  <transition name="fade">
    <div class="modalbackgroud">
      <div class="modal" :class="size ? 'modal__' + size : ''">
        <div class="modal__header">
          <slot name="header"></slot>
          <span   class="micon micon__close" @click="close"></span>
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
  name: "ModalCustom",
  props: ["size"],
  setup(props, { emit }) {
    return {
      close() {
        emit("close");
      },
    };
  },
});
</script>
