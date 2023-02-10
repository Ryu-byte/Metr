import { api } from "src/lib/axios";
import {toPeriodMount} from "src/lib/helpers";

const apiList = {
  documentCompany: {
    list: async function (pagination, filters, id) {
      let data = {
        company_id: id,
        filter: { search: filters.search, filter: filters.filter },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/company/document", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  documentClient: {
    list: async function (pagination, filters, id) {
      let data = {
        client_id: id,
        filter: { search: filters.search, filter: filters.filter },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/client/document", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  user: {
    list: async function (pagination, filters, id) {
      let data = {
        company_id: id,
        filter: { search: filters.search },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/user", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  company: {
    list: async function (pagination, filters, id, parent_id) {
      let data = {
        company_id: id,
        parent_id: parent_id,
        filter: {
          search: filters.search,
          filter: filters.filter,
        },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/company", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  object: {
    list: async function (pagination, filters, id) {
      let data = {
        company_id: id,
        filter: {
          search: filters.search,
          filter: filters.filter,
        },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/house", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectDocument: {
    list: async function (pagination, filters, house_id) {
      let data = {
        filter: { search: filters.search, filter: filters.filter },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
        house_id: house_id,
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/house/document", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectIpu: {
    list: async function (pagination, filters, house_id) {
      let data = {
        filter: { search: filters.search, type: filters.type },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
        house_id: house_id,
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/meter/ipu", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectOpu: {
    list: async function (pagination, filters, house_id) {
      let data = {
        filter: { search: filters.search, type: filters.type },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
        house_id: house_id,
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/meter/opu", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectOpuHistory: {
    list: async function (pagination, filters, house_id  , period) {
      let data = {
        period: toPeriodMount(period),
        filter: {
          search: filters.search,
          filter: filters.filter,
        },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
        house_id: house_id,
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/meter/opu/history", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectIpuHistory: {
    list: async function (pagination, filters, house_id  , period) {
      let data = {
        period: toPeriodMount(period),
        filter: {
          search: filters.search,
          filter: filters.filter,
        },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
        house_id: house_id,
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/meter/ipu/history", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectFlat: {
    list: async function (pagination, filters, house_id) {
      let data = {
        filter: { search: filters.search, type: filters.type },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
        house_id: house_id,
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/house/flat", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  service: {
    list: async function (pagination, filters, id) {
      let data = {
        company_id: id,
        filter: {
          search: filters.search,
          filter: filters.filter,
        },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/service", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  account: {
    list: async function (pagination, filters) {
      let data = {
        filter: {
          search: filters.search,
          filter: filters.filter,
        },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/account", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectMeters: {
    list: async function (pagination, filters) {
      let data = {
        filter: { search: filters.search, type: filters.type },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/meters", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectResident: {
    list: async function (pagination, filters) {
      let data = {
        filter: { search: filters.search, type: filters.type },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/resident", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectAccount: {
    list: async function (pagination, filters, id) {
      let data = {
        house_id: id,
        filter: { search: filters.search, type: filters.type },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/house/account", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  objectService: {
    list: async function (pagination, filters, id) {
      let data = {
        house_id: id,
        filter: { search: filters.search, type: filters.type },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/house/service", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
  paymentDocument: {
    list: async function (pagination, filters, id) {
      let data = {
        company_id: id,
        filter: {
          search: filters.search,
          filter: filters.filter,
        },
        pages: { page: pagination.page, perPage: pagination.rowsPerPage },
      };
      data["sort"] = {
        by: pagination.sortBy,
        order: pagination.descending ? "desc" : "asc",
      };
      let response = await api.post("/admin/payment-document", data);
      if (isOkResponse(response)) {
        return parseGenericTable(response.data);
      }
      return null;
    },
  },
};

function isOkResponse(response) {
  return response.data.hasOwnProperty("data") && response.data.status === true;
}

function parseGenericTable(response) {
  if (response.status === true) {
    let data = response.data;
    let res = {};
    res.pagination = data.pagination;
    res.list = [];
    for (let i in data.list) {
      if (!data.list.hasOwnProperty(i)) continue;
      res.list.push(data.list[i]);
    }
    return res;
  } else {
    let res = {};
    res.pagination = {
      sortBy: "",
      descending: false,
      page: 1,
      rowsPerPage: 20,
      rowsNumber: 0,
    };
    res.list = [];
    return res;
  }
}
export default apiList;
