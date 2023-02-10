<template>
  <div class="forms_group" :class="width">
    <label
      v-if="label.length > 0"
      style="color: #3e424f; padding-bottom: 9px; font-size: 12px"
      :for="name"
    >{{ label }}</label
    >
    <q-input
      :name="name"
      class="bg-grey-1"
      :class="styleDate"
      :dense="dense"
      :readonly="readOnly"
      v-model="date"
      :placeholder="title"
      borderless
      :disable="disable"
    >
      <template v-slot:prepend>
        <q-icon name="img:svg/calendar.svg"/>
        <q-popup-proxy
          ref="qDateProxy"
          cover
          transition-show="scale"
          transition-hide="scale"
          @before-show="updateModal"
        >
          <q-date minimal
                  v-model="inputDate"
                  :mask="mask"
                  :emit-immediately="emitImmediately"
                  :default-view="default_view"
          >
            <div class="row items-center justify-around q-gutter-sm">
              <q-btn no-caps label="Отмена" type="light" v-close-popup/>
              <q-btn
                color="primary"
                no-caps
                label="Применить"
                type="light"
                v-close-popup
                @click="applyDates"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </template>
      <template v-slot:append>
        <q-btn v-if="date && !readOnly" @click.stop="resetDate" icon="clear" flat round dense/>
      </template>
    </q-input>
    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
  </div>
</template>

<script>
import {computed, defineComponent, reactive, ref, watch} from "vue";
import {formatUnixDateTime, formatUnixMonths, toPeriodMount} from "src/lib/helpers";

export default defineComponent({
  name: "DateInput",
  props: {
    type: {
      type: String,
      default: 'date'
    },
    emitImmediately: {
      type: Boolean,
      default: false
    },
    isRange: {
      type: Boolean,
      default: false
    },
    isUnix: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number, null, Array, Object, FormData],
      default: "",
    },
    title: {
      type: String,
      required: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disable: {
      type:Boolean,
      default: false
    },
    fullwidth: {
      type: Boolean,
      default: false
    },
    width23: {
      type: Boolean,
      default: false
    },
    nested: {
      type: Boolean,
      required: false,
      default: false
    },
    customWidth: String,
    styleDate: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      default: ""
    },
    successMessage: {
      type: Object,
      default: () => ({$dirty: true, $error: false}),
    },
  },
  setup(props, {emit}) {
    let date = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        return emit("update:modelValue", val);
      },
    });
    if (props.type === 'month') {
      date.value = formatUnixMonths(date.value);
    }else{
      date.value = formatUnixDateTime(date.value)

    }
    const width = computed(() => {
      if (props.customWidth) {
        return props.customWidth;
      }
      if (props.fullwidth) {
        return "col-12";
      }
      if (props.width23) {
        return "col-8";
      }
      return "col-md-5 col-sm-12";
    });
    const restWidth = computed(() => {
      if (props.fullwidth) {
        return "col-12";
      }
      if (props.width23) {
        return "col-4";
      }
      return "col-md-8";
    });
    const wrapperClass = computed(() => {
      if (props.nested) {
        return props.customWidth || "";
      }
      return "row top_content_panel";
    });
    let inputDate = ref({from: null, to: null});
    let Filters = reactive({from: null, to: null});
    const default_view = computed(() => {
      if (props.type === 'month') {
        return "Months"
      }
      if (props.type === 'year') {
        return "Years"
      }
      return "Calendar"
    })
    const mask = computed(() => {
      if (props.type === 'month') {
        return "MMMM YYYY"
      }
      if (props.type === 'year') {
        return "YYYY"
      }
      return 'DD.MM.YYYY'
    })
    const applyDates = () => {
      if (props.isRange) {
        if (
          inputDate.value &&
          (inputDate.value.from == null || inputDate.value.to == null)
        ) {
          Filters = {from: null, to: null};
          date.value = inputDate.value;

        } else {
          Filters = inputDate.value ?? {from: null, to: null};
          date.value = `${Filters.from} - ${Filters.to}`
        }
      } else {
        date.value = inputDate.value
      }
    };
    const updateModal = () => {
      inputDate.value = props.isRange ? Filters : date.value
    };
    const resetDate = () => {
      date.value = "";
      inputDate.value = {from: null, to: null};
    };
    watch(date, (val) => {
      emit("update:modelValue", val);
    });

    return {
      date,
      width,
      restWidth,
      wrapperClass,
      resetDate,
      inputDate,
      default_view,
      mask,
      applyDates,
      updateModal
    };
  },
});
</script>
