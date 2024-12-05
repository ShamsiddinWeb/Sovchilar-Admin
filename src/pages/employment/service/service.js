import axios from "axios";


export const getEmployees = async () => {
  const response = await axios.get("api/users/employee");
  return response.data;
};

export const addEmployee = async (data) => {
  const response = await axios.post("api/auth/employee/sign-up", data);
  return response.data;
};

export const editEmployee = async (id, data) => {
  const response = await axios.put(`api/users/${id}`, data);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await axios.delete(`api/users/${id}`);
  return response.data;
};

