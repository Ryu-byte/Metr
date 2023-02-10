<template>
  <BaseForm v-show="show" @close="close" size="sm">
    <template v-slot:header>
      <h5>Заказать обратный звонок</h5>
    </template>
    <template v-slot:body>
      <div class="form">
        <TextInput
          label="Индекс"
          name="index"
          type="index"
          :disabled="true"
          placeholder="Определяется автоматически"
          :success-message="{ $dirty: true, $error: false }"
          v-model="form.index"
        />
        <TextInput
          label="Регион/район"
          name="region"
          type="region"
          placeholder=" "
          :success-message="{ $dirty: true, $error: false }"
          v-model="form.region"
        />
        <TextInput
          label="Город/н.п."
          name="city"
          type="city"
          placeholder=" "
          :success-message="{ $dirty: true, $error: false }"
          v-model="form.city"
        />
        <TextInput
          label="Улица  "
          name="street"
          type="street"
          placeholder=" "
          :success-message="{ $dirty: true, $error: false }"
          v-model="form.street"
        />
        <TextInput
          label="Дом"
          name="home"
          type="home"
          placeholder=" "
          :success-message="{ $dirty: true, $error: false }"
          v-model="form.street"
        />
        <TextInput
          label="Квартира/офис"
          name="flat"
          type="flat"
          placeholder=" "
          :success-message="{ $dirty: true, $error: false }"
          v-model="form.street"
        />
        <q-btn
          no-caps
          label="Добавить адрес"
          @click="addAddress"
          class="btn btn__save"
          style="width: 100%"
        />
      </div>
    </template>
  </BaseForm>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";
import BaseForm from "components/ui/BaseForm";
import TextInput from "components/ui/input/TextInput";

export default defineComponent({
  name: "AddressModal",
  components: { TextInput, BaseForm },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    let isShow = ref(props.show);
    const form = reactive({
      index: "",
      region: "",
      city: "",
      street: "",
      home: "",
    });
    const close = () => {
      isShow.value = false;
    };

    const addAddress = (e) => {
      e.preventDefault();
    };

    return { form, close, isShow, addAddress };
  },
});
</script>
