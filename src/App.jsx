import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/Layout";
import Login from "./pages/auth/Login";
import Error404 from "./pages/error404/Error404";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useStore } from "./store/store";
import api from "../axios";
import { useEffect } from "react";
import NewLead from "./pages/newLead/NewLead";
import Created from "./pages/created/Created";
import Married from "./pages/married/Married";
import Single from "./pages/single/Single";
// import SingleLead from "./pages/newLead/components/singleLead/SingleLead";
// import SingleCreated from "./pages/created/components/singleCreated/SingleCreated";
// import UserDetails from "./pages/created/components/singleCreated/SingleCreated";

function App() {
  const {accessToken, clearUser} = useStore()
  const navigate = useNavigate();

  const token = async (token) => {
    try {
      const response = await api.post(`auth/verify`, {
        accessToken: token
      });
      
      if (!response?.data) {
        navigate("/login");
        clearUser();
      } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      token(accessToken);
    } else {
      navigate("/login");
    }
  }, [accessToken]);
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<NewLead />} />
          {/* <Route path="/lead/:id" element={<SingleLead />} /> */}
          <Route path="/users-uz/:id" element={<Single />} />
          <Route path="/created" element={<Created />} />
          {/* <Route path="/created/:id" element={<UserDetails />} /> */}
          <Route path="/married" element={<Married />} />
          <Route path="/*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
