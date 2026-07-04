import api from '../config/api'

export const getProfile = () => api.get('/user/profile')

export const updateProfile = (data) => api.put('/user/profile', data)

export const deleteUser = () => api.delete('/user/profile')
