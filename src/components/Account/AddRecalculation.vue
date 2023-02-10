<template>
  <div>
    <div v-if="modal === ''">
      <teleport to="body">
        <BaseForm v-show="isShow" @close="close" size="xs">
          <template v-slot:header>
            <h5 class="filter__modal__header">Добавить перерасчёт</h5>
          </template>
          <template v-slot:body>
            <div class="filter__modal__content">
              <div class="row q-mt-lg">
                <div class="col-12">
                  <SelectMultiple
                    title="Услуга:"
                    name="service"
                    label="Выберите услугу"
                    v-model="form.service"
                    :model-option="service_options"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <SelectMultiple
                    title="Формула перерасчёта:"
                    name="formula"
                    label="Выберите формулу перерасчёта"
                    v-model="form.formula"
                    :model-option="formula_options"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <TextInput
                    name="sum"
                    v-model="form.sum"
                    placeholder="Сумма перерасчёта"
                    type="number"
                    label="Сумма перерасчёта:"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <TextInput
                    name="comment"
                    v-model="form.comment"
                    placeholder="Добавьте комментарий"
                    type="text"
                    label="Комментарий:"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <q-btn
                    class="btn btn__download"
                    @click="changeModal"
                    no-caps
                    label="Предпросмотр"
                    style="
                  margin: 20px 0 15px 0;
                  width: 100%"
                  />
                </div>
              </div>
              <div class="row filter">
                <div class="col-12">
                  <q-btn
                    class="btn btn__save"
                    no-caps
                    label="Применить"
                    style="
                  width: 100%"
                    @click="sendFilter"/>
                </div>
              </div>
            </div>
          </template>
        </BaseForm>
      </teleport>
    </div>
    <div v-if="modal ==='preview'">
      <teleport to="body">
        <BaseForm v-show="isShow" @close="close" size="lg">
          <template v-slot:header>
            <h5 class="filter__modal__header">Предпросмотр добавление перерасчёта</h5>
          </template>
          <template v-slot:body>
            <div class="filter__modal__content">
              <div class="row q-mt-lg account__recalculations-table">
                <div class="col-md-12">
                  <q-table
                      wrap-cells
                    class="table"
                    :rows="TableRecalculationPreview.list"
                    :columns="TableRecalculationPreview.columns"
                    no-data-label="Нет данных"
                    row-key="id"
                    separator="cell"
                    hide-pagination
                    color="primary"
                    table-header-class="table__header"
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
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import BaseForm from "components/ui/BaseForm";
import UI from "src/lib/Table";
import TextInput from "components/ui/input/TextInput";
import {formatDate, formatUnixDateTime, getEnumOptions} from "src/lib/helpers";

export default defineComponent({
  name: "AddRecalculation",
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
  },
  components: {
    TextInput,
    BaseForm,
    SelectMultiple,
  },

  setup(props, {emit}) {
    let modal = ref('')
    const form = reactive({
      id: null,
      period: null,
      formula: null,
      date_add: null,
      service: null,
      sum: null,
      comment: null
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
    const TableRecalculationPreview = reactive(
      new UI.TableContainer("id", false, 5, [
        new UI.TableColumn("period", "Период", true, "left"),
        new UI.TableColumn("date_add", "Дата добавления перерасчета", true, "left"),
        new UI.TableColumn("serviceLabel", "Услуга", true, "left"),
        new UI.TableColumn("sum", "Сумма перерасчёта", true, "left"),
        new UI.TableColumn("comment", "Комментрарий", true, "left"),
      ])
    );

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
      resetForm()
    }
    const changeModal = () => {
      modal.value = 'preview'
      setupDate()
      let sentForm = {...form}
      if (sentForm.service) {
        sentForm.serviceLabel = service_options.find(item => item.value === sentForm.service).label
      }
      TableRecalculationPreview.list = [sentForm]
    }
    const resetForm = () => {
      for (let key in form) {
        form[key] = null;
      }
    }
    const close = () => {
      emit("close");
      modal.value = ''
      TableRecalculationPreview.list = []
      resetForm()
    }
    return {
      close,
      form,
      TableRecalculationPreview,
      sendFilter,
      modal,
      changeModal,
      service_options,
      formula_options
    };
  },
});
</script>
