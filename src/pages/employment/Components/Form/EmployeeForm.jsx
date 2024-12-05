import { useEffect } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/InputField";

const EmployeeForm = ({ onModalClose, editEmployeeData, isEdit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Prefill form data when editing
  useEffect(() => {
    if (editEmployeeData) {
      reset(editEmployeeData);
    } else {
      reset(); // Clear form for add mode
    }
  }, [editEmployeeData, reset]);

  const onSubmit = async (data) => {
    if (isEdit) {
      // Logic for editing an employee
      console.log("Edit Employee Data:", data); // Replace with API call
    } else {
      // Logic for adding a new employee
      console.log("Add New Employee Data:", data); // Replace with API call
    }
    onModalClose(); // Close modal after submit
  };

  return (
    <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        control={control}
        name="firstName"
        label="Ism"
        placeholder="Ismingizni kiriting"
        type="text"
        rules={{
          required: "Ism majburiy maydon",
          minLength: {
            value: 2,
            message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak",
          },
        }}
        error={errors?.firstName}
      />

      <InputField
        control={control}
        name="lastName"
        label="Familiya"
        placeholder="Familiyangizni kiriting"
        type="text"
        rules={{
          required: "Familiya majburiy maydon",
          minLength: {
            value: 2,
            message: "Familiya kamida 2 ta belgidan iborat bo'lishi kerak",
          },
        }}
        error={errors?.lastName}
      />

      {/* Password field only shown in Add mode */}
      {!isEdit && (
        <InputField
          control={control}
          name="password"
          label="Parol"
          placeholder="Parol kiriting"
          type="password"
          rules={{
            required: "Parol majburiy maydon",
            minLength: {
              value: 6,
              message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
              message: "Parol harflar va raqamlarni o'z ichiga olishi kerak",
            },
          }}
          error={errors?.password}
        />
      )}

      <InputField
        control={control}
        name="phoneNumber"
        label="Telefon raqami"
        placeholder="Telefon raqamini kiriting"
        type="tel"
        rules={{
          required: "Telefon raqami majburiy maydon",
          pattern: {
            value: /^\+998\d{9}$/,
            message: "Telefon raqami +998901234567 formatida bo'lishi kerak",
          },
        }}
        error={errors?.phoneNumber}
      />

      <InputField
        control={control}
        name="position"
        label="Lavozim"
        placeholder="Lavozim kiriting"
        type="text"
        rules={{
          required: "Lavozim majburiy maydon",
          minLength: {
            value: 2,
            message: "Lavozim kamida 2 ta belgidan iborat bo'lishi kerak",
          },
        }}
        error={errors?.position}
      />

      <InputField
        control={control}
        name="salary"
        label="Oylik"
        placeholder="Oylik kiriting"
        type="number"
        rules={{
          required: "Oylik majburiy maydon",
          min: {
            value: 0,
            message: "Oylik musbat son bo'lishi kerak",
          },
        }}
        error={errors?.salary}
      />

      <InputField
        control={control}
        name="startedWorkingAt"
        label="Ish boshlanish sanasi"
        placeholder="Ish boshlanish sanasini kiriting"
        type="date"
        rules={{
          required: "Ish boshlanish sanasi majburiy maydon",
        }}
        error={errors?.startedWorkingAt}
      />

      <Button type="primary" htmlType="submit" className="w-full">
        {isEdit ? "Tahrirlash" : "Qo'shish"}
      </Button>
    </form>
  );
};

export default EmployeeForm;
