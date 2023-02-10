import {api} from "src/lib/axios";

export const CreateService = async ({commit}, payload) => {
  const res = await api.post("/admin/service/create", payload);
  commit("setService", res.data);
};

export const SingleService = async ({commit}, id) => {
  const res = await api.get("/admin/service/single=" + id);
  commit("setService", res.data.data);
};
export const UpdateSingleService = async ({commit}, payload) => {
  await api.post("/admin/service/single=" + payload.id, payload);
};

export const ObjectVariables = async ({commit}, payload) => {
  const res = await api.post("/admin/service/select?page=" + payload.page, payload.data);
  commit("setObjectVariables", res.data)
};
export const ClientList = async ({commit}, payload) => {
  await api.get(`/admin/company/list-company?page=${payload}`).then((res) => {
    commit("setClientList", res.data);
  });
};



