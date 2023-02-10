<template>
  <div>
    <div v-for="(item, index) in bankList" :key="index">
      <div class="row q-pt-sm">
        <div class="col-md-3 q-pr-md">
          <TextInput
            label="Банк:"
            name="bank"
            v-model="item.bank_name"
            type="text"
            placeholder="Укажите название банка"
          />
        </div>
        <div class="col-md-3 q-pl-md q-pr-md">
          <TextInput
            v-model="item.bank_bik"
            label="БИК:"
            type="text"
            name="bik"
            is-number
            v-maska="'################'"
            placeholder="Укажите банковский идентификатор"
          />
        </div>
        <div class="col-md-3 q-pl-md q-pr-md">
          <TextInput
            v-model="item.bank_account"
            label="Расчётный счёт:"
            type="text"
            v-maska="'############################################'"
            name="account"
            placeholder="Укажите номер расчётного счёта"
          />
        </div>
        <div class="col-md-3 q-pl-md">
          <TextInput
            v-model="item.bank_correspondent_account"
            label="Корреспондентский счёт:"
            type="text"
            v-maska="'############################################'"
            name="corr_account"
            placeholder="Укажите номер корреспондентского счёта"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 q-pr-md">
          <SelectMultiple
            label="Выберите объект"
            title="Объект:"
            name="house"
            :model-value="item.house_id"
            @click.once="select"
            :model-option="object_options"
            @update:model-value="onChangeFilter($event, 'house_id', index)"
          />
        </div>
        <div class="col-md-3 q-pl-md flex items-center">
          <q-checkbox v-model="item.capital_repair"
                      :disable="item.house_id === null"
          >Спец.счёт капитального ремонта
          </q-checkbox
          >

        </div>
      </div>
      <div v-if="index > 0" class="row no-wrap q-mb-md">
        <q-btn
          class="services__tariff-delete btn"
          no-caps
          @click="deleteBank(index, item.id)"
        >
          <q-icon
            name="img:svg/close_icon_red.svg"
            class="services__tariff-img on-left"
          />
          Удалить счёт
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "components/ui/input/TextInput";
import {computed, defineComponent, ref} from "vue";
import {useStore} from "vuex";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {maska} from "maska";
import _ from "lodash";
import {api} from "src/lib/axios";
import {useQuasar} from "quasar";
import {selectCompany, selectObject} from "src/lib/helpers";

export default defineComponent({
  name: "CompanyBankOwn",
  components: {SelectMultiple, TextInput},
  props: {
    modelValue: {
      type: [String, Number, null, Array, Object, FormData],
      default: "",
    },
  },
  directives: {
    maska,
  },
  setup(props, {emit}) {
    const $q = useQuasar();
    let bankList = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        return emit("update:modelValue", val);
      },
    });
    const store = useStore();
    let object_options = ref([]);
    bankList.value.forEach(bank => {
      if(bank.address) {
        object_options.value.push({
          value: bank.house_id,
          label: bank.address.address
        })
      }
    })

    async function select() {
        object_options.value = await selectObject(store)
    }
    const onChangeFilter = (value,key, index) => {
      bankList.value[index][key] = value
    };
    const deleteBank = async (index, id) => {
      bankList.value = bankList.value.splice(index, 1);
      if (id !== null) {
        await api.delete("/admin/company/bank=" + id);
        $q.notify({
          color: "negative",
          message: "Банковский счёт удалён",
          position: "top-right",
          type: "positive",
        });
      }
    };
    return {
      bankList,
      onChangeFilter,
      deleteBank,
      select,
      object_options,
    };
  },
});
</script>
