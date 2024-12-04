import { Button } from "antd";
import React, { useState } from "react";
import ModalComponent from "../../components/Modal";
import MyTable from "./components/Table";
import CategoryAddForm from "./components/CategoryAddForm";
import CategoryEditForm from "./components/CategoryEditForm";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(null)
  const [editCategoryData, setEditCategoryData] = useState(null)

  const showModal = (type) => {
    setFormType(type);
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
        title={formType === "add" ? "Kategoriya qo'shish" : "Kategoriya tahrirlash"}
      >
        {formType === "add" ? <CategoryAddForm onModalClose={handleCancel}/> : formType === "edit" ? <CategoryEditForm editCategoryData={editCategoryData} onModalClose={handleCancel}/> : <div></div>}
      </ModalComponent>
      <div className="flex justify-between items-center">
        <div>Kategoriyalar</div>
        <Button type="primary" onClick={() => showModal("add")}>
          Kategoriya qo'shish
        </Button>
      </div>
      <MyTable showModal={showModal} setEditCategoryData={setEditCategoryData}/>
    </div>
  );
};

export default Category;
