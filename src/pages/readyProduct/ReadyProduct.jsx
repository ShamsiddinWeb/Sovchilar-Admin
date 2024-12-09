import { Button } from "antd";
import React, { useState } from "react";
import ModalComponent from "../../components/Modal";
import useGetData from "../../hooks/useGetData";
import AddReadyProduct from "./components/AddReadyProduct";
import EditReadyProduct from "./components/EditReadyProduct";
import MyTable from "./components/Table";

const ReadyPrduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editReadyProductData, setEditReadyProductData] = useState(null);

  const { data, loading, refetch } = useGetData("api/conserve-type");
 

  
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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <ModalComponent
        isOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title={
          formType === "add"
            ? "Tayyor mahsulot qo'shish"
            : "Tayyor mahsulotni tahrirlash"
        }
      >
        {formType === "add" ? (
          <AddReadyProduct refetch={refetch} onModalClose={handleCancel} />
        ) : formType === "edit" ? (
          <EditReadyProduct
            refetch={refetch}
            editReadyProductData={editReadyProductData}
            onModalClose={handleCancel}
          />
        ) : (
          <div></div>
        )}
      </ModalComponent>
      <div className="flex justify-between items-center">
        <div>Tayyor mahsulotlar</div>
        <div className="flex gap-4">
          <Button type="primary" onClick={() => showModal("add")}>
            Tayyor mahsulot qo'shish
          </Button>
        </div>
      </div>
      <MyTable
        data={data}
        loading={loading}
        refetch={refetch}
        showModal={showModal}
        setEditReadyProductData={setEditReadyProductData}
      />
    </div>
  );
};

export default ReadyPrduct;
