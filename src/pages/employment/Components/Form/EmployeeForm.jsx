import { useEffect, useState } from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/InputField";
import useAddEmployee from "../../hooks/useAddEmployee";
import useEditEmployee from "../../hooks/useEditEmployee";

const EmployeeForm = ({
  handleCancel,
  editEmployeeData,
  fetchEmployees,
  requestType,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { addNewEmployee, isLoading: isAddLoading } = useAddEmployee();
  const { editEmployee, isLoading: isEditLoading } = useEditEmployee();

  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (editEmployeeData) {
      console.log(editEmployeeData);
      
      
      const formattedData = {
        ...editEmployeeData,
        salary: Number(editEmployeeData.salary),
      };
      setInitialValues(formattedData);
      reset(formattedData); // Populate the form with existing data
    } else {
      setInitialValues({}); // Clear initial values
      reset(); // Reset the form for add mode
    }
  }, [editEmployeeData, reset]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        salary: Number(data.salary),
      };

      if (editEmployeeData) {
        await editEmployee?.(editEmployeeData.id, formattedData);
      } else {
        await addNewEmployee?.(formattedData);
      }
      fetchEmployees();
      handleCancel();
    } catch (error) {
    }
  };

  const isLoading = isAddLoading || isEditLoading;

  return (
    <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        control={control}
        name="firstName"
        label="Ism"
        placeholder="Hodim ismini kiriting"
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
        placeholder="Hodim familiyasini kiriting"
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

      <Button
        type="primary"
        htmlType="submit"
        className="w-full"
        loading={isLoading}
      >
        {editEmployeeData ? "Tahrirlash" : "Qo'shish"}
      </Button>
    </form>
  );
};

export default EmployeeForm;
