
import { Table, Button, Popconfirm } from "antd";
import "antd/dist/reset.css"; 
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MyTable = ({showModal, setEditCategoryData}) => {

  const navigate = useNavigate()

  const handleEdit = (record) => {
    setEditCategoryData(record)
    showModal("edit")
  };

  

 
  const handleDelete = (id) => {
    console.log(id);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "Nomi",
      dataIndex: "category",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Soni",
      dataIndex: "count"
    },
    {
      title: "O'lchov turi",
      dataIndex: "unit"
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

  const data = [
    {
      id: 1,
      category: "Gusht",
      count: 24,
      unit: 'kg',
    },
    {
      id: 2,
      category: "Butilka",
      count: 23,
      unit: 'dona',
    },
    {
      id: 3,
      category: "Yog'",
      count: 25,
      unit: "litr"
    },
    {
      id: 4,
      category: "Priprava",
      count: 25,
      unit: 'Pachka'
    },
    {
      id: 5,
      category: "Karopka",
      count: 25,
      unit: "dona"
    },
    {
      id: 6,
      category: "Etketka",
      count: 25,
      unit: "dona"
    },
    {
      id: 7,
      category: "Krishka",
      count: 25,
      unit: "dona"
    },
  ];

  return (
    <div style={{ margin: "20px", overflow: "auto" }}>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          style: { cursor: 'pointer' },
          onClick: (event) => {
            if (!event.target.closest("button")) {
              navigate(`/categories/${record?.id}`)
            }
          },
        })}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default MyTable;
