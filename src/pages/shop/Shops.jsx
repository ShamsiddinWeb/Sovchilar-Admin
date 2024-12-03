import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'antd';
import ModalComponent from '../../components/Modal';
import InputField from '../../components/InputField';
import ShoppingTable from './components/ShoppingTable';

const Shops = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // React Hook Form
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset(); // Formni tozalash
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Ma'lumotlarni yuborish lozim bo'lgan joy
    setIsModalOpen(false);
    reset();
  };

  return (
    <div>
      <ModalComponent
        isOpen={isModalOpen}
        onOk={null} // Form ichida tugmalar ishlatilgani sababli bu joy bo'sh qoldiriladi
        onCancel={handleCancel}
        title="Magazin qo'shish"
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <InputField
            control={control}
            name="name"
            label="Magazin nomi"
            placeholder="Magazin nomini kiriting"
            type="text"
            rules={{ required: "Magazin nomi kiritilishi shart" }}
            error={errors.name}
          />
          <InputField
            control={control}
            name="address"
            label="Manzili"
            placeholder="Magazin manzilini kiriting"
            type="text"
            rules={{ required: "Magazin manzili kiritilishi shart" }}
            error={errors.address}
          />
          <InputField
            control={control}
            name="phone"
            label="Telefon"
            placeholder="Telefon raqamini kiriting"
            type="text"
            rules={{
              required: "Telefon raqami kiritilishi shart",
              pattern: {
                value: /^\+[0-9]{9,15}$/,
                message: "Iltimos, to'g'ri telefon raqamini kiriting",
              },
            }}
            error={errors.phone}
          />

          <div className="flex justify-end mt-4">
            <Button className="mr-2" onClick={handleCancel}>
              Bekor qilish
            </Button>
            <Button type="primary" htmlType="submit">
              Yuborish
            </Button>
          </div>
        </Form>
      </ModalComponent>

      <div className="flex justify-between items-center border-b pb-5 mb-5">
        <div>Magazinlar</div>
        <Button type="primary" onClick={showModal}>
          Magazin qo'shish
        </Button>
      </div>

      <ShoppingTable />
    </div>
  );
};

export default Shops;
