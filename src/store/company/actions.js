import { api } from "src/lib/axios";

export const CompanySingle = async ({ commit }, payload) => {
  await api.post(`/admin/company/single=${payload}`).then((res) => {
    commit("setCompany", res.data);
  });
};
export const CompanyCreate = async ({ commit }, payload) => {
  await api.post("/admin/company/create", payload).then((res) => {
    commit("setCompanyCreate", res.data);
  });
};
export const CompanyUpdate = async ({ commit }, payload) => {
  await api.put(`/admin/company/single=${payload.id}`, payload).then((res) => {
    commit("setCompany", res.data);
  });
};



export const CompanyDate = async ({ commit }, payload) => {
  await api.post(`/admin/company/credentials=${payload}`).then((res) => {
    commit("setCompanyDate", res.data);
  });
};
export const CompanyDateUpdate = async ({ commit }, payload) => {
  await api
    .put(`/admin/company/credentials=${payload.id}`, payload.form)
    .then((res) => {
      commit("setCompanyDate", res.data);
    });
};
export const CompanyDateDelete = async ({ commit }, payload) => {
  await api.delete(`/admin/company/credentials=${payload}`).then((res) => {
    commit("setCompanyDate", res.data);
  });
};


export const getCompanyBank = async ({ commit }, payload) => {
  await api.get(`/admin/company/bank=${payload}`).then((res) => {
    commit("setCompanyBank", res.data);
  });
};
export const CompanyBankUpdate = async ({ commit }, payload) => {
  await api
    .put(`/admin/company/bank=${payload.id}`, payload.form)
    .then((res) => {
      commit("setCompanyBank", res.data);
    });
};
export const CompanyBankDelete = async ({ commit }, payload) => {
  await api.delete(`/admin/company/bank=${payload}`).then((res) => {
    commit("setCompanyBank", res.data);
  });
};



export const CompanyList = async ({ commit }, payload) => {
  await api.get(`/admin/company/list-company?page=${payload}`).then((res) => {
    commit("setCompanyList", res.data);
  });
};



export const CreateCompanyClient = async ({ commit }, payload) => {
  await api.post(`/admin/client/create`, payload).then((res) => {
    commit("createCompanyClient", res.data);
  });
};

export const getSingleCompanyClient = async ({ commit }, payload) => {
  await api.get(`/admin/client/single=${payload}`).then((res) => {
    commit("setCompanyClient", res.data);
  });
};

export const UpdateCompanyClient = async ({ commit }, payload) => {
  await api.put(`/admin/client/single=${payload.id}`, payload).then((res) => {
    commit("setCompanyClient", res.data);
  });
};

export const DeleteCompanyClient = async ({ commit }, payload) => {
  await api.delete(`/admin/client/single=${payload}`).then((res) => {
    commit("setCompanyClient", res.data);
  });
};




export const CompanyClientBank = async ({ commit }, payload) => {
  await api
    .put(`/admin/client/bank=${payload.id}`, payload.form)
    .then((res) => {
      commit("setCompanyClientBank", res.data);
    });
};
export const getCompanyClientBank = async ({ commit }, payload) => {
  await api.get(`/admin/client/bank=${payload}`).then((res) => {
    commit("setCompanyClientBank", res.data);
  });
};
export const deleteCompanyClientBank = async ({ commit }, payload) => {
  await api.delete(`/admin/client/bank=${payload}`).then((res) => {
    commit("setCompanyClientBank", res.data);
  });
};


export const CreateStaff = async ({ commit }, payload) => {
  await api.post(`/admin/user/create`, payload).then((res) => {
    commit("setStaff", res.data);
  });
};
export const getSingleStaff = async ({ commit }, payload) => {
  await api.get(`admin/user/single=${payload}`).then((res) => {
    commit("setStaff", res.data);
  });
};
export const UpdateStaff = async ({ commit }, payload) => {
  await api
    .put(`/admin/user/single=${payload.id}`, payload)
    .then((res) => {
      commit("setStaff", res.data);
    });
};
export const deleteStaff = async ({ commit }, payload) => {
  await api.delete(`/admin/user/single=${payload}`).then((res) => {
    commit("setStaff", res.data);
  });
};
