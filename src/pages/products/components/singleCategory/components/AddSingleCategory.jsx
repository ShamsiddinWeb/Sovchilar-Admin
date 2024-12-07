import React, { useEffect } from "react";
import { Button} from "antd";
import { useForm} from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../../../../../components/InputField";
import api from "../../../../../../axios";
import SingleDatePickerField from "../../../../../components/SingleDatePicker";
import { useParams } from "react-router-dom";
import { formatday } from "../../../../../utils/dateUtils";

const AddSingleCategory = ({ onModalClose, refetch }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {id} = useParams()

  useEffect(() => {
    reset();
  }, [onModalClose]);

  const onSubmit = async (data) => {
    
    const newData = {
      price: +data?.price,
      quantity: +data?.quantity,
      createdAt: data?.createdAt,
      categoryId: id
    }
    
    try {
      // API'ga ma'lumotlarni yuborish
      const response = await api.post("/api/products", newData);
      console.log(response);
      

      if (response?.statusText == "OK" || response?.status === 200 || response?.status === 201) {
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
        name="price"
        label="Mahsulot Narxi"
        placeholder="Masalan, 20000"
        type="number"
        rules={{
          required: "Mahsulot narxini kiriting"
        }}
        error={errors?.price} // Xatolikni ko'rsatish
      />

      {/* Miqdor turi maydoni */}
      <div className="mb-4">
     
      <InputField
        control={control}
        name="quantity"
        label="Mahsulot soni"
        placeholder="mahsulot soni"
        type="number"
        rules={{
          required: "Mahsulot sonini kiriting",
        }}
        error={errors?.quantity} // Xatolikni ko'rsatish
      />
      </div>
      <SingleDatePickerField
        control={control}
        name="createdAt"
        label="Mahsulot keltirilgan sana"
        placeholder="Sanani tanlang"
        rules={{ required: "Sanani kiriting" }}
        error={errors?.createdAt}
      />

      <Button type="primary" htmlType="submit" className="w-full">
        Saqlash
      </Button>
    </form>
  );
};

export default AddSingleCategory;
