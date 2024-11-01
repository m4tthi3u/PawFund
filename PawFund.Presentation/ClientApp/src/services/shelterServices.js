import api from 'services/api';

export const shelterService = {
    getAll: () => api.get('/Shelter/GetShelters'),
    getById: (id) => api.get(`/Shelter/GetShelter/${id}`),
    create: (shelter) => api.post('/Shelter/CreateShelter', shelter),
    update: (id, shelter) => api.put(`/Shelter/UpdateShelter/${id}`, shelter),
    delete: (id) => api.delete(`/Shelter/DeleteShelter/${id}`),
};
export default shelterService;

