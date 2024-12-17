import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../axios";

const Married = ({ showModal, setEditCreatedData }) => {
  const [data, setData] = useState([]); // Table data
  const [loading, setLoading] = useState(false); // Loading state
  const [pagination, setPagination] = useState({
    current: 1, // Current page
    pageSize: 10, // Items per page (10 by default)
    total: 0, // Total number of records
  });

  const navigate = useNavigate();

  // Fetch data from API
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await api.get(
        `users-uz?status=DONE&page=${params.page}&limit=${params.limit}`
      );
  
      const fetchedData = response?.data?.data?.items || [];
      const totalItems = response?.data?.data?.total || 0;
  
      setData(fetchedData);
      setPagination((prev) => ({
        ...prev,
        current: params.page, 
        pageSize: params.limit, 
        total: totalItems, 
      }));
    } catch (error) {
      console.error("Xatolik:", error.response?.data || error.message);
      toast.error("Ma'lumotni yuklashda xatolik!");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData({ page: pagination.current, limit: pagination.pageSize });
  }, [pagination.current, pagination.pageSize]);

  // Handle pagination and sorting changes
  const handleTableChange = (pagination) => {
    fetchData({ page: pagination.current, limit: pagination.pageSize });
  };

  // Delete button handler
  const handleDelete = async (id) => {
    try {
      await api.delete(`users-uz/${id}`);
      toast.success("Record successfully deleted!");
      fetchData({ page: pagination.current, limit: pagination.pageSize });
    } catch (error) {
      console.error(
        "Error deleting record:",
        error.response?.data || error.message
      );
      toast.error("Error deleting record!");
    }
  };

  // Table columns definition
  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1, // Serial number
    },
    {
      title: "To'liq Ism",
      dataIndex: "firstName",
    },
    {
      title: "Yosh",
      dataIndex: "age",
    },
    {
      title: "Manzil",
      dataIndex: "address",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Are you sure to delete this record?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record?.id)}
          >
            <Button
              type="link"
              icon={
                <DeleteOutlined style={{ color: "red", fontSize: "20px" }} />
              }
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div style={{ margin: "20px", overflow: "auto" }}>
      <h2 className="mb-[30px] text-2xl">Oilali bo'lganlar</h2>
      <Table
        bordered
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        loading={loading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize, // Har bir sahifada 10 ta yozuv
          total: pagination.total, // Umumiy yozuvlar soni
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPagination({ current: page, pageSize }); // Sahifani o'zgartirish
          },
        }}
        onChange={handleTableChange}
        rowKey={(record) => record?.id}
        onRow={(record) => ({
          style: { cursor: "pointer" },
          onClick: (event) => {
            if (!event.target.closest("button")) {
              navigate(`/users-uz/${record?.id}`);
            }
          },
        })}
      />
    </div>
  );
};

export default Married;
