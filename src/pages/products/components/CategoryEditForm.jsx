
import { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import InputField from "../../../components/InputField";
import { unitOptions } from "../constants/data";
import SelectField from "../../../components/SelectField";
const { Option } = Select;

const CategoryEditForm = ({ onModalClose, editCategoryData }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (editCategoryData) {
      reset({
        category: editCategoryData.category,
        unit: editCategoryData.unit,
      });
    }
  }, [editCategoryData]);

  const onSubmit = async (data) => {
    console.log(data);
    
  };

  return (
    <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        control={control}
        name="category"
        label="Kategoriya Nomi"
        placeholder="Masalan, Go'sht"
        type="text"
        rules={{
          required: "Kategoriya nomi maydoni talab qilinadi",
          minLength: {
            value: 2,
            message: "Kategoriya nomi kamida 2 ta belgidan iborat bo'lishi kerak",
          }
        }}
        error={errors?.category} 
      />

      <div className="mb-4">
      <SelectField
        control={control}
        name="unit"
        label="Miqdor Turi"
        placeholder="Miqdor turini tanlang"
        options={unitOptions}
        rules={{
          required: "Miqdor turi maydoni talab qilinadi",
        }}
        error={errors?.unit}
      />
      </div>

      <Button
        type="primary"
        htmlType="submit"
        className="w-full"
      >
        Saqlash
      </Button>
    </form>
  );
};

export default CategoryEditForm;