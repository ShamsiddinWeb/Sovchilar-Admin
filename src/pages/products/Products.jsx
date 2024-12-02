import { Button } from "antd";
import React, { useState } from "react";
import ModalComponent from "../../components/Modal";
import MyTable from "./components/Table";

const Products = () => {
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
  return (
    <div>
      <ModalComponent
        isOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Mahsulot qo'shish"
      >
        <p>This is a dynamic modal content!</p>
        <p>You can pass any React element here as children.</p>
      </ModalComponent>
      <div className="flex justify-between items-center">
        <div>Mahsulotlar</div>
        <Button type="primary" onClick={showModal}>
          Mahsulot qo'shish
        </Button>
      </div>
      <MyTable />
    </div>
  );
};

export default Products;
