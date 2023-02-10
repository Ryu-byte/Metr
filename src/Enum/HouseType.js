import { ref } from "vue";

const HouseType = ref([
  {
    label: "Жилое помещение",
    value: 0,
  },
  {
    label: "Квартира",
    value: 1,
  },
  {
    label: "Нежилое помещение",
    value: 2,
  },
  {
    label: "Кладовка (кл)",
    value: 3,
  },
  {
    label: "Машино место (м/м)",
    value: 4,
  },
  {
    label: "Комната в коммунальной квартире",
    value: 5,
  },
]);

export default HouseType;
