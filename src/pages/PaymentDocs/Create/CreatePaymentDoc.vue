<template>
  <PaymentDocModal
    @close="toggleModal"
    :is-show="modalActive"
  />
  <div class="component_container">
    <div class="forms">
      <main>
        <div class="row q-mb-lg">
          <div class="tittle col-md-6 flex items-center">Данные платежного документа</div>
          <div class="col-md-6 actions flex justify-end">
            <q-btn-group>
              <q-btn
                icon="img:svg/document-download.svg"
                data-tooltip="Скачать"
              />
              <q-btn
                icon="img:svg/document-printer.svg"
                data-tooltip="Печать"
              />
              <q-btn
                icon="img:svg/document-close.svg"
                data-tooltip="Закрыть"
              />
              <q-btn
                icon="img:svg/document-edit.svg"
                data-tooltip="Редактировать"
              />
            </q-btn-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="row q-mb-lg">
              <div class="col-md-6 q-pr-md">
                <SelectMultiple
                  label="Выберите исполнителя"
                  name="company"
                  title="Исполнитель: "
                  @getRequestPage="getRequestPageCompany"
                  height="300px"
                  :loading="loadingCompany"
                  v-model="form.company_id"
                  :model-option="company_options"
                />
              </div>
              <div class="col-md-6 q-pl-md">
                <SelectMultiple
                  label="Выберите получателя"
                  name="client"
                  title="Получатель: "
                  :loading="loadingClient"
                  @getRequestPage="getRequestPageClient"
                  height="300px"
                  v-model="form.client_id"
                  :model-option="companyClient_options"
                />
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="col-md-12">
                <SelectMultiple
                  label="Выберите объект"
                  name="house"
                  title="Объект: "
                  v-model="form.house_id"
                  :loading="loadingObject"
                  @getRequestPage="getRequestPageObjects"
                  height="300px"
                  :model-option="object_options"
                />
              </div>
            </div>
            <div>Тип документа</div>
            <div class="row q-mb-lg">
              <div class="col-md-6">
                <div class="q-gutter-md">
                  <q-radio
                    :val=1
                    v-model="form.type_payment_documents"
                    label="Квитанция"
                  />
                  <q-radio
                    :val=2
                    v-model="form.type_payment_documents"
                    label="Счет и акт"
                  />
                </div>
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="col-md-12">
                <TextEditor
                  name="info"
                  placeholder="Контактный телефон &#10;Режим работы &#10;E-mail &#10;Сайт"
                  v-model="form.info"
                  editorClass="editor bg-grey-1"
                  height="70px"
                  label="Справочная информация:"
                />
              </div>
            </div>
            <div class="row q-mb-lg">
              <div class="col-md-12">
                <TextEditor
                  name="notification"
                  placeholder="Информационные сообщения &#10;Подпись УО"
                  v-model="form.notifications"
                  editorClass="editor bg-grey-1"
                  height="46px"
                  label="Уведомления: "
                />
              </div>
            </div>
            <div class="label">Штрихкод для ссылок:</div>
            <div class="row q-mb-md">
              <div class="col-md-6 q-pr-md">
                <TextInput
                  style="margin: 0"
                  name="qr-1"
                  model-value="Сайт"
                  placeholder="Название для штрихкода"
                />
              </div>
              <div class="col-md-6 q-pl-md">
                <TextInput
                  style="margin: 0"
                  name="app_phone"
                  v-model="form.site"
                  placeholder="Ссылка"
                />
              </div>
            </div>
            <div class="row q-mb-md">
              <div class="col-md-6 q-pr-md">
                <TextInput
                  style="margin: 0"
                  name="qr-2"
                  model-value="Приложение"
                  placeholder="Название для штрихкода"
                />
              </div>
              <div class="col-md-6 q-pl-md">
                <TextInput
                  style="margin: 0"
                  name="app_phone"
                  v-model="form.app_phone"
                  placeholder="Ссылка"
                />
              </div>
            </div>
            <div class="row q-mb-md">
              <div class="col-md-6 q-pr-md">
                <TextInput
                  style="margin: 0"
                  name="qr-3"
                  model-value="Голосование"
                  placeholder="Название для штрихкода"
                />
              </div>
              <div class="col-md-6 q-pl-md">
                <TextInput
                  style="margin: 0"
                  name="vote"
                  v-model="form.vote"
                  placeholder="Ссылка"
                />
              </div>
            </div>
            <div class="row q-mb-md">
              <div class="col-md-6 q-pr-md">
                <TextInput
                  style="margin: 0"
                  name="chat"
                  model-value="Чат"
                  placeholder="Название для штрихкода"
                />
              </div>
              <div class="col-md-6 q-pl-md">
                <TextInput
                  style="margin: 0"
                  name="chat"
                  v-model="form.chat"
                  placeholder="Ссылка"
                />
              </div>
            </div>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-5">
            <div class="row q-mb-lg">
              <div class="col-md-7 q-pr-lg">
                <SelectMultiple
                  label="По плательщику(доступно в квитанции)"
                  name="group_data"
                  title="Группировка данных: "
                  v-model="form.group_data"
                  :model-option="[]"
                />
              </div>
              <div class="col-md-5 q-pl-lg flex items-center" style="padding-top: 20px;">
                <q-btn
                  style="width: 100%; padding: 8px 0"
                  class="btn btn__load"
                  label="Предпросмотр документа"
                  no-caps
                />
              </div>
            </div>
            <div class="row document_preview q-pt-lg">
              <div class="flex justify-center items-center">
                <img
                  class="document"
                  :src="require('src/assets/img/payment_document_mockup.jpg')"
                  alt="Пример платежного документа">
                <q-icon
                  name="img:svg/search-zoom-in.svg"
                  class="zoom"
                  @click="toggleModal"
                />
              </div>
              <div>
                <img
                  class="document"
                  :src="require('assets/img/payment_document_mockup_2.jpg')"
                  alt="Пример платежного документа">
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <q-btn
              no-caps
              @click="send"
              size="14px"
              label="Сохранить"
              class="btn btn__save btn__continue btn__margin"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive, ref} from "vue";
import {useStore} from "vuex";
import {useQuasar} from "quasar";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import TextInput from "components/ui/input/TextInput";
import {formData, rulesData} from "src/setup/PaymentDocument/PaymentDocument"
import {cloneDeep, forEach} from "lodash";
import useVuelidate from "@vuelidate/core";
import {useRoute, useRouter} from "vue-router";
import {maska} from "maska";
import TextEditor from "components/ui/input/TextEditor";
import PaymentDocModal from "components/PaymentDoc/PaymentDocModal";
import {selectCompany, selectObject} from "src/lib/helpers";


export default defineComponent({
    name: "CreatePaymentDoc",
    components: {PaymentDocModal, TextEditor, SelectMultiple, TextInput},
    directives: {
      maska
    },
    setup() {
      const store = useStore();
      const $q = useQuasar();
      const route = useRoute();
      const router = useRouter();
      const form = reactive(cloneDeep(formData));
      const v$ = useVuelidate(rulesData, form);
      const company_options = ref([]);
      const companyClient_options = ref([]);
      const object_options = ref([]);
      const services_position = ref([])
      const modalActive = ref(false);
      const loadingObject = ref(false);
      const loadingCompany = ref(false);
      const loadingClient = ref(false);

      const getRequestPageCompany = async (page) => {
        loadingCompany.value = true;
        let arr = await selectCompany(store, 'company', page)
        arr.forEach(company => {
          company_options.value.push(company)
        })
        if (arr) {
          loadingCompany.value = false;
        }
      }
      const getRequestPageClient = async (page) => {
        loadingClient.value = true;
        let arr = await selectCompany(store, 'client', page)
        arr.forEach(company => {
          companyClient_options.value.push(company)
        })
        if (arr) {
          loadingClient.value = false;
        }
      }
      const getRequestPageObjects = async (page) => {
        loadingObject.value = true;
        let arr = await selectObject(store, {
          data: {
            address: "",
            house_id: null,
            type_flat: null,
            apartment: null,
          },
          page: page
        }, "houses")
        arr.forEach(object => {
          object_options.value.push(object)
        })
        if (arr) {
          loadingObject.value = false;
        }
      }

      const listServices = async (house_id) => {
        if (house_id) {
          await store.dispatch("paymentDocument/ListServices", {house_id: house_id}).then(() => {
            services_position.value = store.getters["paymentDocument/getListServices"]
          })
        }
      }
      const toggleModal = () => {
        modalActive.value = !modalActive.value;
        document.body.style.overflow = modalActive.value ? "hidden" : "auto";
      };
      const modalForm = (data) => {
        console.log(data)
      };

      async function send() {
        v$.value.$validate();
        form.user_company_id = store.getters["user/getUser"].company.id
        form.services_position = services_position.value
        const sentForm = {...form};
        try {
          if (v$.value.$invalid) {
            throw new Error("Не все поля заполнены");
          }
          $q.loading.show({
            delay: 0,
            message: "Сохранение данных",
          });
          await store.dispatch("paymentDocument/CreatePaymentDocument", sentForm)
          let res = store.getters["paymentDocument/getPaymentDocument"]
          if (res) {
            $q.notify({
              color: "positive",
              message: res.message,
              icon: "done",
              position: "top-right",
            });
            $q.loading.hide();
          }
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
          $q.loading.hide();
        }
      }

      return {
        send,
        object_options,
        company_options,
        companyClient_options,
        form,
        v$,
        modalActive,
        toggleModal,
        services_position,
        listServices,
        modalForm,
        getRequestPageObjects,
        getRequestPageCompany,
        getRequestPageClient,
        loadingObject,
        loadingClient,
        loadingCompany
      };
    }
    ,
  }
)
;
</script>
