import { useEffect} from "react";
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../../../axios";
import InputField from "../../../components/InputField";

const EditReadyProduct = ({ onModalClose, editReadyProductData, refetch }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (editReadyProductData) {
      reset({
        conserveType: editReadyProductData?.conserveType,
      });
    }
  }, [editReadyProductData]);

  const onSubmit = async (data) => {
    try {
      // API'ga ma'lumotlarni yuborish
      const response = await api.patch(`/api/conserve-type/${editReadyProductData?.id}`, data);
  
      if (response?.status === 200 || response?.status === 201) {
        toast.success("Mahsulot muvaffaqiyatli o'zgartirildi!");
        onModalClose();
        reset();
        refetch()
      }
    } catch (error) {
      toast.error("Mahsulotni o'zgartirishda xatolik yuz berdi!");
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


      <Button
        type="primary"
        htmlType="submit"
        className="w-full"
      >
        O'zgartirish
      </Button>
    </form>
  );
};

export default EditReadyProduct;