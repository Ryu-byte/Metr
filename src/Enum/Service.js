import { ref } from "vue";

const Service = ref([
  {
    label: "Холодная вода",
    value: 1,
  },
  {
    label: "Горячая вода",
    value: 2,
  },
  {
    label: "Тепловая энергия",
    value: 3,
  },
  {
    label: "Водоотведение",
    value: 4,
  },
  {
    label: "Электроснабжение",
    value: 5,
  },
  {
    label: "Газоснабжение",
    value: 6,
  },
  {
    label: "Отопление",
    value: 7,
  }, {
    label: "Твердое топливо",
    value: 8,
  }, {
    label: "Содержание и ремонт общего имущества",
    value: 9,
  }, {
    label: "Вывоз мусора",
    value: 10,
  }, {
    label: "Другое",
    value: 11,
  }
]);

export default Service;
