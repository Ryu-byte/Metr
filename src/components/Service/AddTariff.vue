<template>
  <div class="tariff_form" v-for="(item, index) in tariffs" :key="index">
    <div class="row no-wrap justify-between q-mb-lg">
      <div class="col-md-12">
        <TextInput
          :label="`Тариф ${index > 0 ? index + 1 : ''} :`"
          name="tariff"
          v-model="item.tariff"
          type="number"
          placeholder="Укажите тариф"
        />
      </div>
    </div>
    <div v-for="(house, house_index) in tariffs[index].house" :key="house_index"
         class="row no-wrap  q-mb-lg">
      <div class="col-md-8 q-pr-md">
        <SelectMultiple
          label="Выберите объект"
          title="Объект:"
          name="house"
          height="300px"
          :model-value="house.house_id"
          @getRequestPage="getRequestPage"
          :loading="loading"
          :model-option="object_options"
          @update:model-value="onChangeFilter($event, house.id, 'house', index, house_index)"
        />
      </div>
      <div class="col-md-2 q-pl-md q-pr-md">
        <TextInput
          label="Норматив ОДН:"
          name="normative_odn"
          v-model="house.normative_odn"
          type="number"
          placeholder="Норматив"
        />
      </div>
      <div v-if="house_index === 0" class="col-md-2 q-pl-md flex items-center" >
        <q-btn
          class="btn services__tariff-add"
          no-caps
          size="14px"
          @click="addHouse(index)"
        >
          <q-icon name="img:svg/add_icon.svg" class="services__tariff-img"/>
          Добавить объект
        </q-btn>
      </div>
      <div v-else class="col-md-2 q-pl-md flex items-center">
        <q-btn
          class="services__tariff-delete btn"
          no-caps
          size="14px"
          @click="deleteHouse(index, house_index, house.id)"
        >
          <q-icon
            name="img:svg/close_icon_red.svg"
            class="services__tariff-img on-left"
          />
          Удалить объект
        </q-btn>
      </div>
    </div>

    <div v-if="index > 0" class="row no-wrap q-mb-md">
      <q-btn
        class="services__tariff-delete btn"
        no-caps
        @click="deleteTariff(index, item.id)"
      >
        <q-icon
          name="img:svg/close_icon_red.svg"
          class="services__tariff-img on-left"
        />
        Удалить тариф
      </q-btn>
    </div>
  </div>
</template>

<script>
import TextInput from "components/ui/input/TextInput";
import SelectMultiple from "components/ui/SelectMultiple/SelectMultiple";
import {computed, defineComponent, ref} from "vue";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import {api} from "src/lib/axios";
import {getEnumOptions, selectObject} from "src/lib/helpers";

export default defineComponent({
  name: "AddTariff",
  props: {
    tariffList: {
      type: Array,
      required: true,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Object,
      required: false,
      default: Object,
    },
  },
  emits: ["updateTariff"],
  components: {
    SelectMultiple,
    TextInput,
  },

  setup(props, {emit}) {
    const $q = useQuasar();
    const store = useStore();
    let tariffs = computed({
      get() {
        return props.tariffList;
      },
      set(value) {
        emit("updateTariff", value);
      },
    });
    const object_options = ref([]);
    const loading = ref(false);
    const updateOptions = ref(false);

    const getRequestPage = async (page) => {
      loading.value = true;
      if (object_options.value.length === 1 && updateOptions.value) {
        object_options.value.length = 0;
        updateOptions.value = false;
      }
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
        loading.value = false;
      }
    }

    const onChangeFilter = (value, tariffId, key, index, house_index) => {
      tariffs.value.forEach(tariff => {
        tariff.house.forEach(house => {
          house.house_id = house.house_id === value ? null : house.house_id
        })
      })
      tariffs.value[index].house[house_index].house_id = value
    };
    const deleteTariff = async (index, id) => {
      tariffs.value = tariffs.value.splice(index, 1);
      if (id) {
        api.delete("admin/tariff/single=" + id);
        $q.notify({
          message: "Тариф удалён",
          type: "positive",
          position: "top-right",
        });
      }
    };
    const deleteHouse = async (index, house_index, id) => {
      tariffs.value = tariffs.value[index].house.splice(house_index, 1);
      if (id) {
        api.delete("admin/tariff/tariff-house/single=" + id);
        $q.notify({
          message: "Объект удалён",
          type: "positive",
          position: "top-right",
        });
      }
    };

    const addHouse = (index) => {
      tariffs.value[index].house.push({
        house_id: null,
        normative_odn: 1
      })
    }

    if (props.isEdit) {
      tariffs.value.forEach(tariff => {
        tariff.house.forEach(house => {
          object_options.value.push({
            value: house.house_id,
            label: house.address
          })
        })
      })
      updateOptions.value = true;
    }

    return {
      addHouse,
      deleteHouse,
      tariffs,
      object_options,
      onChangeFilter,
      deleteTariff,
      getRequestPage,
      loading
    };
  },
});
</script>
