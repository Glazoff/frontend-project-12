import api from './index'

export const getMessages = () => api.get('/messages').then(response => response.data)

export const sendMessage = messageData =>
  api.post('/messages', messageData).then(response => response.data)

export const editMessage = (messageId, messageData) =>
  api.patch(`/messages/${messageId}`, messageData).then(response => response.data)

export const removeMessage = messageId =>
  api.delete(`/messages/${messageId}`).then(response => response.data)
