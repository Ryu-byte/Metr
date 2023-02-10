import { reactive } from "vue";

export default function () {
  return {
    user: null,
    token: "",
    isAuthenticated: false,
    userId: reactive({}),
    newUser: reactive({}),
  };
}
