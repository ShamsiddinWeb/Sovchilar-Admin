import React, { useState } from "react";
import { Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import api from "../../../axios";
import { useStore } from "../../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

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
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    if (!phone || phone.length < 9) {
      toast.error("Telefon raqam noto'g'ri kiritildi");
      setLoading(false);
      return;
    }

    const newData = {
      phone: phone,
      password: data?.password,
    };

    try {
      const response = await api.post("auth/login", newData);

      const refreshToken = response?.data?.refreshToken;
      const accessToken = response?.data?.accessToken;

      if (accessToken && refreshToken) {
        setUser(accessToken, refreshToken);
        toast.success("Tizimga muvaffaqiyatli kirdingiz");
        navigate("/");
        reset();
        setPhone("");
      } else {
        toast.error("Tokenlar topilmadi");
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Telefon yoki parol noto'g'ri");
      } else {
        toast.error(error?.response?.data?.message || "Kirishda xatolik yuz berdi");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-[30px] font-bold flex justify-center text-red-600 mb-10">
          Sovchilar
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
                    {errors?.password?.message}
                  </p>
                )}
              </div>
            )}
          />

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Kirish
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
