import { Button } from "antd";
import React, { useState } from "react";
import ModalComponent from "../../components/Modal";
import useGetData from "../../hooks/useGetData";
import { Input } from "antd";
import AddReadyProduct from "./components/AddReadyProduct";
import EditReadyProduct from "./components/EditReadyProduct";
import MyTable from "./components/Table";
const { Search } = Input;

const ReadyPrduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editReadyProductData, setEditReadyProductData] = useState(null);
  const [search, setSearch] = useState(null);

  // const { data, loading, refetch } = useGetData("api/categories");
  const data = [];

  const filteredData = data?.filter((item) => {
    if (search?.length > 2) {
      return item?.category?.toLowerCase().includes(search?.toLowerCase());
    } else {
      return item;
    }
  });
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
          <AddReadyProduct refetch={'refetch'} onModalClose={handleCancel} />
        ) : formType === "edit" ? (
          <EditReadyProduct
            refetch={'refetch'}
            editCategoryData={editReadyProductData}
            onModalClose={handleCancel}
          />
        ) : (
          <div></div>
        )}
      </ModalComponent>
      <div className="flex justify-between items-center">
        <div>Tayyor mahsulotlar</div>
        <div className="flex gap-4">
          <Search
            placeholder="Tayyor mahsulot qidirish"
            onChange={handleChange}
            value={search}
            enterButton
          />
          <Button type="primary" onClick={() => showModal("add")}>
            Tayyor mahsulot qo'shish
          </Button>
        </div>
      </div>
      <MyTable
        data={filteredData}
        // loading={loading}
        // refetch={refetch}
        showModal={showModal}
        setEditCategoryData={setEditReadyProductData}
      />
    </div>
  );
};

export default ReadyPrduct;
