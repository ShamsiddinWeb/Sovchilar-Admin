import React, { useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import "antd/dist/reset.css";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ModalComponent from "../../../components/Modal";
import EmployeeForm from "../Components/Form/EmployeeForm"; // Assuming EmployeeForm is located in the same directory

const EmpTable = ({ dataSource }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRowClickModalVisible, setIsRowClickModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleRowClick = (record) => {
    setSelectedRecord(record);
    setIsRowClickModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsRowClickModalVisible(false);
  };

  const handleSave = (updatedData) => {
    console.log("Updated Employee Data:", updatedData);
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    console.log(`Deleted employee with ID: ${id}`);
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
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Oylik daromadi",
      dataIndex: "salary",
      key: "salary",
      render: (salary) => <span>{salary}</span>,
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "green" }} />}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(record);
            }}
          />
          <Popconfirm
            title="Hodimni o'chirish"
            description="Siz ushbu hodimni o'chirishga aminmisiz?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record.id)}
            onPopupClick={(e) => e.stopPropagation()}
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={(e) => e.stopPropagation()}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: "20px", overflow: "auto" }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName={() => "clickable-row"}
      />

      {/* Edit Modal */}
      <ModalComponent
        title="Hodimni tahrirlash"
        isOpen={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        {selectedRecord && (
          <EmployeeForm
            initialValues={selectedRecord}
            onSubmit={handleSave}
            onCancel={handleCancel}
          />
        )}
      </ModalComponent>

      {/* Row Click Modal */}
      <ModalComponent
        title="Hodim ma'lumotlari"
        isOpen={isRowClickModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        {selectedRecord && (
          <div>
            <p>ID: {selectedRecord.id}</p>
            <p>Ism: {selectedRecord.name}</p>
            <p>Familya: {selectedRecord.surname}</p>
            <p>Telefon: {selectedRecord.phone}</p>
            <p>Oylik daromadi: {selectedRecord.salary}</p>
            <p>Davomat: {selectedRecord.davomat || "N/A"}</p>
            <p>
              Ish boshlagan vaqti:{" "}
              {selectedRecord.startDate
                ? new Date(selectedRecord.startDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        )}
      </ModalComponent>
    </div>
  );
};

export default EmpTable;


