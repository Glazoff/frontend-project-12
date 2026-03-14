import axios from "axios";

export const login = ({name, password}) => axios.post('/api/v1/login', { username: name, password}).then((response) => {
  console.log(response.data);
  return response.data;
});