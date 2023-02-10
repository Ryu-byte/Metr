<template>
  <div class="component_container object">
    <div class="forms">
      <div class="tittle q-mb-lg">Добавить документ</div>
      <div class="row">
        <div class="col-md-8">
          <div class="row">
            <div class="col-md-6 q-pr-md">
              <TextInput
                name="name_document"
                v-model="form.name_document"
                placeholder="Укажите название документа"
                type="text"
                label="Название документа"
                :success-message="v$.name_document"
              />
            </div>
            <div class="col-md-6 q-pl-md q-pr-md">
              <SelectMultiple
                title="Тип документа"
                name="type_document"
                :model-option="type_document_options"
                v-model="form.type_document"
                class=""
                label="Выберите тип документа"
                :success-message="v$.type_document"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 q-pr-md">
              <TextInput
                label="Номер:* "
                name="number_document"
                v-model="form.number_document"
                placeholder="Номер документа"
                type="text"
                :success-message="v$.number_document"
              />
            </div>
            <div class="col-md-6 q-pl-md q-pr-md">
              <TextInput
                label="Наименование выдавшего органа:"
                name="government"
                type="text"
                v-model="form.government"
                placeholder="Укажите наименование выдавшего органа"
                :success-message="v$.government"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 q-pr-md">
              <DateInput
                title="дд.мм.гггг"
                :is-range="false"
                name="date"
                label="Дата заключения договора:"
                style-date="input_date"
                dense="dense"
                v-model="form.date_conclusion"
                v-maska="'##.##.####'"
                :success-message="v$.date_conclusion"
              />
            </div>
            <div class="col-md-6 q-pl-md q-pr-md">
              <DateInput
                title="дд.мм.гггг"
                :is-range="false"
                name="date"
                label="Дата расторжения договора:"
                style-date="input_date"
                dense="dense"
                v-model="form.date_termination"
                v-maska="'##.##.####'"
                :success-message="v$.date_termination"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4 q-pl-md">
          <div class="row">
            <div class="col-12">
              <SelectMultiple
                title="Статус документа:"
                name="status_document"
                :model-option="status_document_options"
                v-model="form.status_document"
                label="Выберите статус документа"
                :success-message="v$.status_document"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <TextInput
                label="Документ:"
                name="document"
                type="file"
                @change="uploadFile"
                v-model="form.files"
                style-date="inputFile"
                placeholder="Документ"
                load-icon="img:svg/add_2.svg"
                load-string="Загрузить документ"
              />
              <q-list
                class="q-my-xs"
                v-for="(file, index) in fileInfos"
                :key="index"
              >
                <q-item class="justify-between items-center" v-ripple>
                  <p>{{ file.file_name }}<br>{{ file.size }}</p>
                  <q-item-section clickable avatar>
                    <q-btn
                      icon="img:svg/document-download_blue.svg"
                      :href="file.path"
                      :target="file.file_name"
                    />
                    <q-btn
                      icon="img:svg/trash_blue.svg"
                      @click="deleteFile(index)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-3">
          <q-btn
            @click="send"
            no-caps
            size="14px"
            label="Сохранить"
            class="btn btn__save btn__continue btn__margin"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive} from "vue";
import {useStore} from "vuex";
import {useQuasar} from "quasar";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import TextInput from "components/ui/input/TextInput";
import DateInput from "components/ui/DateInput/DateInput";
import {getEnumOptions, toUnixFormat} from "src/lib/helpers";
import {cloneDeep, forEach} from "lodash";
import useVuelidate from "@vuelidate/core";
import {useRoute, useRouter} from "vue-router";
import {
  DocumentHouseFileInfos,
  DocumentHouseForm,
  DocumentHouseRules,
} from "src/setup/Object/Documnet";
import {maska} from "maska";
import TypeDocumentCompany from "src/Enum/TypeDocumentCompany";

export default defineComponent({
  name: "CreateDocumentsCompany",
  components: {SelectMultiple, TextInput, DateInput},
  directives: {
    maska
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    let formData = new FormData();
    const route = useRoute();
    const router = useRouter();
    const form = reactive(cloneDeep(DocumentHouseForm));
    let fileInfos = reactive(cloneDeep(DocumentHouseFileInfos));
    const v$ = useVuelidate(DocumentHouseRules, form);
    const type_document_options = TypeDocumentCompany;
    const status_document_options = getEnumOptions("getDocumentStatus");

    function deleteFile(index) {
      fileInfos.splice(index, 1);
    }

    async function send() {
      v$.value.$validate();
      console.log(123)
      try {
        if (v$.value.$invalid) {
          throw new Error("Не все поля заполнены");
        }
        formData.append("client_id", route.params.id);
        if (form.date_conclusion != "") {
          form.date_conclusion = toUnixFormat(form.date_conclusion);
        }
        if (form.date_termination != "") {
          form.date_termination = toUnixFormat(form.date_termination);
        }
        delete form.files;
        for (let key in form) {
          formData.append(key, form[key]);
        }
        $q.loading.show({
          delay: 0,
          message: "Сохранение данных",
        });
        await store.dispatch("document/createDocumentClient", formData);
        let res = store.getters["document/getDocumentClient"];
        if (res) {
          $q.notify({
            color: "positive",
            message: res.message,
            icon: "done",
            position: "top-right",
          });
          $q.loading.hide();
          await router.push(`/company/client/single=${route.params.id}/documents`)
        }
        formData = new FormData();
      } catch (e) {
        $q.loading.hide();
        formData = new FormData();
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

    const uploadFile = (e) => {
      if (fileInfos.length < 3) {
        if (e.target.files.length > 0) {
          for (const i of Object.keys(e.target.files)) {
            let _size = e.target.files[i].size;
            let fSExt = new Array('Байт', 'Кб', 'Мб', 'Гб'),
              j = 0;
            while (_size > 900) {
              _size /= 1024;
              j++;
            }
            let exactSize = (Math.round(_size * 100) / 100) + ' ' + fSExt[j];
            formData.append(`files[${i}]`, e.target.files[i]);
            fileInfos.push({
              file_name: e.target.files[i].name,
              path: URL.createObjectURL(e.target.files[i]),
              size: exactSize
            });
          }
        }
      } else {
        fileInfos = [];
      }
    };
    return {
      send,
      form,
      type_document_options,
      status_document_options,
      fileInfos,
      uploadFile,
      v$,
      deleteFile,
    };
  },
});
</script>
