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
      phone: "+998 (99) 999-99-99",
      salary: 240000,
      davomat: "Keldi",
      startDate: new Date(2022, 0, 1),
    },
    {
      id: 2,
      name: "Asad",
      surname: "familya",
      phone: "+998 (99) 999-99-98",
      salary: 250000,
      davomat: "Kelmadi",
      startDate: new Date(2022, 1, 1),
    },
    {
      id: 3,
      name: "Dilshod",
      surname: "familya",
      phone: "+998 (99) 999-99-97",
      salary: 260000,
      davomat: "Keldi",
      startDate: new Date(2022, 2, 1),
    },
    {
      id: 4,
      name: "Akmal",
      surname: "familya",
      phone: "+998 (99) 999-99-96",
      salary: 270000,
      davomat: "Kelmadi",
      startDate: new Date(2022, 3, 1),
    },
    {
      id: 5,
      name: "Jasur",
      surname: "familya",
      phone: "+998 (99) 999-99-95",
      salary: 280000,
      davomat: "Keldi",
      startDate: new Date(2022, 4, 1),
    },
    {
      id: 6,
      name: "Shavkat",
      surname: "familya",
      phone: "+998 (99) 999-99-94",
      salary: 290000,
      davomat: "Kelmadi",
      startDate: new Date(2022, 5, 1),
    },
    {
      id: 7,
      name: "Ulugbek",
      surname: "familya",
      phone: "+998 (99) 999-99-93",
      salary: 300000,
      davomat: "Keldi",
      startDate: new Date(2022, 6, 1),
    },
    {
      id: 8,
      name: "Bunyod",
      surname: "familya",
      phone: "+998 (99) 999-99-92",
      salary: 310000,
      davomat: "Kelmadi",
      startDate: new Date(2022, 7, 1),
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
