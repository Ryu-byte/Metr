export function getUser(state) {
  return state.user;
}
export function getUserRole(state) {
  return state.user.user.roles[0];
}

export function getToken(state) {
  return state.token;
}
export function isAuthenticated(state) {
  return state.isAuthenticated;
}

export function getUserId(state) {
  return state.userId;
}
export function getUserCompanyId(state) {
  return state.user.company.id;
}

export function getUserTypeCompany(state) {
  return state.user.company.company_type;
}

export function getUserCompany(state) {
  return state.user.company;
}
