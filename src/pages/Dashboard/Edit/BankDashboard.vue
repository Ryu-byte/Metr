<template>
  <div class="component_container company">
    <div class="tittle q-mb-lg">Банковские реквизиты</div>
    <div class="forms">
      <div class="row q-mb-lg">
        <p
          style="color: #000; font-size: 12px; padding-bottom: 7px"
        >
          Расположение расчетного счета:
        </p>
        <div class="col-md-12">
          <q-radio
            v-model="checking_account"
            dense
            :val="1"
            label="Свой расчетный счет"
            class="q-mr-md"
          />
          <q-radio
            v-model="checking_account"
            :val="2"
            dense
            label="Счет РИЦ"
            class="q-mr-md"
          />
          <q-radio
            v-model="checking_account"
            :val="3"
            dense
            label="Счет «МЕТРЫ»"
          />
          <div v-if="checking_account === 1" class="inline-block q-pl-md">
            <q-btn
              class="btn services__tariff-add"
              no-caps
              @click.prevent="addBank"
            >
              <q-icon
                name="img:svg/add_icon.svg"
                class="services__tariff-img"
              />
              Добавить счёт
            </q-btn>
          </div>
        </div>
      </div>
      <CompanyBankOwn v-if="checking_account === 1 && !isLoading" :model-value="bankData"/>
      <CompanyBankRic v-if="checking_account === 2" :model-value="form[0]"/>
      <CompanyBankMeter v-if="checking_account === 3" :model-value="form[0]"
      />
      <q-btn
        no-caps
        @click="save"
        label="Cохранить"
        class="btn btn__save btn__continue btn__margin"
      />
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {cloneDeep, forEach} from "lodash";
import {formBank} from "src/setup/Dashboard/Bank";
import CompanyBankOwn from "components/Company/CompanyBankOwn";
import CompanyBankMeter from "components/Company/CompanyBankMeter";
import CompanyBankRic from "components/Company/CompanyBankRic";
import {api} from "src/lib/axios";

export default defineComponent({
  name: "BankDashboard",
  components: {CompanyBankOwn, CompanyBankMeter, CompanyBankRic},

  setup() {
    const isLoading = ref(true)
    const $q = useQuasar();
    const store = useStore();
    const id = store.getters["user/getUser"].company.id;
    const form = reactive(cloneDeep(formBank));
    const checking_account = ref(form[0].bank_type);
    const bankData = ref([])
    let addBank = () => {
      let add = {
        id: null,
        bank_type: 1,
        ric_name: null,
        ric_inn: null,
        bank_name: null,
        bank_bik: null,
        bank_account: null,
        bank_correspondent_account: null,
        house_id: null,
        capital_repair: ref(false),
      }
      bankData.value.push(add);
    };

    async function loadData() {
      try {
        await store.dispatch("company/getCompanyBank", id);
        let data = store.getters["company/getCompanyBank"];
        if (data.length > 0) {
          checking_account.value = data[0].bank_type;
          form.length = 0
          data.forEach(item => {
            form.push(item)
          })
        }
        bankData.value = cloneDeep(form)
        $q.loading.hide();
        isLoading.value = false
      } catch (e) {
        let message = null;
        message = e.message;
        if (e.response !== undefined) {
          forEach(e.response.data.errors, function (item) {
            message = item;
          });
        }
        $q.notify({
          color: "negative",
          message: message,
          icon: "warning",
          position: "top-right",
        });
      }
    }

    onMounted(() => {
      loadData();
    });

    const rules = computed(() => {
      return {};
    });

    let v$ = useVuelidate(rules, form);
    const save = async () => {
      form[0].bank_type = checking_account.value;
      form.length = 0
      bankData.value.forEach(bank => {
        form.push(bank)
      })
      const sentForm = [...form];
      try {
        await store.dispatch("company/CompanyBankUpdate", {
          form: sentForm,
          id: id,
        });
        $q.notify({
          color: "positive",
          message: "Данные успешно сохранены",
          icon: "check_circle",
          position: "top",
        });
      } catch (e) {
        let message = null;
        message = e.message;
        if (e.response !== undefined) {
          forEach(e.response.data.errors, function (item) {
            message = item;
          });
        }
        $q.notify({
          color: "negative",
          message: message,
          icon: "warning",
          position: "top",
        });
      }
    };
    const setNullForm = computed(() => {
      return {};
    });
    return {
      save,
      form,
      id,
      checking_account,
      addBank,
      bankData,
      isLoading
    };
  },
});
</script>
