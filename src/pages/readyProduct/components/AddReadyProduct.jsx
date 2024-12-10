import React, { useEffect } from "react";
import { Button} from "antd";
import { useForm} from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../../../axios";
import InputField from "../../../components/InputField";

const AddReadyProduct = ({ onModalClose, refetch }) => {
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
      const newData = {
          price: +data?.price,
          conserveType: data?.conserveType
      }
      const response = await api.post("/api/conserve-type", newData);

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi!");
        onModalClose();
        reset();
        refetch()
      }
    } catch (error) {
      toast.error("Mahsulot qo'shishda xatolik yuz berdi!");
    }
  };

  return (
    <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
      {/* Kategoriya nomi maydoni */}
      <InputField
        control={control}
        name="conserveType"
        label="Mahsulot Nomi"
        placeholder="Masalan, Tushonka"
        type="text"
        rules={{
          required: "Mahsulot nomi maydoni talab qilinadi",
          minLength: {
            value: 2,
            message:
              "Mahsulot nomi kamida 2 ta belgidan iborat bo'lishi kerak",
          },
        }}
        error={errors?.conserveType} // Xatolikni ko'rsatish
      />

      {/* Miqdor turi maydoni */}
      

      <Button type="primary" htmlType="submit" className="w-full">
        Saqlash
      </Button>
    </form>
  );
};

export default AddReadyProduct;
