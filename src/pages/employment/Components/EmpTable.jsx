import React, { useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import "antd/dist/reset.css"; // Ant Design CSS qo'shilganiga ishonch hosil qiling
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ModalComponent from "../../../components/Modal";

const EmpTable = ({ dataSource }) => {
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [selectedRecord, setSelectedRecord] = useState(null); 
  
    const handleEdit = (record) => {
      setSelectedRecord(record); 
      setIsModalVisible(true); 
    };
  
    const handleCancel = () => {
      setIsModalVisible(false); 
    };
  
    const handleSave = () => {
      // Placeholder for saving logic
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
        title: "Familyasi",
        dataIndex: "surname",
        key: "surname",
        render: (text) => <strong>{text}</strong>,
      },
      {
        title: "Telefon",
        dataIndex: "phone",
        key: "phone"
      },
      {
        title: "Oylik daromadi",
        dataIndex: "salary",
        key: "salary",
        render: (salary) => <span>{salary}</span>,
      },
      {
        title: "Davomat",
        dataIndex: "davomat",
        key: "davomat",
        render: (davomat) => <strong>{davomat}</strong>,
      },
      {
        title: "Boshlangan sana",
        dataIndex: "startDate",
        key: "startDate",
        render: (startDate) => <span>{startDate.toLocaleDateString()}</span>,
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
              title="Hodimni o'chirish"
              description="Siz ushbu hodimni o'chirishga aminmisiz?"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="link" icon={<DeleteOutlined style={{ color: "red" }} />} />
            </Popconfirm>
          </div>
        ),
      },
    ];
  
    return (
      <div style={{ margin: "20px", overflow: "auto" }}>
        <Table
        bordered
          columns={columns}
          dataSource={dataSource} 
          pagination={{ pageSize: 5 }}
          rowKey={(record) => record.id} 
        />
        <ModalComponent
          title="Hodimni tahrirlash"
          isOpen={isModalVisible}
          onOk={handleSave}
          onCancel={handleCancel}
        >
          {selectedRecord && (
            <div>
              <p>ID: {selectedRecord.id}</p>
              <p>Ism: {selectedRecord.name}</p>
              <p>Familya: {selectedRecord.surname}</p>
              <p>Oylik daromadi: {selectedRecord.salary}</p>
              <p>Davomat: {selectedRecord.davomat}</p>
            </div>
          )}
        </ModalComponent>
      </div>
    );
  };
  
  export default EmpTable;
  