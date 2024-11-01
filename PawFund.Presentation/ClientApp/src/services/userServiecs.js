import api from 'services/api';

export const userService = {
    getAll: () => api.get('/User/GetUsers'),
    getById: (id) => api.get(`/User/GetUser/${id}`),
    create: (user) => api.post(`/User/CreateUser`,user),
    update: (id, user) => api.put(`/User/UpdateUser/${id}`,user),
    delete: (id) => api.delete(`/User/DeleteUser/${id}`)

};
export default userService;