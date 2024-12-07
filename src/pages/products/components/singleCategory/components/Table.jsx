
import { Table, Button, Popconfirm } from "antd";
import "antd/dist/reset.css"; 
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import api from "../../../../../../axios";

const SingleCategoryTable = ({loading, data, showModal, setSingleEditCategoryData, refetch}) => {
  

  const handleEdit = (record) => {
    setSingleEditCategoryData(record)
    showModal("edit")
  };
 
  const handleDelete = async (id) => {
    try {
      await api.delete(`api/stock-history/${id}`);
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
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default SingleCategoryTable;