import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrevBtn from "../../../../components/PrevBtn";
import { Button } from "antd";
import SingleReadyProductTable from "./components/Table";
import ModalComponent from "../../../../components/Modal";
import ReadyProductInForm from "./components/ReadyProductInForm";
import AddSingleReadyProduct from "./components/AddSingleProduct";
import EditSingleReadyProduct from "./components/EditSingleProduct";
import useGetData from "../../../../hooks/useGetData";

const SingleReadyProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editSingleReadyProductData, setEditSingleReadyProductData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()

  const { data, loading, refetch } = useGetData(
    `api/conserve-type/${id}`
  );
  
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
        title={
          formType === "add" ? "Mahsulotni qo'shish" : "Mahsulotni tahrirlash"
        }
      >
        {formType === "add" ? (
          <AddSingleReadyProduct refetch={refetch} onModalClose={handleCancel} />
        ) : formType === "edit" ? (
          <EditSingleReadyProduct
            refetch={refetch}
            editSingleReadyProductData={editSingleReadyProductData}
            onModalClose={handleCancel}
          />
        ) :formType === "ready" ? (
          <ReadyProductInForm onModalClose={handleCancel}/>
        ): <div></div> }
      </ModalComponent>
      <div className="flex justify-between items-center">
        <PrevBtn text="Tayyor mahsulotlar"></PrevBtn>
        <div className="flex gap-4">
          <Button type="primary" onClick={() => navigate(`/ready-product/history/${id}`)}>
            Mahsulotlar tarixini ko'rish
          </Button>
          <Button type="primary" onClick={() => showModal("ready") }>
            Mahsulotni tayyorlashda qushiladigan mahsulotlar
          </Button>
          <Button type="primary" onClick={() => showModal("add")}>
            Mahsulot qo'shish
          </Button>
        </div>
      </div>
      <SingleReadyProductTable
        data={data ? [data] : []}
        refetch={refetch}
        loading={loading}
        showModal={showModal}
        setEditSingleReadyProductData={setEditSingleReadyProductData}
      />
    </div>
  );
};

export default SingleReadyProduct;
