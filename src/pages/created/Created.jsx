import React, { useState } from "react";
import { Button, Input } from "antd";
import ModalComponent from "../../components/Modal";
import CreatedTable from "./components/Table";
import AddCreated from "./components/AddCreated";
import EditCreated from "./components/EditCreated";

const { Search } = Input;

const Created = () => {
  const [search, setSearch] = useState(""); // Search state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [editCreatedData, setEditCreatedData] = useState(null); // Data for editing
  const [formType, setFormType] = useState(null); // Modal type (add/edit)

  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Update search input value
  };

  const showModal = (type) => {
    setFormType(type); // Determine modal type (add/edit)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false); // Close modal on confirm
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close modal on cancel
  };

  return (
    <div>
      <ModalComponent
        isOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title={formType === "add" ? "Qo'shish" : "Tahrirlash"}
      >
        {formType === "add" ? (
          <AddCreated onModalClose={handleCancel} />
        ) : formType === "edit" ? (
          <EditCreated
            editLeadData={editCreatedData}
            onModalClose={handleCancel}
          />
        ) : null}
      </ModalComponent>

      <div className="flex justify-between items-center mb-5">
        <div className="text-[20px] font-bold">Qo'shilganlar ro'yxati</div>
        <div className="flex gap-5">
          <Search
            placeholder="Ismni qidirish"
            onChange={handleSearchChange}
            value={search}
            enterButton
          />
          <Button type="primary" onClick={() => showModal("add")}>
            Qo'shish
          </Button>
        </div>
      </div>

      <CreatedTable
        search={search} // Pass search state to the table
        showModal={() => showModal("edit")}
        setEditCreatedData={setEditCreatedData}
      />
    </div>
  );
};

export default Created;
