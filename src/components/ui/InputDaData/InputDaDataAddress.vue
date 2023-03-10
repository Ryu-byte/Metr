<template>
  <div class="forms_group" ref="dadataDom">
    <label
        class="label"
        :for="name"
      >{{ label }}</label
    >
    <input
      type="text"
      :name="name"
      @focus="onFocus"
      class="forms__input_text bg-grey-1 dadata__input"
      :class="[{ 'forms__input_text--error': successMessage.$error }]"
      :placeholder="placeholder"
      v-model="localValue"
    />
    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
    <da-data-list
      v-if="showList"
      :class="{ [`${cssClasses.listEmpty}`]: suggestions.length === 0 }"
      :css-class="cssClasses.list"
    >
      <da-data-list-row
        :css-class="cssClasses.row"
        v-for="(item, index) of suggestions"
        @click="onSelected(item)"
        :key="index"
      >
        <slot name="list-item" :prop="item" :prepare-value="prepareResults">
          <span v-html="prepareResults(item, 'value')"> </span>
        </slot>
      </da-data-list-row>
    </da-data-list>
  </div>
</template>

<script setup>
import { computed, ref, watch, toRaw, onMounted } from "vue";
import DaDataList from "./DaDataList.vue";
import DaDataListRow from "./DaDataListRow.vue";
import axios from "axios";
// eslint-disable-next-line no-undef
const emit = defineEmits(["update:modelValue", "onSelected", "update:data"]);
// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: [String, Number, null, Array, Object],
  data: {
    type: Object,
    default: Object,
  },
  token: {
    type: String,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "address",
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  params: {
    type: Object,
    default: () => {},
  },
  setInputValue: {
    type: Function,
  },
  successMessage: {
    type: Object,
    default: () => ({ $dirty: true, $error: false }),
  },
  apiUrl: {
    type: String,
    default: null,
  },
  inputName: {
    type: String,
    default: "address",
  },
  placeholder: {
    type: String,
    default: null,
  },
  customParams: {
    type: Object,
    default: () => null,
  },
  cssClasses: {
    type: Object,
    default: () => ({
      root: "dadata",
      list: "dadata__list",
      listEmpty: "dadata__list_empty",
      row: "dadata__list__row",
    }),
  },
});
//let globalOptions = inject("da-data-next-options");
const token = computed(() => {
  if (props.token) return props.token;
  // if (globalOptions && globalOptions.token) return globalOptions.token;
  return null;
});
const localValue = ref(props.modelValue);
const suggestions = ref([]);
const showList = ref(false);
const dadataDom = ref(null);
watch(
  () => props.modelValue,
  () => {
    localValue.value = props.modelValue;
  }
);
const url = computed(() => {
  if (props.apiUrl) {
    return props.apiUrl;
  }
  return `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/${props.type}`;
});
const params = computed(() => {
  if (props.customParams) return props.customParams;
  if (token.value) {
    return {
      method: "POST",
      url: url.value,
      headers: {
        Authorization: `Token ${token.value}`,
        "content-type": "application/json",
        accept: "application/json",
      },
      data: {...props.params, query: localValue.value ,count: 5},
    };
  }
  return '';
});
onMounted(() => {
  document.addEventListener("click", (event) => {
    if (dadataDom.value && !dadataDom.value.contains(event.target)) {
      showList.value = false;
    }
  });
});
const search = () => {
  if (!params.value) return;
  axios(params.value).then((response) => {
    if (response && response.data) {
      if (typeof response.data.suggestions !== "undefined") {
        suggestions.value = response.data.suggestions;
      } else {
        console.error("vue-dadata-3:???????????????? suggestions ???? ??????????????");
      }
    }
  });
};
const onSelected = (data) => {
  localValue.value = data.value;
  if (props.setInputValue && typeof props.setInputValue === "function") {
    localValue.value = props.setInputValue(toRaw(data));
  }
  emit("onSelected", data);
  emit("update:data", data);
  showList.value = false;
};
const onFocus = () => {
  showList.value = true;
  if (localValue.value) {
    search();
  }
};
const prepareResults = (data, key) => {
  let copyValue = data.value;
  if (!key) {
    console.error("vue-dadata-3: ?????????????? ???????? ?? ??????????????");
    return;
  }
  if (typeof key === "object") {
    const keyParent = Object.keys(key)[0];
    if (!data[keyParent]) {
      console.error(`vue-dadata-3: ${keyParent} ???? ???????????? ?? ?????????????? dadata`);
      return;
    }
    const keyChild = key[keyParent];
    if (!data[keyParent][keyChild]) {
      console.error(`vue-dadata-3: ${keyChild} ???? ???????????? ?? ?????????????? dadata`);
      return;
    }
    copyValue = data[keyParent][keyChild];
  } else if (typeof key === "string") {
    if (!data[key]) {
      console.error(`vue-dadata-3: ${key} ???? ???????????? ?? ?????????????? dadata`);
      return;
    }
    copyValue = data[key];
  }
  const splitValue = localValue.value && localValue.value.split(" ");

  if (splitValue.length > 0) {
    splitValue.forEach((word) => {
      copyValue = copyValue.replace(word, `<span >${word}</span>`);
    });
  }
  // eslint-disable-next-line consistent-return
  return copyValue;
};

watch(
  () => localValue.value,
  (val) => {
    emit("update:modelValue", val);
    if (val) {
      search();
    } else {
      suggestions.value = [];
    }
  }
);
</script>
<style scoped lang="scss">

.forms__input_text--error {
  border: 2px solid #ff0000;
}
</style>
