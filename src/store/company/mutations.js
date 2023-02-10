export function setCompanyType(state, company) {
  state.TypeCompany = company;
}
export function setCompany(state, company) {
  state.Company = company.data;
}

export function setCompanyDate(state, company) {
  state.CompanyDate = company.data;
}
export function setCompanyBank(state, company) {
  state.CompanyBank = company.data;
}
export function setCompanyList(state, company) {
  state.CompanyList = company;
}

export function setCompanyTypePartner(state, company) {
  state.TypePartner = company;
}

export function setCompanyCreate(state, company) {
  state.CompanyCreate = company.data;
}

export function setCompanyClient(state, company) {
  state.CompanyClient = company.data;
}
export function setCompanyClientBank(state, company) {
  state.CompanyClientBank = company.data;
}

export function createCompanyClient(state, company) {
  state.CompanyClient = company;
}
export function setStaff(state, data) {
  state.Staff = data.data;
}
