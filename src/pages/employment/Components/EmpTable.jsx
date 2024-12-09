import React, { useState } from "react";
import { Table, Button, Popconfirm, Switch } from "antd";
import "antd/dist/reset.css";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ModalComponent from "../../../components/Modal";
import EmployeeForm from "../Components/Form/EmployeeForm"; // Assuming EmployeeForm is located in the same directory
import useDeleteEmployee from "../hooks/useDeleteEmployee";
import useAttendance from "../hooks/useAttendance"; // Importing the useAttendance hook

const EmpTable = ({ dataSource, fetchEmployees, loading }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRowClickModalVisible, setIsRowClickModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // Track pagination

  const { deleteEmployee, isLoading: isDeleteLoading } = useDeleteEmployee();
  const { addAttendance, isLoading: isAttendanceLoading } = useAttendance(); // Use the attendance hook

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

  const handleDelete = async (id) => {
    console.log(`Deleted employee with ID: ${id}`);
    await deleteEmployee?.(id);
    fetchEmployees();
  };

  const handleTableChange = (paginationInfo) => {
    setPagination(paginationInfo); // Update pagination state
  };

  const handleAttendanceSubmit = async () => {
    const data = {
      userId: selectedRecord.id,
      isCame: !selectedRecord.isCame ? false : true, // Toggle attendance
    };

    await addAttendance(data);
    fetchEmployees(); // Refresh employee data after attendance submission
    setIsRowClickModalVisible(false); // Close the modal
  };

  const columns = [
    {
      title: "No",
      key: "index",
      render: (_, __, index) => {
        const currentPage = pagination.current || 1;
        const pageSize = pagination.pageSize || 10;
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "Ism",
      dataIndex: "firstName",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Telefon raqami",
      dataIndex: "phoneNumber",
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
            onConfirm={() => handleDelete(record?.id)}
            onPopupClick={(e) => e.stopPropagation()}
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              onClick={(e) => e.stopPropagation()}
              loading={isDeleteLoading}
            />
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
        loading={loading}
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
          current: pagination.current,
          total: dataSource.length,
        }}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        onChange={handleTableChange} // Listen to pagination changes
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
            editEmployeeData={selectedRecord}
            handleCancel={handleCancel}
            requestType={"edit"}
            fetchEmployees={fetchEmployees}
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
            <p>Ism: {selectedRecord?.firstName}</p>
            <p>Familya: {selectedRecord?.lastName}</p>
            <p>Telefon: {selectedRecord?.phoneNumber}</p>
            <p>Oylik daromadi: {selectedRecord?.salary}</p>
            <p>Lavozimi: {selectedRecord?.position}</p>
            <p>Ish boshlagan vaqti: {selectedRecord?.startedWorkingAt}</p>

            <div className="flex justify-between">
              <p>
                Kelganmi:{"   "}
                <Switch
                  className="ml-2"
                  checked={selectedRecord?.isCame}
                  onChange={(checked) => {
                    setSelectedRecord((prevState) => ({
                      ...prevState,
                      isCame: checked,
                    }));
                  }}
                  checkedChildren="Ha"
                  unCheckedChildren="Yo'q"
                  style={{
                    backgroundColor: selectedRecord?.isCame ? "#25C481" : "red",
                  }}
                />
              </p>
              <Button
                type="primary"
                onClick={handleAttendanceSubmit}
                loading={isAttendanceLoading}
              >
                Saqlash
              </Button>
            </div>
          </div>
        )}
      </ModalComponent>
    </div>
  );
};

export default EmpTable;
