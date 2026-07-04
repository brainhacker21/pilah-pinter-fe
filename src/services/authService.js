import api from '../config/api'

export const login = (email, password) => api.post('/auth/login', { email, password })

export const register = (nama, email, password, alamat) =>
  api.post('/auth/register', { nama, email, password, alamat })

export const refreshToken = (refreshToken) =>
  api.post('/auth/refresh-token', { refreshToken })

export const logout = (refreshToken) =>
  api.post('/auth/logout', { refreshToken })
