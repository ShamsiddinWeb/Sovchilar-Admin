import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
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
  const { id } = useParams();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    reset();
  }, [onModalClose, reset]);

  const onSubmit = (data) => {
    setFormData({
      quantity: +data?.quantity,
      conserveTypeId: id,
      createdAt: data?.createdAt,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const response = await api.post("/api/ready-conserves", formData);

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Mahsulot muvaffaqiyatli qo'shildi!");
        onModalClose();
        reset();
        refetch();
      }
    } catch (error) {
      toast.error("Mahsulot qo'shishda xatolik yuz berdi!");
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          control={control}
          name="quantity"
          label="Mahsulot miqdori"
          placeholder="Masalan, 200"
          type="number"
          rules={{
            required: "Mahsulot miqdori maydoni talab qilinadi",
          }}
          error={errors?.quantity}
        />

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

      {/* Tasdiqlash modal */}
      <Modal
        title="Tasdiqlash"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Ha, saqlash"
        cancelText="Bekor qilish"
      >
        <div className="flex flex-col text-[16px] gap-0 mt-5">
          <p>Formadagi ma'lumotlarni saqlashga ishonchingiz komilmi?</p>
          <p>Miqdori: {formData?.quantity}</p>
          <p>Sana: {formData?.createdAt}</p>
        </div>
      </Modal>
    </>
  );
};

export default AddSingleReadyProduct;
