import { ref } from "vue";

const ServiceType = ref([
  {
    label: "Содержание",
    value: 1,
  },
  {
    label: "Потребление",
    value: 2,
  },
  {
    label: "Дополнительная",
    value: 3,
  }
]);

export default ServiceType;
