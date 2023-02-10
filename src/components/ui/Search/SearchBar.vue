<template>
  <div class="searchbar" :style="searchWidth">
    <q-input
      class="bg-white searchbar__input"
      @keydown.enter.prevent="prevent"
      outlined
      input-debounce="0"
      :dense="dense"
      v-model="search"
      :placeholder="title"
      type="search"
    >
      <template v-slot:append>
        <q-icon name="img:svg/search.svg"/>
        <q-btn
          v-if="search"
          @click="search = ''"
          icon="clear"
          flat
          round
          dense
        />
      </template>
    </q-input>
  </div>
</template>
<script>
import {computed, defineComponent, ref, watch} from "vue";

export default defineComponent({
  name: "SearchBar",
  props: {
    modelValue: String,
    title: {type: String, required: true},
    dense: {type: Boolean, default: true},
    tableSearch: {type: Boolean},
  },

  setup(props, {emit}) {
    const search = ref("");
    const searchWidth = computed(() => {
      return props.tableSearch ? "width:183px" : "width:100%"
    })
    const prevent = (event) => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
    watch(search, (val) => {
      emit("update:modelValue", val);
    });
    return {
      search,
      searchWidth,
      prevent,
    };
  },
});

</script>
