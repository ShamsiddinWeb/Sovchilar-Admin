import api from "../../../../axios";

const EmployeeService = {
  getAll: async () => {
    const response = await api.get("/api/users/employee");
    return response?.data?.data || [];
  },
  post: async (data) => {
    const response = await api.post("/api/auth/employee/sign-up", data);
    return response?.data;
  },
  patch: async (id, data) => {
    const response = await api.put(`/api/users/${id}`, data);
    return response?.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/api/users/${id}`);
    return response?.data;
  },
  attendancePost: async (data) => {
    const response = await api.post("/api/attendance", data);
    return response;
  },
  attendanceGet: async (data) => {
    const response = await api.get("/api/attendance");
    return response;
  },
};

export default EmployeeService;
