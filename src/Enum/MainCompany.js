import { ref } from "vue";

const MainCompany = ref([
  {
    label: "Расчетный центр",
    value: 0,
  },
  {
    label: "Управляющая компания",
    value: 1,
  },
  {
    label: "Товарищество собственников жилья(ТСЖ)",
    value: 2,
  },
  {
    label: "Жилищно-строительный кооператив(ЖСК)",
    value: 3,
  },
  {
    label: "Товариществом собственников недвижимости(ТСН)",
    value: 4,
  },
  {
    label: "Потребительский жилищно строительный кооператив(ПЖСК)",
    value: 5,
  },
]);

export default MainCompany;
