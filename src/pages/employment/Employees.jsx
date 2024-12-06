import React, { useState, useEffect, useCallback } from "react";
import { Button, Spin, Empty } from "antd";
import ModalComponent from "../../components/Modal";
import EmpTable from "./Components/EmpTable";
import { useEmployees } from "./hooks/useGetEmployees";
import EmployeeForm from "./Components/Form/EmployeeForm";

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const { getEmployees: getEmployeesOrDefault = () => Promise.resolve([]), isLoading } = useEmployees();

  const fetchEmployees = useCallback(async () => {
    const fetchedEmployees = await getEmployeesOrDefault();
    setEmployees(fetchedEmployees ?? []);
  }, [getEmployeesOrDefault]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);
  const handleSave = (data) => {
    console.log(data);
  };

  return (
    <div>
      <ModalComponent
        isOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Hodim qo'shish"
      >
        <EmployeeForm
            onSubmit={handleSave}
            onCancel={handleCancel}
            requestType={"add"}
            fetchEmployees={fetchEmployees}
          />
      </ModalComponent>
      <div className="flex justify-between items-center p-4">
        <h2>Hodimlar ro'yhati</h2>
        <Button type="primary" onClick={showModal}>
          Yangi hodim qo'shish
        </Button>
      </div>
      {isLoading ? (
        <Spin tip="Yuklanmoqda...">
          <EmpTable dataSource={employees} />
        </Spin>
      ) : employees.length === 0 ? (
        <Empty description="Hodimlar mavjud emas" />
      ) : (
        <EmpTable dataSource={employees} fetchEmployees={fetchEmployees} />
      )}
    </div>
  );
};

export default Employees;

