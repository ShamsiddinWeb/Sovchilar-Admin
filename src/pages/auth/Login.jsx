import React from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";

const Login = () => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    // API chaqiruvi yoki boshqa mantiq
    console.log(data);
    reset(); // Formani tozalash
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
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;