import api from '../config/api'

export const klasifikasiSampah = (gambar, beratKg, userId) => {
  const formData = new FormData()
  formData.append('gambar', gambar)
  formData.append('beratKg', String(beratKg))
  formData.append('userId', String(userId))
  return api.post('/sampah/klasifikasi', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
