import { api } from "src/lib/axios";

export const getUtility = async ({ commit }) => {
  await api.get("/admin/utility").then((res) => {
    commit("setUtility", res.data);
  });
};
