import React, { useState } from "react";
import { Input } from "antd";
import ModalComponent from "../../components/Modal";
import EditLead from "./components/EditLead";
import LeadTable from "./components/Table";
const { Search } = Input;

const NewLead = () => {
  const [search, setSearch] = useState(""); // Qidiruv uchun o'zgaruvchilar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editLeadData, setEditLeadData] = useState(null);

  // Input maydonidagi o'zgarishlarni boshqarish
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Modalni ko'rsatish
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ModalComponent
        isOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title={"Yangilarni tahrirlash"}
      >
        <EditLead editLeadData={editLeadData} onModalClose={handleCancel} />
      </ModalComponent>

      <div className="flex justify-between items-center">
        <div className="text-[20px] pb-9">Yangilar</div>
        <div>
          <Search
            className="pb-9"
            placeholder="Yangilarni qidirish"
            onChange={handleChange}
            value={search}
            enterButton="Qidirish"
          />
        </div>
      </div>

      <LeadTable
        showModal={showModal}
        setEditLeadData={setEditLeadData}
        search={search} // Qidiruv natijalarini ko'rsatish
      />
    </div>
  );
};

export default NewLead;
