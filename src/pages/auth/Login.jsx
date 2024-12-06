import React from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import api from "../../../axios";
import { useStore } from "../../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();
  const {setUser} = useStore()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    
    const newData = {
      phoneNumber: "+998" + data?.login,
      password: data?.password,
    };
   
    try {
      const response = await api.post("api/auth/sign-in", newData);
      const refreshToken = response?.data?.data?.tokens?.refresh_token;
      const accessToken = response?.data?.data?.tokens?.access_token;
      const userData = response?.data?.data?.data

      setUser(userData, accessToken, refreshToken);
      navigate('/')
      
      toast.success("Tizimga muofaqiyatli kirdingiz");
      reset();
    } catch (error) {
      
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Login maydoni */}
          <InputField
            control={control}
            name="login"
            label="Login"
            placeholder="Foydalanuvchi nomi"
            type="text"
            rules={{
              required: "Login maydoni talab qilinadi",
              minLength: {
                value: 3,
                message: "Login kamida 3 ta belgidan iborat bo'lishi kerak",
              }
            }}
            error={errors.login} // Xatolikni ko'rsatish
          />

          {/* Parol maydoni */}
          <InputField
            control={control}
            name="password"
            label="Parol"
            placeholder="********"
            type="password"
            rules={{
              required: "Parol maydoni talab qilinadi",
              minLength: {
                value: 6,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
              }
            }}
            error={errors.password} // Xatolikni ko'rsatish
          />

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Kirish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;