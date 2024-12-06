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

const ShoppingTable = () => {
  const navigate = useNavigate();
  // React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEdit = (record) => {
    reset(record);
    console.log(record);
    setIsModalVisible(true); // Modal oynasini ochish
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Modal oynasini yopish
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <Link to={`/shops/${record?.id}`} className="text-blue-500 underline">
          {record?.name}
        </Link>
      ),
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

  const data = [
    {
      id: 1,
      name: "Halol",
      phone: "+998 (99) 999-99-99",
      address: "Oqtepa lavash markazidan 100 metr oldin",
    },
    {
      id: 2,
      name: "Andalus",
      phone: "+998 (77) 77-77-77",
      address: "Oqtepa lavash markazidan 100 metr keyin",
    },
    {
      id: 3,
      name: "Shirin",
      phone: "+998 (00) 000-00-00",
      address: "Adashib qoldim",
    },
  ];

  return (
    <div style={{ margin: "20px", overflow: "auto" }}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
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
