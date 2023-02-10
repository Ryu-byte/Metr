<template>
    <div>
      <teleport to="body">
        <BaseForm v-show="isShow" @close="close" size="lg">
          <template v-slot:header>
            <h5 class="filter__modal__header">Предпросмотр добавление перерасчёта</h5>
          </template>
          <template v-slot:body>
            <div class="filter__modal__content">
              <div class="row filter account__recalculations-table q-mt-lg">
                <div class="col-md-12">
                  <q-table
                      wrap-cells
                    class="table"
                    :rows="Table.list"
                    :columns="Table.columns"
                    no-data-label="Нет данных"
                    row-key="id"
                    separator="cell"
                    hide-pagination

                    color="primary"
                    table-header-class="table__header recalculation"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <q-btn class="btn btn__save" no-caps label="Сохранить и закрыть"
                         style="width: 100%; margin-top: 40px;"
                         @click="sendFilter"/>
                </div>
              </div>
            </div>
          </template>
        </BaseForm>
      </teleport>
    </div>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import BaseForm from "components/ui/BaseForm";
import UI from "src/lib/Table";
import {formatDate, formatUnixDateTime, getEnumOptions} from "src/lib/helpers";

export default defineComponent({
  name: "PaymentAddRecalculation",
  emits: ["FilterForm"],
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    filterActive: {
      type: Boolean,
      default: false,
    },
    object_options: {
      type: Array
    }
  },
  components: {
    BaseForm,
  },

  setup(props, {emit}) {
    let modal = ref('')
    const form = reactive({
      id: null,
      period: null,
      house: null,
      type_flat: null,
      type_of_flat: null,
      flat: null,
      account: null,
      status: null,
      service: null,
      formula: null,
      sum_recalculation: null,
      comment: null,
    });
    const service_options = getEnumOptions("getService")
    const formula_options = [
      {
        value: 1,
        label: "Фиксированная сумма на лс"
      },
      {
        value: 2,
        label: "Сумма разделить по м2 выбранных помещений"
      },
      {
        value: 3,
        label: "Сумма умножить по м2 выбранных помещений"
      },
      {
        value: 4,
        label: "Сумма разделить на количество выбранных помещений"
      },
      {
        value: 5,
        label: "Отменить начисления (перерасчет по возврату средств за указанный период и выбранной услуге)"
      },
      {
        value: 6,
        label: "Сторно пени за период"
      },
    ]
    const Table = reactive(
      new UI.TableContainer("id", false, 10, [
        new UI.TableColumn("company_name", "Период", true, "left"),
        new UI.TableColumn("type_service", "Дата добавления перерасчёта", true, "left"),
        new UI.TableColumn("service", "Объект", true, "left"),
        new UI.TableColumn("name", `Тип помещ.`, true, "left"),
        new UI.TableColumn("units", "Наимен помещ.", true, "left"),
        new UI.TableColumn("formulaName", "Номер помещ.", true, "left"),
        new UI.TableColumn("account", "Лицевой счет", true, "left"),
        new UI.TableColumn("status", "Статус ЛС", true, "left"),
        new UI.TableColumn("formulaName", "Услуга", true, "left"),
        new UI.TableColumn("formulaName", "Пени начислено", true, "left"),
        new UI.TableColumn("formulaName", "Сумма перерасчёта", true, "left"),
        new UI.TableColumn("formulaName", "Комментарий", true, "left"),
      ])
    );;

    const setupDate = () => {
      const today = formatDate(Date.now())
      const date = new Date
      let month = date.toLocaleString('default', {month: 'long'})
      month = month[0].toUpperCase() + month.substring(1)
      const year = date.getFullYear()

      form.period = month + ' ' + year
      form.date_add = today
    }
    const sendFilter = () => {
      setupDate()
      let sentForm = {...form}
      emit("FilterForm", sentForm);
      emit("close");
      modal.value = ''
    }

    const close = () => {
      emit("close");
      modal.value = ''
      Table.list = []
    }
    return {
      close,
      form,
      Table,
      sendFilter,
      modal,
      service_options,
      formula_options
    };
  },
});
</script>
