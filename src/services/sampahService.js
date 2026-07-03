import api from '../config/api'

export const klasifikasiSampah = (gambar, beratKg) => {
  const formData = new FormData()
  formData.append('gambar', gambar)
  formData.append('beratKg', String(beratKg))
  return api.post('/sampah/klasifikasi', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
