export function setToken(state, token) {
  state.token = token;
  state.isAuthenticated = true;
  window.localStorage.setItem("token", JSON.stringify(token));
}

export function removeToken(state) {
  state.token = "";
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("vuex");
  state.isAuthenticated = false;
}

export function setUser(state, user) {
  state.user = user;
}

export function setUserId(state, userId) {
  state.userId = userId;
}

export function setNewUser(state, user) {
  state.newUser = user;
}
