import { Button, Form, Popconfirm, Table } from "antd";
import "antd/dist/reset.css"; // Ant Design CSS qo'shilganiga ishonch hosil qiling
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalComponent from "../../../components/Modal";
import InputField from "../../../components/InputField";
import { useForm } from "react-hook-form";

const ShoppingTable = ({loading, data, editData, deleteData}) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = (record) => {
    reset(record);
    setIsModalVisible(true); 

    const newData = {
      address: record?.address,
      name: record?.name,
      phone: record?.phone
    }

    editData(record?.id, newData)
  };

  const handleCancel = () => {
    setIsModalVisible(false); 
  };

  const handleDelete = (id) => {
    deleteData(id)
  };

  const columns = [
    {
      title: "№",
      render: (_, __, ind) => ind + 1,
      key: "index",
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
      render: (_, record) => record?.name
    },
    {
      title: "Manzili",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
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
          ></Button>

          <Popconfirm
            title="Mahsulotni o'chirish"
            description="Siz ushbu mahsulotni o'chirishga aminmisiz?"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
            onConfirm={() => handleDelete(record?.id)}
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            ></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: "20px", overflow: "auto" }}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        loading={loading}
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          style: { cursor: 'pointer' },
          onClick: (event) => {
            if (!event.target.closest("button")) {
              navigate(`/shops/${record?.id}`);
            }
          },
        })}
      />

      <ModalComponent
        title="Mahsulotni tahrirlash"
        isOpen={isModalVisible}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleSubmit(handleEdit)}>
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
    </div>
  );
};

export default ShoppingTable;
