import React, { useState } from 'react'
import ModalComponent from '../../components/Modal';
import { Button } from 'antd';
import ShoppingTable from './components/ShoppingTable';

const Shops = () => {
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
        title="Magazin qo'shish"
      >
        <p>This is a dynamic modal content!</p>
        <p>You can pass any React element here as children.</p>
      </ModalComponent>
      <div className="flex justify-between items-center border-b pb-5 mb-5">
        <div>Magazinlar</div>
        <Button type="primary" onClick={showModal}>
          Magazin qo'shish
        </Button>
      </div>

      <ShoppingTable/>
    </div>
  );
}

export default Shops