
import { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import InputField from "../../../components/InputField";
import { unitOptions } from "../constants/data";
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
      {/* Kategoriya nomi maydoni */}
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
        error={errors?.category} // Xatolikni ko'rsatish
      />

      {/* Miqdor turi maydoni */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Miqdor Turi</label>
        <Controller
          control={control}
          name="unit"
          rules={{
            required: "Miqdor turi maydoni talab qilinadi",
          }}
          render={({ field }) => (
            <Select
              {...field}
              className="w-full"
              placeholder="Miqdor turini tanlang"
              allowClear
            >
              {unitOptions?.map((option, i) => (
                <Option key={i} value={option?.value}>
                  {option?.label}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors?.unit && (
          <p className="text-red-500 text-sm mt-1">{errors?.unit?.message}</p>
        )}
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