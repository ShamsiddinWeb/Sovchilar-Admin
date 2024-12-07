import React, { useState } from "react";
import { Button } from "antd";
import PrevBtn from "../../../../components/PrevBtn";
import SingleCategoryTable from "./components/Table";
import ModalComponent from "../../../../components/Modal";
import AddSingleCategory from "./components/AddSingleCategory";
import EditSingleCategory from "./components/EditSingleCategory";
import useGetData from "../../../../hooks/useGetData";
import { useParams } from "react-router-dom";
import CRangePicker from "../../../../components/RangePicker";

const SingleCategory = () => {
  const [dates, setDates] = useState([null, null])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editSingleCategoryData, setSingleEditCategoryData] = useState(null);
  const { id } = useParams();
  
  const { data, loading, refetch } = useGetData(
    (dates[0] && dates[1]) ?  `api/stock-history/category/${id}?from=${dates[0]}&to=${dates[1]}` : `api/stock-history/category/${id}`
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
          <AddSingleCategory refetch={refetch} onModalClose={handleCancel} />
        ) : formType === "edit" ? (
          <EditSingleCategory
            refetch={refetch}
            editSingleCategoryData={editSingleCategoryData}
            onModalClose={handleCancel}
          />
        ) : (
          <div></div>
        )}
      </ModalComponent>
      <div className="flex justify-between items-center">
        <PrevBtn text="Kategoriya"></PrevBtn>
        <div className="flex gap-4">
          <CRangePicker setDates={setDates}/>
          <Button type="primary" onClick={() => showModal("add")}>
            Mahsulot qo'shish
          </Button>
        </div>
      </div>
      <SingleCategoryTable
        data={data}
        refetch={refetch}
        loading={loading}
        showModal={showModal}
        setSingleEditCategoryData={setSingleEditCategoryData}
      />
    </div>
  );
};

export default SingleCategory;
