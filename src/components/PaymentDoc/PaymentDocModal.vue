<template>
  <Teleport to="body">
    <transition v-show="isShow" name="fade">
      <div class="modalbackground" @click.self="close">
        <div class="modal document_preview_modal flex justify-center items-center">
          <div class="flex">
            <img
              class="document q-mr-md"
              :src="require('src/assets/img/payment_document_mockup.jpg')"
              alt="Пример платежного документа">
          </div>
          <q-icon
            name="img:svg/search-zoom-out.svg"
            class="zoom"
            @click="close"
          />
          <div>
            <img
              class="document"
              :src="require('assets/img/payment_document_mockup_2.jpg')"
              alt="Пример платежного документа">
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "BaseForm",
  props: {
    isShow: {
      type: Boolean,
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
  computed: {}
});
</script>
