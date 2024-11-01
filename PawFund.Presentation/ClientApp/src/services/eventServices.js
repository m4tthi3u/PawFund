import api from 'services/api';

export const eventService = {
    getAll: () => api.get('/Event/GetEvents'),
    getById: (id) => api.get(`/Event/GetEvent/${id}`),
    create: (event) => api.post('/Event/CreateEvent', event),
    update: (id, event) => api.put(`/Event/UpdateEvent/${id}`, event),
    delete: (id) => api.delete(`/Event/DeleteEvent/${id}`),
};

export default eventService;