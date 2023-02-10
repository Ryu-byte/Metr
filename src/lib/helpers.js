import moment from "moment";
import "moment/locale/ru";
import {useStore} from "vuex";
import _, {forEach} from "lodash";

const baseMoment = moment("2000-01-01");

export function dateTime(unix_time) {
  if (unix_time === 0 || unix_time == null) return null;
  let m = moment.unix(unix_time);
  return m.format("DD.MM.YYYY HH:mm");
}

export function friendlyUnixDateTime(unix_time, ms) {
  if (unix_time === 0 || unix_time == null) return null;
  let m = moment.unix(unix_time);
  let resDate = m.format("DD.MM.YYYY");
  return resDate + m.format(" HH:mm" + (ms ? ":ss" : ""));
}

export function friendlyDateTime(datetime, ms) {
  if (!datetime) return null;
  let m = moment(datetime);
  return m.format("DD.MM.YYYY HH:mm" + (ms ? ":ss" : ""));
}

export function formatPrice(value, item = "р.") {
  let val = (value / 1).toFixed(2);
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + item;
}

export function formatNum(value) {
  let val = (value / 1).toFixed(0);
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatBalance(value) {
  let sd = baseMoment.clone().add(value, "s");
  let days = baseMoment.diff(sd);
  let balance = sd.format("HH:mm:ss");
  if (days > 0) {
    days = days + " д. ";
  } else {
    days = "";
  }
  return days + balance;
}

export function declOfNum(n, text_forms) {
  n = Math.abs(n) % 100;
  let n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 == 1) {
    return text_forms[0];
  }
  return text_forms[2];
}

export function formatUnixDate(unix_time, time = true) {
  if (unix_time == 0 || unix_time == null) return null;
  let dt = moment.unix(unix_time);
  return time ? dt.format("DD.MM.YYYY HH:mm:ss") : dt.format("DD.MM.YYYY");
}

export function formatUnixDateTime(unix_time) {
  if (unix_time == 0 || unix_time == null) return null;
  let dt = moment.unix(unix_time);
  return dt.format("DD.MM.YYYY");
}
export function formatUnixMonths(unix_time) {
  if (unix_time === 0 || unix_time == null) return null;
  let dt = moment.unix(unix_time);
  return dt.format("MMMM YYYY");
}
export function formatDate(val, time = true) {
  if (val === null) return "";
  let dt = moment(val);
  if (!dt.isValid()) return null;
  return time ? dt.format("DD.MM.YYYY") : dt.format("DD.MM.YYYY")
}

export function formatDateFormat(val, format) {
  if (val === null) return "";
  let dt = moment(val);
  if (!dt.isValid()) return null;
  return dt.format(format);
}

export function toUnixDate(date) {
  //var smt = moment;
  let mmt = moment.utc(date, "DD.MM.YYYY");
  if (!mmt.isValid()) return null;
  return mmt.format("YYYY-MM-DD");
}

export function toUnixFormat(date) {
  let mmt = moment.utc(date, "DD.MM.YYYY");
  if (!mmt.isValid()) return null;
  return mmt.format("X");
}

export function toUnixDateWithTime(date) {
  //var smt = moment;
  let mmt = moment.utc(date, "DD.MM.YYYY HH:mm");
  if (!mmt.isValid()) return null;
  return mmt.format("YYYY-MM-DD HH:mm");
}

export function toUnixTime(date) {
  let mmt = moment.utc(date, "DD.MM.YYYY");
  return mmt.format("X");
}

export function dateTimeWithSecondsByUnixTime(unix_time) {
  if (unix_time === 0) return "";
  let m = moment.unix(unix_time);
  return m.format("DD.MM.YYYY HH:mm:ss");
}

export function toPeriodMount(date) {
  let mmt = moment.tz(date, "MMMM YYYY", "Europe/Moscow");
  if (!mmt.isValid()) return null;
  return mmt.endOf('month').format("X");
}

let tagsToReplace = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

export function tagsReplace(str) {
  return str.replace(/[&<>]/g, tagsToReplace);
}

export function booleanToString(value) {
  return value ? "Да" : "Нет";
}

export function getEnumOptions(getter) {
  let store = useStore()
  const data = store.getters[`enums/` + getter]
  const options = []
  if (data) {
    forEach(data, (item, key) => {
      options.push({
        value: Number(key),
        label: item
      })
    })
    return options
  }
  return []
}

export async function selectObject(store, payload, key) {
  let objects = store.getters["service/getObjectVariables"];
  let options = []
  await store
    .dispatch("service/ObjectVariables", payload)
    .then(() => {
      if (key === "houses") {
        objects = store.getters["service/getObjectVariables"];
        options = objects.houses.map(({id, address}) => ({
          value: id,
          label: address,
        }));
      }
      if (key === "flats") {
        objects = store.getters["service/getObjectVariables"];
        options = objects.flats.map(({apartment, id}) => ({
          value: id,
          label: apartment,
        }));
      }
    });
  return options
}

export async function selectCompany(store, key, page) {
  let options = []
  if (key === 'client') {
    await store.dispatch("service/ClientList", page).then(() => {
      const company_list = store.getters["service/getClientList"]
      if (company_list) {
        forEach(company_list, (value) => {
          options.push({
            value: value.id,
            label: value.company_name,
          });
        });
      }
    });
  }
  if (key === 'company') {
    await store.dispatch("company/CompanyList", page).then(() => {
      const company_list = store.getters["company/getCompanyList"]
      if (company_list) {
        forEach(company_list, (value) => {
          options.push({
            value: value.id,
            label: value.company_name,
          });
        });
      }
    });
  }
  return options
}

export function getServiceOptions(form, service) {
  let service_options = [];
  switch (form.type_service) {
    case 1:
      form.formula = null;
      form.service = null;
      form.units = null;
      return service_options = _.filter(service, (o) => {
        return (
          o.value < 4 || (o.value >= 5 && o.value < 7) || o.value === 9
        );
      });
    case 2:
      form.formula = null;
      form.service = null;
      form.units = null;
      return service_options = _.filter(service, (o) => {
        return o.value <= 7 || o.value === 10;
      });
    case 3:
      form.formula = null;
      form.service = null;
      form.units = null;
      return service_options = _.filter(service, (o) => {
        return o.value === 11;
      });
    default:
      form.units = null;
      form.formula = null;
      form.service = null;
  }
}

export function getFormulaOptions(form, formula) {
  let formula_options = [];
  if (form.type_service === 1) {
    if (form.service === 1) {
      formula_options = _.filter(formula, (o) => {
        return o.value === 25 || (o.value >= 31 && o.value <= 32);
      });
      form.units = 1;
      form.formula = null;
      return formula_options
    }
    if (form.service === 2) {
      formula_options = _.filter(formula, (o) => {
        return o.value === 27 || o.value === 39;
      });
      form.units = 1;
      form.formula = null;
      return formula_options
    }
    if (form.service === 3) {
      formula_options = _.filter(formula, (o) => {
        return o.value === 33 || o.value === 28;
      });
      form.units = 4;
      form.formula = null;
      return formula_options
    }
    if (form.service === 5) {
      formula_options = _.filter(formula, (o) => {
        return o.value === 29;
      });
      form.units = 1;
      form.formula = null;
      return formula_options
    }
    if (form.service === 6) {
      formula_options = _.filter(formula, (o) => {
        return o.value === 30;
      });
      form.units = 3;
      form.formula = null;
      return formula_options
    }
    if (form.service === 9) {
      formula_options = _.filter(formula, (o) => {
        return o.value === 38;
      });
      form.units = 2;
      form.formula = null;
      return formula_options
    }
  }
  if (form.type_service === 2) {
    if (form.service === 1) {
      formula_options = _.filter(formula, (o) => {
        return o.value >= 7 && o.value <= 8;
      });
      form.units = 1;
      form.formula = null;
      return formula_options
    }
    if (form.service === 2) {
      formula_options = _.filter(formula, (o) => {
        return o.value >= 9 && o.value <= 10;
      });
      form.units = 1;
      form.formula = null;
      return formula_options
    }
    if (form.service === 3) {
      formula_options = _.filter(formula, (o) => {
        return o.value >= 11 && o.value <= 12;
      });
      form.units = 4;
      form.formula = null;
      return formula_options
    }
    if (form.service === 4) {
      formula_options = [];
      form.units = 4;
      form.formula = null;
      return formula_options
    }
    if (form.service === 5) {
      formula_options = _.filter(formula, (o) => {
        return o.value <= 3;
      });
      form.units = 1;
      form.formula = null;
      return formula_options
    }
    if (form.service === 6) {
      formula_options = _.filter(formula, (o) => {
        return o.value >= 4 && o.value <= 6;
      });
      form.units = 3;
      form.formula = null;
      return formula_options
    }
    if (form.service === 7) {
      formula_options = _.filter(formula, (o) => {
        return o.value >= 13 && o.value <= 14;
      });
      form.units = 1;
      form.formula = null;
      return formula_options
    }
    if (form.service === 10) {
      formula_options = _.filter(formula, (o) => {
        return o.value >= 17 && o.value <= 24;
      });
      form.units = 2;
      form.formula = null;
      return formula_options
    }
  }
  if (form.type_service === 3 && form.service === 11) {
    formula_options = _.filter(formula, (o) => {
      return o.value === 38;
    });
    form.formula = null;
    return formula_options
  }
  if (form.service === null) {
    form.formula = null;
    form.units = null;
  }
}

export default {
  dateTime,
  friendlyDateTime,
  friendlyUnixDateTime,
  formatPrice,
  formatNum,
  formatBalance,
  formatDate,
  toUnixTime,
  toUnixDate,
  formatUnixDate,
  toUnixDateWithTime,
  dateTimeWithSecondsByUnixTime,
  declOfNum,
  formatDateFormat,
  tagsReplace,
  booleanToString,
  toUnixFormat,
  getEnumOptions,
  selectObject,
  selectCompany
};
