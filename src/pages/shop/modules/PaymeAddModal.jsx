import { Button, Form } from "antd";
import ModalComponent from "../../../components/Modal";
import InputField from "../../../components/InputField";
import ControlledDatePicker from "../../../components/CDatePicker";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PaymeAddModal = ({isModalVisible, handleCancel, addPaymeShop}) => {

    // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();


  useEffect(() => {
    reset()
  }, [])

  return (
    <ModalComponent
      title="To'lovlarni tahrirlash"
      isOpen={isModalVisible}
      onCancel={handleCancel}
    >
      <Form layout="vertical" onFinish={handleSubmit(addPaymeShop)}>
        <InputField
          control={control}
          name="payme"
          label="To'lov miqdori"
          placeholder="50000..."
          type="number"
          rules={{ required: "Tolovni kiriting" }}
          error={errors.payme}
        />

        <ControlledDatePicker
          name={"date"}
          control={control}
          rules={{ required: "Vaqtni kiriting" }}
          error={errors.date}
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
  );
};

export default PaymeAddModal;
