
import { Table, Button, Popconfirm } from "antd";
import "antd/dist/reset.css"; 
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../../axios";

const MyTable = ({showModal, setEditReadyProductData, data, loading, refetch}) => {

  const navigate = useNavigate()

  const handleEdit = (record) => {
    setEditReadyProductData(record)
    showModal("edit")
  };
 
  const handleDelete = async (id) => {
    try {
      await api.delete(`api/conserve-type/${id}`);
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
      render: (_, __, index) => index + 1, 
    },
    {
      title: "Nomi",
      dataIndex: "conserveType",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Soni",
      dataIndex: "count"
    },
    {
      title: "Narxi",
      dataIndex: "price"
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
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          style: { cursor: 'pointer' },
          onClick: (event) => {
            if (!event.target.closest("button")) {
              navigate(`/ready-product/${record?.id}`)
            }
          },
        })}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default MyTable;
