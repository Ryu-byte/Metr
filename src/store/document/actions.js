import {api} from "src/lib/axios";

export const createDocumentClient = async ({commit}, payload) => {
  await api.post("/admin/client/document/create", payload).then((res) => {
    commit("setDocumentClient", res.data);
  });
};

export const getSingleDocumentClient = async ({commit}, payload) => {
  await api.get(`/admin/client/document/single=${payload}`).then((res) => {
    commit("setDocumentClient", res.data);
  });
};

export const updateDocumentClient = async ({commit}, payload) => {
  await api
    .post("/admin/client/document/single=" + payload.get("id"), payload)

    .then((res) => {
      commit("setDocumentClient", res.data);
    });
};
export const deleteDocumentClient = async ({commit}, payload) => {
  await api.delete(`/admin/client/document/single=${payload}`).then((res) => {
    commit("setDocumentClient", res.data);
  });
};
export const DeleteDocumentClientFile = async ({ commit }, id) => {
  await api.delete("/admin/client/document/file/single=" + id).then((res) => {
    commit("setDocumentClient", res.data);
  });
};

export const CreateDocument = async ({commit}, payload) => {
  await api.post(`/admin/company/document/create`, payload).then((res) => {
    commit("setDocumentCompany", res.data);
  });
};
export const CompanyDocSingle = async ({commit}, payload) => {
  await api.get(`/admin/company/document/single=${payload}`).then((res) => {
    commit("setDocumentCompany", res.data);
  });
};
export const UpdateDocument = async ({commit}, payload) => {
  await api
    .post("/admin/company/document/single=" + payload.get("id"), payload)
    .then((res) => {
      commit("setDocumentCompany", res.data);
    });
};
export const DeleteDocument = async ({commit}, payload) => {
  await api.delete(`/admin/company/document/single=${payload}`).then((res) => {
    commit("setDocumentCompany", res.data);
  });
};
export const DeleteDocumentCompanyFile = async ({ commit }, id) => {
  await api.delete("/admin/company/document/file/single=" + id).then((res) => {
    commit("setDocumentCompany", res.data);
  });
};
