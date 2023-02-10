<template>
  <div>
    <div class="row q-pt-sm">
      <div class="col-md-3 q-pr-md">
        <TextInput
          label="Банк:"
          name="meter_bank"
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
          name="meter_bik"
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
          name="meter_account"
          placeholder="Укажите номер расчётного счёта"
        />
      </div>
      <div class="col-md-3 q-pl-md">
        <TextInput
          v-model="inputValue.bank_correspondent_account"
          label="Корреспондентский счёт:"
          type="text"
          v-maska="'############################################'"
          name="meter_corr_account"
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
  name: "CompanyBankMeter",
  components: { TextInput },
  directives: {
    maska,
  },
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

<style scoped></style>
