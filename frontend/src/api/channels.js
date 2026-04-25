import api from './index'

export const getChannels = () => api.get('/channels').then(response => response.data)

export const addChannel = channelData =>
  api.post('/channels', channelData).then(response => response.data)

export const editChannel = (channelId, channelData) =>
  api.patch(`/channels/${channelId}`, channelData).then(response => response.data)

export const removeChannel = channelId =>
  api.delete(`/channels/${channelId}`).then(response => response.data)
