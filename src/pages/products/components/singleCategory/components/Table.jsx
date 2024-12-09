
import { Table, Button, Popconfirm } from "antd";
import "antd/dist/reset.css"; 
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import api from "../../../../../../axios";
import { useState } from "react";

const SingleCategoryTable = ({loading, data, showModal, setSingleEditCategoryData, refetch}) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination); // Pagination holatini yangilash
  };

  const handleEdit = (record) => {
    setSingleEditCategoryData(record)
    showModal("edit")
  };
 
  const handleDelete = async (id) => {
    try {
      await api.delete(`api/products/${id}`);
      toast.success("Mahsulot muvaffaqiyatli o'chirildi!");
      refetch()
    } catch (error) {
      toast.error("Mahsulotni o'chirishda xatolik yuz berdi!");
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (_, __, index) => index + 1 + (pagination.current - 1) * pagination.pageSize, 
    },
    {
      title: "Nomi",
      dataIndex: "category",
      render: (text) => <strong>{text?.category}</strong>,
    },
    {
      title: "Miqdori",
      dataIndex: "quantity"
    },
    {
      title: "Narxi (so'm)",
      dataIndex: "price"
    },
    {
      title: "Umumiy narxi (so'm)",
      dataIndex: "totalPrice"
    },
    {
      title: "Kelgan vaqti",
      dataIndex: "createdAt"
    },
    {
      title: "Amallar",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "green" }} />}
            onClick={() => handleEdit(record)}
          ></Button>
        </div>
      ),
    },
  ];

  

  return (
    <div style={{ margin: "20px", overflow: "auto" }}>
      <Table
        bordered
        columns={columns} 
        dataSource={data}
        loading={loading}
        onChange={handleTableChange}
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default SingleCategoryTable;