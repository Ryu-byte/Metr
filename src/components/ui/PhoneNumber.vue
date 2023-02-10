<template>
  <div class="q-pb-md">
    <div>
      <div
        v-for="item in data"
        v-bind:key="item.phone"
        class="row no-wrap items-center justify-between"
      >
        <TextInput
          :id="item.id"
          class="input_row"
          name="phone"
          label="Контактный телефон:*"
          type="tel"
          placeholder="+7 (999) 999 - 99 -99"
          :success-message="{ $dirty: true, $error: false }"
          v-model="item.phone"
        />
      </div>

      <q-btn
        v-if="isShow"
        icon="img:svg/add.svg"
        label="Добавить дополнительный телефон"
        class="btn btn__save input_row"
        @click="addPhone"
      />
      <q-btn
        no-caps
        v-else
        icon="img:svg/trash.svg"
        label="Удалить телефон"
        class="btn btn__delete input_row"
        @click="removePhone"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TextInput from "components/ui/input/TextInput";
const emit = defineEmits(["update:data"]);
const props = defineProps({
  data: {
    type: Object,
    default: () => ({
      id: "",
      phone: "",
      AddPhone: "",
    }),
  },
});
let form = ref({
  phone: "",
  AddPhone: "",
  phones: [],
});
let isShow = ref(true);

function addPhone() {
  isShow.value = false;
  form.value.phones.push(form.value.phone, form.value.AddPhone);
  form.value.phone = "";
}

function removePhone() {
  isShow.value = true;
  form.value.phones.pop();
}
</script>
