import api from './index';

export const getMessages = () => api.get('/messages').then((response) => response.data);
