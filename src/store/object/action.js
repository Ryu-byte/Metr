import { api } from "src/lib/axios";

export const CreateObject = async ({ commit }, payload) => {
  await api.post("/admin/house/create", payload).then((res) => {
    commit("setCreateObject", res.data.data);
  });
};

export const CreateIpu = async ({ commit }, payload) => {
  await api.post("/admin/meter/ipu/create", payload).then((res) => {
    commit("setCreateIpu", res.data.data);
  });
};
export const CreateOpu = async ({ commit }, payload) => {
  await api.post("/admin/meter/opu/create", payload).then((res) => {
    commit("setCreateOpu", res.data.data);
  });
};

export const getSingleObjectIpu = async ({ commit }, id) => {
  await api.get("/admin/meter/ipu/single=" + id).then((res) => {
    commit("setIpu", res.data.data);
  });
};
export const getSingleObjectOpu = async ({ commit }, id) => {
  await api.get("/admin/meter/opu/single=" + id).then((res) => {
    commit("setOpu", res.data.data);
  });
};

export const UpdateObjectIpu = async ({ commit }, payload) => {
  await api
    .put("/admin/meter/ipu/single=" + payload.id, payload)
    .then((res) => {
      commit("setIpu", res.data.data);
    });
};
export const UpdateObjectOpu = async ({ commit }, payload) => {
  await api
    .put("/admin/meter/opu/single=" + payload.id, payload)
    .then((res) => {
      commit("setOpu", res.data.data);
    });
};

export const getSingleObject = async ({ commit }, id) => {
  await api.get("/admin/house/single=" + id).then((res) => {
    commit("setObject", res.data.data);
  });
};

export const UpdateObject = async ({ commit }, payload) => {
  await api.put("/admin/house/single=" + payload.id, payload).then((res) => {
    commit("setObject", res.data.data);
  });
};

export const CreateObjectDocument = async ({ commit }, payload) => {
  await api.post("/admin/house/document/create", payload).then((res) => {
    commit("setDocumentObject", res.data.data);
  });
};
export const getSingleObjectDocument = async ({ commit }, id) => {
  await api.get("/admin/house/document/single=" + id).then((res) => {
    commit("setDocumentObject", res.data.data);
  });
};

export const UpdateObjectDocument = async ({ commit }, payload) => {
  await api
    .post("/admin/house/document/single=" + payload.get("id"), payload)
    .then((res) => {
      commit("setDocumentObject", res.data.data);
    });
};
export const DeleteObjectDocument = async ({ commit }, id) => {
  await api.delete("/admin/house/document/file/single=" + id).then((res) => {
    commit("setDocumentObject", res.data.data);
  });
};

export const getTypeObjectDocument = async ({ commit }) => {
  await api.get("/admin/house/document/type").then((res) => {
    commit("setTypeObjectDocument", res.data);
  });
};

export const CreateObjectFlats = async ({ commit }, payload) => {
  await api.post("/admin/house/flat/create", payload).then((res) => {
    commit("setFlatsObject", res.data.data);
  });
};

export const getSingleObjectFlats = async ({ commit }, id) => {
  await api.get("/admin/house/flat/single=" + id).then((res) => {
    commit("setFlatsObject", res.data.data);
  });
};
export const UpdateObjectFlats = async ({ commit }, payload) => {
  await api
    .put("/admin/house/flat/single=" + payload.id, payload)
    .then((res) => {
      commit("setFlatsObject", res.data.data);
    });
};

export const DeleteObjectFlats = async ({ commit }, id) => {
  await api.delete("/admin/house/flat/single=" + id).then((res) => {
    commit("setFlatsObject", res.data.data);
  });
};
export const getApartments = async ({ commit }, payload) => {
  const res = await api.post("/admin/house/flat/all", payload)
    commit("setApartments", res.data);
};
