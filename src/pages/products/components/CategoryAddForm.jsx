import React, { useEffect } from "react";
import { Button} from "antd";
import { useForm} from "react-hook-form";
import InputField from "../../../components/InputField";
import { unitOptions } from "../constants/data";
import SelectField from "../../../components/SelectField";
import { toast } from "react-toastify";
import api from "../../../../axios";

const CategoryAddForm = ({ onModalClose, refetch }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, [onModalClose]);

  const onSubmit = async (data) => {
    try {
      // API'ga ma'lumotlarni yuborish
      const response = await api.post("/api/categories", data);

      if (response?.statusText == "OK" || response?.status === 200 || response?.status === 201) {
        toast.success("Kategoriya muvaffaqiyatli qo'shildi!");
        onModalClose();
        reset();
        refetch()
      }
    } catch (error) {
      toast.error("Kategoriya qo'shishda xatolik yuz berdi!");
    }
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
            message:
              "Kategoriya nomi kamida 2 ta belgidan iborat bo'lishi kerak",
          },
        }}
        error={errors?.category} // Xatolikni ko'rsatish
      />

      {/* Miqdor turi maydoni */}
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

      <Button type="primary" htmlType="submit" className="w-full">
        Saqlash
      </Button>
    </form>
  );
};

export default CategoryAddForm;
