import api from '../config/api'

export const getAllTransaksi = () => api.get('/transaksi')

export const getTransaksiByUser = (userId, page) =>
  api.get(`/transaksi/user/${userId}`, { params: page > 1 ? { page } : {} })

export const getTransaksiById = (id) => api.get(`/transaksi/${id}`)

export const getTransaksiGambar = (id) =>
  api.get(`/transaksi/${id}/gambar`, { responseType: 'blob' })
