import api from './index';

export const getMessages = () => api.get('/messages').then((response) => response.data);

export const sendMessage = (messageData) => {
  return api.post('/messages', messageData).then((response) => response.data);
};
