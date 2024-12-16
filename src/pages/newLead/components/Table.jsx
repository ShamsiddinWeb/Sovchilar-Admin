import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import api from "../../../../axios";
import { MdDoneOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Navigate uchun import

const LeadTable = ({ search, showModal, setEditLeadData }) => {
  const [data, setData] = useState([]); // Table data
  const [loading, setLoading] = useState(false); // Loading state
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const navigate = useNavigate(); // Navigatsiya qilish uchun hook

  // Fetch data from API
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const response = await api.get(
        `users-uz?status=INACTIVE&page=${params.page}&limit=${params.limit}`
      );

      const fetchedData =
        response?.data?.data?.items || response?.data?.data || [];
      setData(fetchedData);

      setPagination({
        current: response?.data?.data?.page || 1,
        pageSize: response?.data?.data?.limit || 10,
        total: response?.data?.data?.total || 0,
      });
    } catch (error) {
      console.error("Xatolik:", error.response?.data || error.message);
      toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ page: pagination.current, limit: pagination.pageSize });
  }, [pagination.current, pagination.pageSize]);

  const handleTableChange = (pagination) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const handleEdit = (record) => {
    setEditLeadData(record);
    showModal();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`users-uz/${id}`);
      toast.success("Ma'lumot muvaffaqiyatli o'chirildi!");
      fetchData({ page: pagination.current, limit: pagination.pageSize });
    } catch (error) {
      console.error(
        "O'chirishda xatolik:",
        error.response?.data || error.message
      );
      toast.error("Ma'lumotni o'chirishda xatolik yuz berdi!");
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "INACTIVE" ? "ACTIVE" : "INACTIVE";

    try {
      await api.put(`users-uz/${id}`, { status: newStatus });
      toast.success(`Holat muvaffaqiyatli ${newStatus} ga o'zgartirildi!`);
      fetchData({ page: pagination.current, limit: pagination.pageSize });
    } catch (error) {
      console.error(
        "Holatni o'zgartirishda xatolik:",
        error.response?.data || error.message
      );
      toast.error("Holatni o'zgartirishda xatolik yuz berdi!");
    }
  };

  // Apply search filter
  const filteredData = data.filter((item) =>
    item?.firstName?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "№",
      dataIndex: "no",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
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
      title: "Harakatlar",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "green", fontSize: "20px" }} />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Ushbu ma'lumotni o'chirishga aminmisiz?"
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
          <Popconfirm
            title="Tasdiqlash"
            description="Haqiqatdan ham buni tasdiqlamoqchimisiz?"
            icon={<QuestionCircleOutlined style={{ color: "green" }} />}
            onConfirm={() => handleStatusToggle(record?.id, record?.status)}
          >
            <Button
              type="link"
              icon={
                <MdDoneOutline style={{ color: "blue", fontSize: "20px" }} />
              }
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={filteredData} // Filtrlangan ma'lumotlar
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      onChange={handleTableChange}
      rowKey={(record) => record?.id}
      onRow={(record) => ({
        style: { cursor: "pointer" },
        onClick: (event) => {
          if (!event.target.closest("button")) {
            navigate(`/users-uz/${record?.id}`); // Foydalanuvchi sahifasiga o'tish
          }
        },
      })}
    />
  );
};

export default LeadTable;
