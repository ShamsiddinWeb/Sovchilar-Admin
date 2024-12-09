import React, { useState } from "react";
import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import api from "../../../axios";
import { useStore } from "../../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import logo from "../../assets/logo.png";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setUser } = useStore();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");

  const onSubmit = async (data) => {
    const newData = {
      phoneNumber: phone,
      password: data?.password,
    };

    try {
      const response = await api.post("api/auth/sign-in", newData);
      const refreshToken = response?.data?.data?.tokens?.refresh_token;
      const accessToken = response?.data?.data?.tokens?.access_token;
      const userData = response?.data?.data?.data;

      setUser(userData, accessToken, refreshToken);
      navigate("/");

      toast.success("Tizimga muofaqiyatli kirdingiz");
      reset();
      setPhone("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold flex justify-center text-gray-700 mb-10 " >
          <img className="w-[130px] h-auto" src={logo} alt="aqvo logo" />
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Telefon raqami</label>
            <PhoneInput
              placeholder="99 999 99 99"
              className="phone-input w-full py-2 px-3 border border-gray-300 rounded-md text-sm"
              value={phone}
              onChange={setPhone}
              limitMaxLength
              defaultCountry="UZ"
            />
          </div>

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Parol maydoni talab qilinadi",
              minLength: {
                value: 6,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
              },
            }}
            render={({ field }) => (
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Parol</label>
                <Input.Password {...field} placeholder="********" />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button type="primary" htmlType="submit" className="w-full">
            Kirish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
