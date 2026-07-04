import api from '../config/api'

export const getAllTransaksi = () => api.get('/transaksi')

export const getTransaksiByUser = (userId) => api.get(`/transaksi/user/${userId}`)
