<template>
  <main>
    <div class="component_container account" v-if="!isLoading">
      <div class="account__info">
        <div class="row q-mb-lg">
          <div class="col-md-6 flex items-baseline">
            <div v-if="account_data.type_resident==='Физ.лицо'" class="account__info-title">
              {{ account_data.resident }} | Лицевой счёт {{ account_data.number_of_account }}
            </div>
            <div v-else class="account__info-title">
              {{ account_data.company_name }} | Лицевой счёт {{ account_data.number_of_account }}
            </div>
            <div v-if="account_data.status_account" class="account__info-status-open">
              Открыт
            </div>
            <div v-else class="account__info-status-close">
              Закрыт
            </div>
          </div>
          <div class="col-md-6 flex justify-end">
            <div class="account__info-date">
              <DateInput
                label=""
                title=""
                v-model="account_data.created_at"
                dense="dense"
                :disable="true"
                name="created_at"
                style-date="input_date"
                v-maska="'##.##.####'"
                :is-range="false"
                :read-only="true"/>
            </div>
            <div class="actions">
              <q-btn-group>
                <q-btn
                    icon="img:svg/document-download.svg"
                    data-tooltip="Скачать"
                />
                <q-btn
                    icon="img:svg/document-report.svg"
                    data-tooltip="Отчет"
                />
                <q-btn
                    icon="img:svg/document-printer.svg"
                    data-tooltip="Печать"
                />
                <q-btn
                    icon="img:svg/document-edit.svg"
                    data-tooltip="Редактировать"
                />
                <q-btn
                    icon="img:svg/document-close.svg"
                    data-tooltip="Закрыть"
                />
              </q-btn-group>
            </div>
          </div>
        </div>
        <div class="row account__info-data">
          <div class="col-md-3 column">
            <div class="text">
              <span>Лицевой счет:</span> {{ account_data.number_of_account }}
            </div>
            <div v-if="account_data.type_resident==='Физ.лицо'" class="text">
              <span>Плательщик:</span> {{ account_data.resident }}
            </div>
            <div v-else class="text">
              <span>Название организации:</span> {{ account_data.company_name }}
            </div>
            <div class="text">
              <span>Объект:</span> {{ account_data.address }}
            </div>
          </div>
          <div class="col-md-3 column">
            <div class="text">
              <span>Тип помещения:</span> {{ account_data.type_flat }}
            </div>
            <div class="text">
              <span>Наименование помещения:</span> {{ account_data.type_of_flat }}
            </div>
            <div class="text">
              <span>Номер помещения:</span> {{ account_data.apartment }}
            </div>
          </div>
          <div class="col-md-3 column">
            <div class="text">
              <span>Общая площадь:</span> {{ account_data.total_square }} м²
            </div>
            <div class="text">
              <span>Число комнат:</span> {{ account_data.rooms }}
            </div>
            <div class="text">
              <span>Подъезд:</span> {{ account_data.entrance }}
            </div>
          </div>
          <div class="col-md-3 column">
            <div class="text">
              <span>Этаж:</span> {{ account_data.floor }}
            </div>
            <div class="text">
              <span>Число зарегистрированных:</span> {{ account_data.residents }}
            </div>
            <div class="text">
              <span>Кадастровый номер:</span> {{ account_data.cadastral_number }}
            </div>
          </div>
        </div>
      </div>
      <div class="account__turnover-balance-sheet">
        <div class="row justify-between" >
          <div class="row items-center ">
            <span class="name">Оборотно-сальдовая ведомость за:</span>
            <DateInput
              class="name-date"
              title=""
              label=""
              style="width: 183px"
              style-date="input_date" name=""/>
          </div>
          <div class="row  items-center">
            <span>Баланс:</span>
            <input class="balance" :value="account_data.balance_account" readonly type="text"/>
          </div>
          <div class="row account__turnover_balance_sheet-table">
            <div class="col-md-7 q-pt-lg">
              <q-table
                  wrap-cells
                  class="table"
                  :rows="Table.list"
                  :columns="Table.columns"
                  no-data-label="Нет данных"
                  row-key="id"
                  separator="cell"
                  v-model:pagination="Table.pagination"
                  hide-pagination
                  color="primary"
                  table-header-class="table__header"
                  @row-dblclick="editItem"
              />
              <!--              @request="loadData"-->
            </div>
          </div>
        </div>
      </div>
      <div class="account__tabs tabs">
        <q-tabs
            indicator-color="#5584FF"
            align="left"
            active-class="q-tab__active"
            narrow-indicator
            dense
            inline-label
            v-model="tab_value"
        >
          <q-tab no-caps name="AccountPayment" label="Начисления и платежи"/>
          <q-tab no-caps name="AccountTurnoverBalanceSheet" label="Оборотное сальдо"/>
          <q-tab no-caps name="AccountIpu" label="ИПУ"/>
          <q-tab no-caps name="AccountFine" label="Пени"/>
          <q-tab no-caps name="AccountRecalculations" label="Перерасчёты"/>
          <q-tab no-caps name="AccountPayersAndBenefits" label="Плательщики и льготы"/>
          <q-tab no-caps name="AccountServices" label="Услуги"/>
        </q-tabs>
      </div>
      <AccountPayment v-if="tab_value === 'AccountPayment'"/>
      <AccountTurnoverBalanceSheet v-if="tab_value === 'AccountTurnoverBalanceSheet'"/>
      <AccountIpu v-if="tab_value === 'AccountIpu'"/>
      <AccountFine v-if="tab_value === 'AccountFine'"/>
      <AccountRecalculations v-if="tab_value === 'AccountRecalculations'"/>
      <AccountPayersAndBenefits v-if="tab_value === 'AccountPayersAndBenefits'"/>
      <AccountServices v-if="tab_value === 'AccountServices'"/>
    </div>
  </main>
</template>

<script>
import DateInput from "components/ui/DateInput/DateInput";
import {reactive, ref, defineComponent, onMounted} from "vue";
import UI from "src/lib/Table";
import AccountPayment from "pages/Accounts/Tabs/AccountPayment";
import AccountTurnoverBalanceSheet from "pages/Accounts/Tabs/AccountTurnoverBalanceSheet";
import AccountIpu from "pages/Accounts/Tabs/AccountIpu";
import AccountFine from "pages/Accounts/Tabs/AccountFine";
import AccountRecalculations from "pages/Accounts/Tabs/AccountRecalculations";
import AccountPayersAndBenefits from "pages/Accounts/Tabs/AccountPayersAndBenefits";
import AccountServices from "pages/Accounts/Tabs/AccountServices";
import {useQuasar} from "quasar";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {useStore} from "vuex";
import {cloneDeep} from "lodash";
import {accountData} from "src/setup/Account/ViewData"
import {maska} from "maska";
import moment from "moment";

export default defineComponent({
  name: "ViewAccount",
  directives: {
    maska,
  },
  components: {
    AccountServices,
    AccountPayersAndBenefits,
    AccountRecalculations, AccountFine, AccountIpu, AccountTurnoverBalanceSheet, AccountPayment, DateInput
  },
  setup() {
    const $q = useQuasar();
    const isLoading = ref(true)
    let router = useRouter();
    let route = useRoute();
    let id = route.params.id
    let store = useStore();
    let account_data = reactive(cloneDeep(accountData));
    let tab_value = ref("AccountPayment")

    const Table = reactive(
        new UI.TableContainer("id", false, 5, [
          new UI.TableColumn("company_name", "Дебет вход.", true, "left"),
          new UI.TableColumn("type_service", "Кредит вход.", true, "left"),
          new UI.TableColumn("service", "Начислено", true, "left"),
          new UI.TableColumn("name", "Оплата", true, "left"),
          new UI.TableColumn("units", "В т.ч. пени", true, "left"),
          new UI.TableColumn("formulaName", "Дебет исх.", true, "left"),
          new UI.TableColumn("formulaName", "Кредит исх.", true, "left"),
          new UI.TableColumn("formulaName", "Пени", true, "left"),
        ])
    );
    const editItem = (evt, row) => {
    }

    onMounted(() => {
      loadData();
    });

    async function loadData() {
      try {
        $q.loading.show({
          delay: 400,
        });
        await store.dispatch("account/SingleAccount", id);
        let data = store.getters["account/getSingleAccount"];
        if (data) {
          account_data.id = data.id;
          account_data.address = data.address;
          account_data.apartment = data.apartment;
          account_data.company_name = data.company_name;
          account_data.balance_account = data.balance_account;
          account_data.cadastral_number = data.cadastral_number;
          account_data.company_id = data.company_id;
          account_data.created_at = data.created_at;
          account_data.deleted_at = data.deleted_at;
          account_data.entrance = data.entrance;
          account_data.flat_id = data.flat_id;
          account_data.floor = data.floor;
          account_data.house_id = data.house_id;
          account_data.number_of_account = data.number_of_account;
          account_data.resident = data.resident;
          account_data.resident_id = data.resident_id;
          account_data.residents = data.residents;
          account_data.rooms = data.rooms;
          account_data.status_account = data.status_account;
          account_data.total_square = data.total_square;
          account_data.type_flat = data.type_flat;
          account_data.type_of_flat = data.type_of_flat;
          account_data.type_resident = data.type_resident;
          account_data.updated_at = data.updated_at;
        }
        isLoading.value = false
        $q.loading.hide();
      } catch (err) {
        $q.notify({
          color: "negative",
          message: err.response.data.errors.message,
          icon: "warning",
          position: "top-right",
        });
      }
    }

    return {
      Table,
      editItem,
      tab_value,
      isLoading,
      account_data,
      period: ref(moment().unix())
    }
  }
});


</script>

<style scoped></style>
