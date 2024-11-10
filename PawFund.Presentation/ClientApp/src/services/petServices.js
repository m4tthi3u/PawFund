import api from "services/api";

export const petService = {
  getAll: () => api.get("/Pets/GetPets"),
  getById: (id) => api.get(`/Pets/GetPet/${id}`),
  create: (pet) => api.post("/Pets/AddPet", pet),
  update: (id, pet) => api.put(`/Pets/UpdatePets/${id}`, pet),
  delete: (id) => api.delete(`/Pets/DeletePet`),
};
export default petService;
