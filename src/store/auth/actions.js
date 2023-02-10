import { api } from "src/lib/axios";
export const register = async ({ commit }, payload) => {
  await api.post("/pub/register", payload).then((response) => {
    const res = response.data;
    commit("setResult", res);
  });
};
