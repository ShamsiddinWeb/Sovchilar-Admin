import React, { useState, useEffect, useCallback } from "react";
import { Button, Spin, Empty } from "antd";
import ModalComponent from "../../components/Modal";
import EmpTable from "./Components/EmpTable";
import { useEmployees } from "./hooks/useGetEmployees";
import EmployeeForm from "./Components/Form/EmployeeForm";
import Attendance from "./Components/Attendance";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const {
    getEmployees: getEmployeesOrDefault = () => Promise.resolve([]),
    isLoading,
  } = useEmployees();
  const navigate = useNavigate();

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

  return (
    <div>
      <ModalComponent
        isOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Hodim qo'shish"
      >
        <EmployeeForm
          onModalClose={isModalOpen}
          handleCancel={handleCancel}
          requestType={"add"}
          fetchEmployees={fetchEmployees}
        />
      </ModalComponent>
      <div className="flex justify-between items-center p-4">
        <h2>Hodimlar ro'yhati</h2>
        <div className="flex gap-4">
          <Button
            type="primary"
            onClick={() => navigate("/employees/attendance")}
          >
            Davomatga o'tish
          </Button>
          <Button type="primary" onClick={showModal}>
            Yangi hodim qo'shish
          </Button>
        </div>
      </div>

      <EmpTable
        dataSource={employees}
        fetchEmployees={fetchEmployees}
        loading={isLoading}
      />
    </div>
  );
};

export default Employees;
