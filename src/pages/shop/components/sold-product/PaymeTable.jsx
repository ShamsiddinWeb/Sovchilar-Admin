import { Button, DatePicker, Form, Popconfirm, Table } from "antd";
import ModalComponent from "../../../../components/Modal";
import InputField from "../../../../components/InputField";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import CDatePicker from "../../../../components/CDatePicker";
import dayjs from "dayjs";

const PaymeTable = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [data, setData] = useState([
    { id: 1, payme: 5000, date: "2024-12-19T19:00:00.000Z" },
    { id: 2, payme: 50000, date: "2024-12-25T19:07:00.000Z" },
    { id: 3, payme: 15000, date: "2024-12-19T19:00:00.000Z" },
  ]);

  const handleEdit = (record) => {
    reset(record);
    setIsModalVisible(true);
  };

  const onEdit = (data) => {
    console.log("Tahrirlangan ma'lumot:", data);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    console.log("O'chirilgan ID:", id);
  };

  const columns = [
    {
      title: "№",
      key: "index",
      render: (_, __, ind) => ind + 1,
      width: "40px",
    },
    {
      title: "Tushumlar",
      key: "payme",
      dataIndex: "payme",
    },
    {
      title: "Vaqti",
      key: "date",
      dataIndex: "date",
      render: (date) => dayjs(date).format("DD-MM-YYYY HH:mm")
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "green" }} />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Mahsulotni o'chirish"
            description="Siz ushbu mahsulotni o'chirishga aminmisiz?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mt-10 mb-5 flex justify-between">
        <h2 className="font-medium text-[18px]">Qabul qilingan to'lovlar</h2>
        <Button type="primary">To'lov yaratish</Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowKey="id"
        bordered
      />

      <ModalComponent
        title="To'lovlarni tahrirlash"
        isOpen={isModalVisible}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleSubmit(onEdit)}>
          <InputField
            control={control}
            name="payme"
            label="To'lov miqdori"
            placeholder="50000..."
            type="number"
            rules={{ required: "Tolovni kiriting" }}
            error={errors.payme}
          />

          <CDatePicker name={"date"} control={control} rules={{required: "Vaqtni kiriting"}} error={errors.date}/>

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
    </div>
  );
};

export default PaymeTable;