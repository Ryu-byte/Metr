<template>
  <div class="bank_form" v-for="(list, idx) in BankList" :key="idx">
    <div class="row justify-between">
      <TextInput
        label="Банк: *"
        name="government"
        v-model="list.bank_name"
        type="bank"
        placeholder="Название банка"
        class="input_row"
        :success-message="{ $dirty: true, $error: false }"
      />
      <TextInput
        v-model="list.bank_correspondent_account"
        label="Корреспондентский счёт: *: *"
        type="text"
        name="corr_account"
        class="input_row"
        placeholder="Укажите номер корреспондентского счёта"
        :success-message="{ $dirty: true, $error: false }"
      />
    </div>
    <div class="row justify-between">
      <TextInput
        v-model="list.bank_bik"
        label="БИК:"
        type="text"
        name="bik"
        class="input_row"
        placeholder="Начните вводить банковский идентификатор"
        :success-message="{ $dirty: true, $error: false }"
      />
      <TextInput
        v-model="list.bank_account"
        label="Расчётный счёт: *"
        type="text"
        name="account"
        class="input_row"
        placeholder="Укажите номер расчётного счёта"
        :success-message="{ $dirty: true, $error: false }"
      />
    </div>
    <q-btn
      no-caps
      icon="img:svg/trash.svg"
      @click="deleteBank(idx, list.id)"
      class="btn btn__delete"
      label="Удалить реквизиты"
    />
  </div>
</template>

<script>
import TextInput from "components/ui/input/TextInput";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "CompanyBank",
  component: {
    TextInput,
  },
  props: {
    BankList: [Array],
  },
  components: { TextInput },
  setup(props, { emit }) {
    const store = useStore();
    function isEmpty(str) {
      if (String(str).trim() == "") return true;
      return false;
    }

    let item = computed({
      get() {
        return props.BankList;
      },
      set(value) {
        emit("updateBank", value);
      },
    });
    const deleteBank = async (idx, id) => {
      if (!isEmpty(id)) {
        await store.dispatch("company/CompanyBankDelete", id);
      }
      emit("BankList", item.value.splice(idx, 1));
    };
    return {
      deleteBank,
      item,
    };
  },
});
</script>
