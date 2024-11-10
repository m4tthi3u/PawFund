import api from "services/api";

export const authService = {
  login: (user) => api.post(`/Auth/login`, user),
  checkStatus: () => api.get(`/Auth/test-auth`),
};
export default authService;
