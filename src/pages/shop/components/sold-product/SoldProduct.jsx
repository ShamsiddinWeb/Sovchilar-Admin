import { Table } from "antd";
import ModalComponent from "../../../../components/Modal";

const SoldProduct = () => {
  const columns = [
    {
      title: "№",
      key: "index",
      render: (_, __, ind) => ind + 1,
    },
    {
      title: "Mahsulot nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Soni",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Narxi (so'm)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Jami (so'm)",
      key: "totalPrice",
      render: (_, record) => record?.count * record?.price,
    },
    {
      title: "Topshirilgan vaqti",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <>
      <h2 className="font-medium text-[18px] mb-5">Yetkazilgan mahsulotlar</h2>
      <Table
        columns={columns}
        bordered
        dataSource={data}
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: (event) => {
            if (!event.target.closest("button")) {
              navigate(`/shops/${record?.id}`);
            }
          },
        })}
      />
      <ModalComponent
        title="Mahsulotni tahrirlash"
        // isOpen={isModalVisible}
        // onOk={handleSave}
        // onCancel={handleCancel}
      >
        {/* <span className="border-r p-1">{selectedRecord?.id}</span>
        <span className="border-r p-1">{selectedRecord?.name}</span>
        <span className="border-r p-1">{selectedRecord?.age}</span>
        <span className="border-r p-1">{selectedRecord?.address}</span> */}
      </ModalComponent>
    </>
  );
};

export default SoldProduct;

const data = [
  {
    name: "Jiz",
    count: 5,
    price: "5000",
    date: "20-12-2024 09:10",
  },
  {
    name: "Qozon kabob",
    count: 5,
    price: "5000",
    date: "20-12-2024 09:10",
  },
  {
    name: "Jiz",
    count: 5,
    price: "5000",
    date: "20-12-2024 10:10",
  },
  {
    name: "Til",
    count: 5,
    price: "5000",
    date: "20-12-2024 21:21",
  },
  {
    name: "Tushonka",
    count: 5,
    price: "5000",
    date: "20-12-2024 21:40",
  },
  {
    name: "Til",
    count: 5,
    price: "5000",
    date: "20-12-2024 21:40",
  },
];
