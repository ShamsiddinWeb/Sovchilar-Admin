import { Button } from "antd";
import React, { useState } from "react";
import ModalComponent from "../../components/Modal";
import EmpTable from "./Components/EmpTable";

const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const employeeData = [
    {
      id: 1,
      name: "Otabek",
      surname: "familya",
      salary: 240000,
      davomat: "Keldi",
    },
    {
      id: 2,
      name: "Asad",
      surname: "familya",
      salary: 250000,
      davomat: "Kelmadi",
    },
    {
      id: 3,
      name: "Dilshod",
      surname: "familya",
      salary: 260000,
      davomat: "Keldi",
    },
    {
      id: 4,
      name: "Akmal",
      surname: "familya",
      salary: 270000,
      davomat: "Kelmadi",
    },
    {
      id: 5,
      name: "Jasur",
      surname: "familya",
      salary: 280000,
      davomat: "Keldi",
    },
    {
      id: 6,
      name: "Shavkat",
      surname: "familya",
      salary: 290000,
      davomat: "Kelmadi",
    },
    {
      id: 7,
      name: "Ulugbek",
      surname: "familya",
      salary: 300000,
      davomat: "Keldi",
    },
    {
      id: 8,
      name: "Bunyod",
      surname: "familya",
      salary: 310000,
      davomat: "Kelmadi",
    },
  ];

  return (
    <div>
      <ModalComponent
        isOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Hodim qo'shish"
      >
        <form>
          <div>
            <label>Ism:</label>
            <input type="text" placeholder="Ism kiriting" />
          </div>
          <div>
            <label>Oylik daromadi:</label>
            <input type="number" placeholder="Daromad kiriting" />
          </div>
        </form>
      </ModalComponent>
      <div className="flex justify-between items-center p-4">
        <h2>Hodimlar ro'yhati</h2>
        <Button type="primary" onClick={showModal}>
          Yangi hodim qo'shish
        </Button>
      </div>
      <EmpTable dataSource={employeeData} />
    </div>
  );
};

export default Employees;
