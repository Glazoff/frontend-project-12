import axios from "axios";

export const login = ({name, password}) => axios.post('/api/v1/login', { username: name, password}).then((response) => {
  return response.data;
});