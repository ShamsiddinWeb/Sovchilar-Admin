import React, { useEffect } from "react";
import { Button} from "antd";
import { useForm} from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../../../../../components/InputField";
import SingleDatePickerField from "../../../../../components/SingleDatePicker";
import { useParams } from "react-router-dom";
import api from "../../../../../../axios";

const AddSingleReadyProduct = ({ onModalClose, refetch }) => {
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
      quantity: +data?.quantity,
      conserveTypeId: id,
      createdAt: data?.createdAt
    }
    
    try {
      const response = await api.post("/api/ready-conserves", newData);

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
        name="quantity"
        label="Mahsulot miqdori"
        placeholder="Masalan, 200"
        type="number"
        rules={{
          required: "Mahsulot miqdori maydoni talab qilinadi",
        }}
        error={errors?.quantity} // Xatolikni ko'rsatish
      />

      {/* Miqdor turi maydoni */}
      <div className="mb-4">
      <SingleDatePickerField
        control={control}
        name="createdAt"
        label="Mahsulot keltirilgan sana"
        placeholder="Sanani tanlang"
        rules={{ required: "Sanani kiriting" }}
        error={errors?.createdAt}
      />
        
      </div>

      <Button type="primary" htmlType="submit" className="w-full">
        Saqlash
      </Button>
    </form>
  );
};

export default AddSingleReadyProduct;
