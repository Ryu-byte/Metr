import { reactive } from "vue";

const TypeMainCompany = reactive([
  {
    value: 1,
    label: "Расчетный центр",
  },
  {
    value: 2,
    label: "Управляющая компания",
  },
  {
    value: 3,
    label: "Товарищество собственников жилья(ТСЖ)",
  },
  {
    value: 4,
    label: "Жилищно-строительный кооператив(ЖСК)",
  },
  {
    value: 5,
    label: "Товариществом собственников недвижимости(ТСН)",
  },
  {
    value: 6,
    label: "Потребительский жилищно строительный кооператив(ПЖСК)",
  },
]);

export default TypeMainCompany;
