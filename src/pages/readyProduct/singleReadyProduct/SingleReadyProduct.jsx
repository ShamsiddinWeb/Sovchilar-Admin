import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PrevBtn from "../../../components/PrevBtn";
import { Button } from "antd";
import SingleReadyProductTable from "./components/Table";
import ModalComponent from "../../../components/Modal";
import AddSingleProduct from "./components/AddSingleProduct";
import EditSingleProduct from "./components/EditSingleProduct";
import CRangePicker from "../../../components/RangePicker";

const SingleReadyProduct = () => {
  const [dates, setDates] = useState([null, null])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editSingleReadyProductData, setEditSingleReadyProductData] = useState(null);
  const { id } = useParams();

  // const { data, loading, refetch } = useGetData(
  //   `api/stock-history/category/${id}`
  // );
  

//   const { data, loading, refetch } = useGetData(
//     (dates[0] && dates[1]) ?  `api/stock-history/category/${id}?from=${dates[0]}&to=${dates[1]}` : `api/stock-history/category/${id}`
//   );
  
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
  const data = [
    {
      id: 1,
      name: "Birinchi",
      price: 10000,
      quantity: 10
    },
    {
      id: 2,
      name: "Ikkinchi",
      price: 20000,
      quantity: 20  
    },
    {
      id: 3,
      name: "Uchinchi",
      price: 30000,
      quantity: 30
    },
    {
      id: 4,
      name: "To'rtinchi",
      price: 40000,
      quantity: 40
    }
  ]
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
          <AddSingleProduct refetch={refetch} onModalClose={handleCancel} />
        ) : formType === "edit" ? (
          <EditSingleProduct
            refetch={refetch}
            editSingleCategoryData={editSingleCategoryData}
            onModalClose={handleCancel}
          />
        ) : (
          <div></div>
        )}
      </ModalComponent>
      <div className="flex justify-between items-center">
        <PrevBtn text="Tayyor mahsulotlar"></PrevBtn>
        <div className="flex gap-4">
          <CRangePicker setDates={setDates}/>
          <Button type="primary" onClick={() => showModal("add")}>
            Mahsulot qo'shish
          </Button>
        </div>
      </div>
      <SingleReadyProductTable
        data={data}
        // refetch={refetch}
        // loading={loading}
        showModal={showModal}
        setEditSingleReadyProductData={setEditSingleReadyProductData}
      />
    </div>
  );
};

export default SingleReadyProduct;
