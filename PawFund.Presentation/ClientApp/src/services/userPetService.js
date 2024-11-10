import api from "services/api";

export const userPetService = {
  adoptPet: (id) => api.post(`/UserPet/adopt/${id}`),
  userPet: (id) => api.get(`/UserPet/mypets`),
};
export default userPetService;
