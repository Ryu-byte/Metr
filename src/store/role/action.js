import { api } from "src/lib/axios";

export const getRoleList = async ({ commit }) => {
  await api.get("/admin/role").then((res) => {
    commit("setRoleList", res.data.data);
  });
};
