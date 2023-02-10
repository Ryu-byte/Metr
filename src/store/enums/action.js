import { api } from "src/lib/axios";
import { getDocumentType } from "src/store/enums/getters";

export const Formula = async ({ commit }) => {
  const res = await api.get("/admin/service/formula/type");
  commit("setFormula", res.data);
};

export const TypeFlats = async ({ commit }) => {
  const res = await api.get("/admin/house/flat/type");
  commit("setTypeFlats", res.data);
};
export const TypeOfFlat = async ({ commit }) => {
  const res = await api.get("/admin/house/flat/type-of-flat");
  commit("setTypeOfFlat", res.data);
};
export const Service = async ({ commit }) => {
  const res = await api.get("/admin/service/unite-service");
  commit("setService", res.data);
};
export const ServiceType = async ({ commit }) => {
  const res = await api.get("/admin/service/type");
  commit("setServiceType", res.data);
};
export const ServiceUnits = async ({ commit }) => {
  const res = await api.get("admin/service/unite/type");
  commit("setServiceUnits", res.data);
};
export const MeterType = async ({ commit }) => {
  const res = await api.get("/admin/meter/type");
  commit("setMeterType", res.data);
};
export const PartnerType = async ({ commit }) => {
  const res = await api.get("/admin/company/partner-type");
  commit("setPartnerType", res.data);
};

export const CompanyType = async ({ commit }) => {
  await api.get("/admin/company/main-type").then((res) => {
    commit("setCompanyType", res.data);
  });
};
export const DocumentType = async ({ commit }) => {
  await api.get("admin/house/document/type").then((res) => {
    commit("setDocumentType", res.data);
  });
};
export const CompanyTypeDoc = async ({ commit }) => {
  await api.get(`/admin/company/document/types`).then((res) => {
    commit("setCompanyTypeDoc", res.data);
  });
};
export const CompanyTaxesType = async ({ commit }) => {
  await api.get(`/admin/company/taxes/type`).then((res) => {
    commit("setCompanyTaxesType", res.data);
  });
};
export const DocumentStatus = async ({ commit }) => {
  await api.get(`/admin/company/documents/status`).then((res) => {
    commit("setDocumentStatus", res.data);
  });
};

// один раз вызывай, а сюда методы добавляй
export const getAllEnums = ({ dispatch }) => {
  dispatch("Formula");
  dispatch("TypeFlats");
  dispatch("TypeOfFlat");
  dispatch("Service");
  dispatch("ServiceType");
  dispatch("ServiceUnits");
  dispatch("MeterType");
  dispatch("PartnerType");
  dispatch("CompanyType");
  dispatch("DocumentType");
  dispatch("CompanyTypeDoc");
  dispatch("CompanyTaxesType");
  dispatch("DocumentStatus");
};
