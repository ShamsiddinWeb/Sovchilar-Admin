import axios from "axios";
const REACT_APP_BASE_URL = "https://aqvo.limsa.uz/";


const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

export default api;