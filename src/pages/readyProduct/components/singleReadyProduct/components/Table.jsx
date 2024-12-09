
import { Table, Button } from "antd";
import "antd/dist/reset.css"; 
import {
  EditOutlined,
} from "@ant-design/icons";
// import { toast } from "react-toastify";
// import api from "../../../../../../axios";
import { useState } from "react";

const SingleReadyProductTable = ({loading, data, showModal, setEditSingleReadyProductData, refetch}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination); // Pagination holatini yangilash
  };

  const handleEdit = (record) => {
    setEditSingleReadyProductData(record)
    showModal("edit")
  };
 
  // const handleDelete = async (id) => {
  //   try {
  //     await api.delete(`api/stock-history/${id}`);
  //     toast.success("Mahsulot muvaffaqiyatli o'chirildi!");
  //     refetch()
  //   } catch (error) {
  //     toast.error("Mahsulotni o'chirishda xatolik yuz berdi!");
  //   }
  // };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (_, __, index) => index + 1 + (pagination.current - 1) * pagination.pageSize, 
    },
    {
      title: "Nomi",
      dataIndex: "conserveType",
    },
    {
      title: "Miqdori",
      dataIndex: "readyConserves",
      render: (text) => <div>{text[0]?.quantity || 0}</div>,
    },
    {
      title: "Kelgan vaqti",
      dataIndex: "readyConserves",
      render: (text) => <div>{text[0]?.createdAt || "Hozircha yo'q"}</div>,
    },
    {
      title: "Mahsulot biriktirilganmi?",
      dataIndex: "productConsumptions",
      render: (text) => (
        <div
          className={ text?.length > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium" }
        >
          {text?.length > 0 ? "Biriktirilgan" : "Biriktirilmagan"}
        </div>
      ),
    },
    // {
    //   title: "Amallar",
    //   render: (_, record) => (
    //     <div>
    //       <Button
    //         type="link"
    //         icon={<EditOutlined style={{ color: "green" }} />}
    //         onClick={() => handleEdit(record)}
    //       ></Button>
    //     </div>
    //   ),
    // },
  ];

  

  return (
    <div style={{ margin: "20px", overflow: "auto" }}>
      <Table
        bordered
        columns={columns} 
        dataSource={data}
        loading={loading}
        onChange={handleTableChange}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record.id}  
      />
    </div>
  );
};

export default SingleReadyProductTable;