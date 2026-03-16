import api from './index';

export const getChannels = () => api.get('/channels').then((response) => response.data);
