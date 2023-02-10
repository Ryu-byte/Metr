<template>
  <div>
    <div class="row q-pt-sm">
      <div class="col-md-8 q-pr-md">
        <TextInput
          label="Название РИЦ:"
          name="ric_name"
          v-model="inputValue.ric_name"
          type="text"
          placeholder="Укажите название РИЦ"
        />
      </div>
      <div class="col-md-4 q-pl-md">
        <TextInput
          label="ИНН РИЦ:"
          name="ric_inn"
          v-model="inputValue.ric_inn"
          type="text"
          v-maska="'############################################'"
          placeholder="Укажите ИНН РИЦ"
        />
      </div>
    </div>
    <div class="row q-pt-lg">
      <div class="col-md-3 q-pr-md">
        <TextInput
          label="Банк:"
          name="ric_bank"
          v-model="inputValue.bank_name"
          type="text"
          placeholder="Укажите название банка"
        />
      </div>
      <div class="col-md-3 q-pl-md q-pr-md">
        <TextInput
          v-model="inputValue.bank_bik"
          label="БИК:"
          type="text"
          name="ric_bik"
          v-maska="'############################################'"
          placeholder="Укажите банковский идентификатор"
        />
      </div>
      <div class="col-md-3 q-pl-md q-pr-md">
        <TextInput
          v-model="inputValue.bank_account"
          label="Расчётный счёт:"
          type="text"
          v-maska="'############################################'"
          name="ric_account"
          placeholder="Укажите номер расчётного счёта"
        />
      </div>
      <div class="col-md-3 q-pl-md">
        <TextInput
          v-model="inputValue.bank_correspondent_account"
          label="Корреспондентский счёт:"
          type="text"
          name="ric_corr_account"
          v-maska="'############################################'"
          placeholder="Укажите номер корреспондентского счёта"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "components/ui/input/TextInput";
import { computed, defineComponent } from "vue";
import { maska } from "maska";
export default defineComponent({
  name: "CompanyBankRic",
  directives: {
    maska,
  },
  components: { TextInput },
  props: {
    modelValue: {
      type: [String, Number, null, Array, Object, FormData],
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
    return {
      inputValue,
    };
  },
});
</script>
