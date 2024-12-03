import React, { useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import "antd/dist/reset.css"; // Ant Design CSS qo'shilganiga ishonch hosil qiling
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ModalComponent from "../../../components/Modal";

const MyTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal oynasining holatini boshqarish
  const [selectedRecord, setSelectedRecord] = useState(null); // Tanlangan yozuvni saqlash

  const handleEdit = (record) => {
    setSelectedRecord(record); // Tanlangan yozuvni saqlash
    setIsModalVisible(true); // Modal oynasini ochish
  };
  const handleCancel = () => {
    setIsModalVisible(false); // Modal oynasini yopish
  };

  const handleSave = () => {
    // Bu yerda yozuvni saqlash jarayoni bo'lishi mumkin
    setIsModalVisible(false); // Modalni yopish
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
      title: "Ism",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Yosh",
      dataIndex: "age",
      key: "age",
      render: (age) =>
        age > 24 ? (
          <span style={{ color: "green" }}>{age}</span>
        ) : (
          <span style={{ color: "red" }}>{age}</span>
        ),
    },
    {
      title: "Manzil",
      dataIndex: "address",
      key: "address",
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
      key: "1",
      id: 1,
      name: "Otabek",
      age: 24,
      address: "Toshkent, O'zbekiston",
    },
    {
      key: "2",
      id: 2,
      name: "Lena",
      age: 23,
      address: "Andijon, O'zbekiston",
    },
    {
      key: "3",
      id: 3,
      name: "Akmal",
      age: 25,
      address: "Samarqand, O'zbekiston",
    },
    {
      key: "4",
      id: 4,
      name: "Akmal",
      age: 25,
      address: "Samarqand, O'zbekiston",
    },
    {
      key: "5",
      id: 5,
      name: "Akmal",
      age: 25,
      address: "Samarqand, O'zbekiston",
    },
    {
      key: "6",
      id: 6,
      name: "Akmal",
      age: 25,
      address: "Samarqand, O'zbekiston",
    },
    {
      key: "7",
      id: 7,
      name: "Akmal",
      age: 25,
      address: "Samarqand, O'zbekiston",
    },
  ];

  return (
    <div style={{ margin: "20px", overflow: "auto" }}>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} onRow={(record) => ({
          onClick: (event) => {
            if (!event.target.closest("button")) {
              console.log(record); 
            }
          },
        })}/>
      <ModalComponent
        title="Mahsulotni tahrirlash"
        isOpen={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <span className="border-r p-1">{selectedRecord?.id}</span>
        <span className="border-r p-1">{selectedRecord?.name}</span>
        <span className="border-r p-1">{selectedRecord?.age}</span>
        <span className="border-r p-1">{selectedRecord?.address}</span>
      </ModalComponent>
    </div>
  );
};

export default MyTable;
