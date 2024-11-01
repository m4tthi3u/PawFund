import api from 'services/api';

export const donationService = {
    getAll: () => api.get('/Donation/GetDonations'),
    getById: (id) => api.get(`/Donation/GetDonationById/${id}`),
    getByUserId: (userId) => api.get(`/Donation/GetDonationByUserId/user/${userId}`),
    create: (donation) => api.post('/Donation/AddDonation', donation),
    update: (id, donation) => api.put(`/Donation/UpdateDonation/${id}`, donation),
    delete: (id) => api.delete(`/Donation/DeleteDonation/${id}`)

};
export default donationService;