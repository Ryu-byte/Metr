<template>
  <div class="forms_group" :style="style">
    <label v-if="title" class="label" :for="name">{{ title }}</label>
    <q-select
      ref="select"
      class="forms__select bg-grey-1"
      :name="name"
      :id="name"
      outlined
      v-model="inputValue"
      :options="options"
      :multiple="multiple"
      emit-value
      map-options
      :class="[
        styleDate,
        { 'forms__input_text--error': successMessage.$error },
      ]"
      popup-content-class="forms__select-popup"
      :popup-content-style="{
        width: `${filter.popupWidth}px`,
        height: selectHeight,
      }"
      :label="label"
      :disable="disable"
      :loading="loading"
      @virtual-scroll="onScroll"
    >
      <template v-slot:label>
        <div
          class="forms__select-placeholder"
          :class="{
            'forms__select-placeholder--show':
              inputValue === null || inputValue.length <= 0,
          }"
        >
          {{ label }}
        </div>
      </template>
      <template v-slot:before-options>
        <SearchBar
          class="forms__select-search"
          v-model="filter.search"
          title="Поиск"
        />
      </template>
      <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
        <q-item class="forms__select-item" v-bind="itemProps">
          <q-item-section side>
            <q-checkbox
              dense
              :model-value="selected"
              @update:model-value="toggleOption(opt)"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label v-html="opt.label" />
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:no-option>
        <SearchBar
          class="forms__select-search"
          :fullwidth="true"
          v-model="filter.search"
          title="Поиск"
        />
        <q-item>
          <q-item-section>
            <q-item-label class="forms__no-data">Нет данных</q-item-label>
          </q-item-section>
        </q-item>
      </template>
      <template v-slot:selected-item="scope">
        <q-chip
          v-if="scope.index === filter.isMaxIndexChip && multiple"
          :tabindex="scope.tabindex"
          text-color="white"
        >
          еще + {{ inputValue.length - filter.isMaxIndexChip }}
        </q-chip>
        <q-chip
          v-if="scope.index < filter.isMaxIndexChip"
          removable
          @remove="scope.removeAtIndex(scope.index)"
          :tabindex="scope.tabindex"
          text-color="white"
          icon-remove="img:svg/close_icon.svg"
        >
          {{ scope.opt.label }}
        </q-chip>
      </template>
    </q-select>
    <span v-if="successMessage.$error" class="forms__help-message">
      {{ successMessage.$errors[0].$message }}</span
    >
  </div>
</template>

<script>
import { defineComponent, computed, reactive, ref, watch, nextTick } from "vue";
import SearchBar from "components/ui/Search/SearchBar";

export default defineComponent({
  name: "SelectMultiple",
  components: { SearchBar },
  emits: ["getRequestPage"],
  props: {
    modelValue: {
      type: [String, Array, Number, Boolean],
      default: String,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    style: {
      type: [String, Number, null, Array, Object, FormData],
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    styleDate: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    modelOption: { type: Array, default: Array },
    title: { type: String },
    dense: { type: Boolean, default: true },
    height: { type: String },
    nextPage: { type: Number },
    loading: { type: Boolean },
    successMessage: {
      type: Object,
      default: () => ({ $dirty: true, $error: false }),
    },
  },
  setup(props, { emit }) {
    let inputValue = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        return emit("update:modelValue", val);
      },
    });
    const select = ref();
    const selectHeight = computed(() => {
      if (options.value.length > 10 && props.height) {
        return props.height;
      }
      return "fit-content";
    });
    const filter = reactive({
      search: "",
      isMaxIndexChip: 1,
      popupWidth: 0,
    });
    const options = computed(() => {
      if (!filter.search) {
        return props.modelOption;
      }
      return props.modelOption.filter((option) => {
        return option.label.toLowerCase().includes(filter.search.toLowerCase());
      });
    });
    const loader = computed(() => {
      return props.loading;
    });
    const lastPage = ref(1);
    const nextPage = ref(1);
    const onScroll = ({ to }) => {
      if (props.nextPage) {
        nextPage.value = props.nextPage;
      }
      const lastIndex = options.value.length - 1;
      lastPage.value = Math.ceil(options.value.length / 30) + 1;
      if (options.value.length === 0) {
        lastPage.value = 1;
      }
      if (
        loader.value !== true &&
        nextPage.value <= lastPage.value &&
        to === lastIndex
      ) {
        emit("getRequestPage", nextPage.value);
        nextPage.value++;
      }
    };
    watch(inputValue, () => {
      nextTick(() => {
        filter.popupWidth = select.value.$el.offsetWidth;
        const list = select.value.$el.querySelectorAll(".q-chip");
        list.forEach((el, index) => {
          filter.isMaxIndexChip =
            list.length > 1 ? index : filter.isMaxIndexChip + 1;
        });
      });
    });

    return {
      inputValue,
      filter,
      options,
      select,
      loader,
      onScroll,
      selectHeight,
    };
  },
});
</script>
<style scoped lang="scss">

.forms__input_text--error {
  border: 2px solid #ff0000;
}
</style>
