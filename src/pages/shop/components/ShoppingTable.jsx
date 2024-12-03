import { Button, Popconfirm, Table } from "antd";
import "antd/dist/reset.css"; // Ant Design CSS qo'shilganiga ishonch hosil qiling
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const ShoppingTable = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
      render: (_, record) => <Link to={`/shops/${record?.id}`} className="text-blue-500 underline">{record?.name}</Link>,
    },
    {
      title: "Manzili",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone"
    },
    {
        title: "Amallar",
        key: "actions",
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
      name: "Halol",
      phone: "+998 (99) 999-99-99",
      address: "Oqtepa lavash markazidan 100 metr oldin",
    },
    {
      id: 2,
      name: "Andalus",
      phone: "+998 (77) 77-77-77",
      address: "Oqtepa lavash markazidan 100 metr keyin",
    },
    {
      id: 3,
      name: "Shirin",
      phone: "+998 (00) 000-00-00",
      address: "Adashib qoldim",
    },
  ];

  return (
    <Table columns={columns} dataSource={data} bordered>
      ShoppingTable
    </Table>
  );
};

export default ShoppingTable;
