import { api } from "src/lib/axios";

export const CreateAccount = async ({ commit }, payload) => {
  const res = await api.post("/admin/account/create", payload);
  commit("setAccount", res.data);
};

export const SingleAccount = async ({ commit }, id) => {
  const res = await api.get("/admin/account/single=" + id);
  commit("setAccount", res.data.data);
};
export const UpdateSingleAccount = async ({ commit }, payload) => {
  await api.post("/admin/account/single=" + payload.id, payload);
};


