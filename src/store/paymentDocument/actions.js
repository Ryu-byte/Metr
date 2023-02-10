import { api } from "src/lib/axios";

export const CreatePaymentDocument = async ({ commit }, payload) => {
  await api.post("admin/payment-document/create", payload).then((res) => {
    commit("setPaymentDocument", res.data);
  });
};
export const getSinglePaymentDocument = async ({ commit }, id) => {
  await api.get("admin/payment-document/single" + id).then((res) => {
    commit("setPaymentDocument", res.data.data);
  });
};

export const UpdatePaymentDocument = async ({ commit }, payload) => {
  await api.put("admin/payment-document/single=" + payload.id, payload).then((res) => {
    commit("setPaymentDocument", res.data.data);
  });
};

export const ListServices = async ({ commit }, payload) => {
  await api.post("admin/payment-document/service", payload).then((res) => {
    commit("setListServices", res.data.data);
  });
}
