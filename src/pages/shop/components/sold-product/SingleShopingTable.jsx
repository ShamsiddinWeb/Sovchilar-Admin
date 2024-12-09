import { Button, Form, Popconfirm, Table } from "antd";
import ModalComponent from "../../../../components/Modal";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/InputField";
import SelectField from "../../../../components/SelectField";
import ControlledDatePicker from "../../../../components/CDatePicker";
import SingleDatePickerField from "../../../../components/SingleDatePicker";
import dayjs from "dayjs";

const SoldProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const openModal = (record) => {
    if (record) {
      setTypeModal("Tahrirlash");
      reset(record);
    } else {
      setTypeModal("Qo'shish");
      reset({
        payme: "",
        date: null,
      });
    }
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
    },
    {
      title: "Mahsulot nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Soni",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Narxi (so'm)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Jami (so'm)",
      key: "totalPrice",
      render: (_, record) => record?.count * record?.price,
    },
    {
      title: "Topshirilgan vaqti",
      // dataIndex: "date",
      render: (_, render) => dayjs(render?.date).format("YYYY-MM-DD HH:MM"),
      key: "date",
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "green" }} />}
            onClick={() => {
              openModal(record);
            }}
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
    <>
      <div className="mt-10 mb-5 flex justify-between">
        <h2 className="font-medium text-[18px] mb-5">
          Yetkazilgan mahsulotlar
        </h2>
        <Button type="primary" onClick={() => openModal(undefined)}>
          Mahsulot qo'shish
        </Button>
      </div>
      <Table
        columns={columns}
        bordered
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
      <ModalComponent
        title={typeModal}
        isOpen={isModalVisible}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleSubmit(onEdit)}>
          <SelectField
            control={control}
            name="name"
            options={[
              {
                label: "Jiz",
                value: "jiz",
              },
              {
                label: "Tushonka",
                value: "tushonka",
              },
            ]}
            label="Mahsulot turi"
            placeholder="Mahsulot turini tanlang"
            type="text"
            rules={{ required: "Mahsulot turini shart" }}
            error={errors?.name}
          />
          <InputField
            control={control}
            name="count"
            label="Mahsulot soni"
            placeholder="Mahsulot sonini kiriting"
            type="number"
            rules={{ required: "Mahsulot sonini kiriting" }}
            error={errors?.count}
          />
          <InputField
            control={control}
            name="price"
            label="Narxi"
            placeholder="Mahsulot narxini kiriting"
            type="number"
            rules={{
              required: "Mahsulot narxini kiriting",
            }}
            error={errors?.price}
          />
          <SingleDatePickerField
            control={control}
            label={"Topshirish vaqtini tanlang"}
            name={"date"}
            placeholder={"Vaqtni tanlang"}
            rules={{ required: "Topshirish vaqtini tanlang" }}
            error={errors?.date}
          />

          <div className="flex justify-end mt-4">
            <Button type="primary" htmlType="submit">
              Yuborish
            </Button>
          </div>
        </Form>
      </ModalComponent>
    </>
  );
};

export default SoldProduct;

const data = [
  {
    name: "Jiz",
    count: 5,
    price: "5000",
    date: "2024-11-30T19:00:00.000Z",
  },
  {
    name: "Qozon kabob",
    count: 5,
    price: "5000",
    date: "2024-11-30T19:00:00.000Z",
  },
  {
    name: "Jiz",
    count: 5,
    price: "5000",
    date: "2024-11-30T19:00:00.000Z",
  },
  {
    name: "Til",
    count: 5,
    price: "5000",
    date: "2024-11-30T19:00:00.000Z",
  },
  {
    name: "Tushonka",
    count: 5,
    price: "5000",
    date: "2024-11-30T19:00:00.000Z",
  },
  {
    name: "Til",
    count: 5,
    price: "5000",
    date: "2024-11-30T19:00:00.000Z",
  },
];
