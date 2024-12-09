
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

const HistoryTable = ({loading, data, refetch}) => {
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
      });
    
      const handleTableChange = (pagination) => {
        setPagination(pagination); // Pagination holatini yangilash
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
      dataIndex: "conserveType",
      render: (text) => <strong>{text?.conserveType}</strong>,
    },
    {
      title: "Miqdori",
      dataIndex: "quantity"
    },
    {
      title: "Narxi (so'm)",
      dataIndex: "conserveType",
      render: (text) => <div>{text?.price}</div>,
    },
    {
      title: "Kelgan vaqti",
      dataIndex: "conserveType",
      render: (text) => <div>{text?.createdAt}</div>,
    },
    {
      title: "Amallar",
      render: (_, record) => (
        <div>
          <Popconfirm
            title="Mahsulotni o'chirish"
            description="Siz ushbu mahsulotni o'chirishga aminmisiz?"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
            onConfirm={() => handleDelete(record?.id)}
          >
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
            ></Button>
          </Popconfirm>
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
        pagination={{ pageSize: 10 }}
        onChange={handleTableChange}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default HistoryTable;