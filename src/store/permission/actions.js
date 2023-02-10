import { api } from "src/lib/axios";

export const getPermission = async ({ commit }) => {
  await api.get("/admin/permission").then((res) => {
    commit("setPermissions", res.data.data);
  });
};
