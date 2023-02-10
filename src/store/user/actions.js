import { api } from "src/lib/axios";

export const login = async ({ commit, dispatch }, payload) => {
  await api.post("/pub/auth/login", payload).then((response) => {
    const token = response.data.data;
    commit("setToken", token);
    api.defaults.headers.common.Authorization = "Bearer " + token.access;
  });
};

export const signOut = ({ commit }) => {
  api.defaults.headers.common.Authorization = "";
  commit("removeToken");
};

export const getUser = async ({ commit }) => {
  await api.post("/pub/auth/user").then((response) => {
    commit("setUser", response.data.data);
  });
};

export const init = async ({ commit, dispatch }) => {
  const token = localStorage.getItem("token");
  if (token) {
    await commit("setToken", JSON.parse(token));
    api.defaults.headers.common.Authorization =
      "Bearer " + JSON.parse(token).access;
    dispatch("getUser", JSON.parse(token));
  } else {
    commit("removeToken");
  }
};

export const getUserId = async ({ commit }, id) => {
  await api.get(`/admin/user/single=${id}`).then((res) => {
    commit("setUserId", res.data.data);
  });
};

export const updateUserId = async ({ commit }, payload) => {
  await api.put(`/admin/user/single=${payload.id}`, payload).then((res) => {
    commit("setUserId", res.data.data);
  });
};

export const createUserId = async ({ commit }, payload) => {
  await api.post("/admin/user/create", payload).then((res) => {
    commit("setNewUser", res.data.data);
  });
};
