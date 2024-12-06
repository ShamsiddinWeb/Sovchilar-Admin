import { Button } from "antd";
import React, { useState } from "react";
import ModalComponent from "../../components/Modal";
import MyTable from "./components/Table";
import CategoryAddForm from "./components/CategoryAddForm";
import CategoryEditForm from "./components/CategoryEditForm";
import useGetData from "../../hooks/useGetData";
import { Input } from "antd";
const { Search } = Input;

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [search, setSearch] = useState(null);

  const { data, loading, refetch } = useGetData("api/categories");

  const filteredData = data?.filter((item) => {
    if(search?.length > 2){
      return item?.category?.toLowerCase().includes(search?.toLowerCase())
    }else{
      return item
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
          formType === "add" ? "Kategoriya qo'shish" : "Kategoriya tahrirlash"
        }
      >
        {formType === "add" ? (
          <CategoryAddForm refetch={refetch} onModalClose={handleCancel} />
        ) : formType === "edit" ? (
          <CategoryEditForm
            refetch={refetch}
            editCategoryData={editCategoryData}
            onModalClose={handleCancel}
          />
        ) : (
          <div></div>
        )}
      </ModalComponent>
      <div className="flex justify-between items-center">
        <div>Kategoriyalar</div>
        <div className="flex gap-4">
          <Search
            placeholder="Kategoriya qidirish"
            onChange={handleChange}
            value={search} 
            enterButton
          />
          <Button type="primary" onClick={() => showModal("add")}>
            Kategoriya qo'shish
          </Button>
        </div>
      </div>
      <MyTable
        data={filteredData}
        loading={loading}
        refetch={refetch}
        showModal={showModal}
        setEditCategoryData={setEditCategoryData}
      />
    </div>
  );
};

export default Category;
