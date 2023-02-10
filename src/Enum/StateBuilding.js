import { ref } from "vue";

const StateBuilding = ref([
  {
    label: "Исправный",
    value: 1,
  },
  {
    label: "Ветхий",
    value: 2,
  },
  {
    label: "Аварийный",
    value: 3,
  },
]);

export default StateBuilding;
