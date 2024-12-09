import { Button, Form, Popconfirm, Table } from "antd";
import ModalComponent from "../../../../components/Modal";
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../../components/InputField";
import SelectField from "../../../../components/SelectField";
import SingleDatePickerField from "../../../../components/SingleDatePicker";
import dayjs from "dayjs";
import useFetch from "../../../../hooks/reqFetch";
import { useNavigate, useParams } from "react-router-dom";

const SoldProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();
  const [itemId, setItemId] = useState(null);
  const [typeModal, setTypeModal] = useState("");
  const navigate = useNavigate()

  const { data: storeData } = useFetch(`/api/conserve-type`);
  const {
    data: productTypeData,
    loading: productTypeLoading,
    postData: productTypeAdd,
    editData: productTypeEdit,
    deleteData: productTypeDelete,
  } = useFetch(`/api/store-item`);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const openModal = (record) => {
    if (record) {
      setTypeModal("edit");
      reset({
        quantity: record?.quantity,
        price: record?.price,
        paidAmount: record?.paidAmount,
        readyConserveId: record?.readyConserve?.id,
        createdAt: record?.createdAt,
      });
    } else {
      setTypeModal("add");
      reset({
        date: null,
      });
    }
    setIsModalVisible(true);
  };

  const onSubmit = (data) => {
    const newData = {
      quantity: +data?.quantity,
      price: +data?.price,
      paidAmount: +data?.paidAmount,
      readyConserveId: data?.readyConserveId,
      createdAt: data?.createdAt,
      storeId: id,
    };

    if (typeModal === "add") {
      productTypeAdd(newData);
    } else {
      productTypeEdit(itemId, newData);
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "№",
      key: "index",
      render: (_, __, ind) => ind + 1,
    },
    {
      title: "Mahsulot nomi",
      // dataIndex: "name",
      // render: (_, record) => storeData?.conserveType
      // key: "name",
    },
    {
      title: "Soni",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Narxi (so'm)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Qabulqilgan to'lov (so'm)",
      dataIndex: "paidAmount",
      key: "paidAmount",
    },
    {
      title: "Jami (so'm)",
      key: "totalPrice",
      dataIndex: "totalPrice",
    },
    {
      title: "Topshirilgan vaqti",
      // dataIndex: "date",
      render: (_, render) =>
        dayjs(render?.createdAt).format("YYYY-MM-DD HH:MM"),
      key: "date",
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            type="link"
            icon={<EditOutlined style={{ color: "green" }} />}
            onClick={() => {
              openModal(record);
              setItemId(record?.id);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mt-10 mb-5 flex justify-between">
        <h2 className="font-medium text-[18px] mb-5">
          Yetkazilgan mahsulotlar
        </h2>
        <div className="flex gap-x-2">
          <Button type="primary" onClick={() => navigate(`/shops/history/${id}`)}>
            Mahsulotlar tarixini ko'rish
          </Button>

          <Button type="primary" onClick={() => openModal(undefined)}>
            Mahsulot qo'shish
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        bordered
        loading={productTypeLoading}
        dataSource={productTypeData}
        pagination={{ pageSize: 10 }}
      />
      <ModalComponent
        title={typeModal === "add" ? "Qo'shish" : "Tahrirlash"}
        isOpen={isModalVisible}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <SelectField
            control={control}
            name="readyConserveId"
            options={storeData?.map((elem) => {
              return {
                category: elem?.conserveType,
                id: elem?.readyConserves[0]?.id,
              };
            })}
            label="Mahsulot turi"
            placeholder="Mahsulot turini tanlang"
            type="text"
            rules={{ required: "Mahsulot turini shart" }}
            error={errors?.readyConserveId}
          />
          <InputField
            control={control}
            name="quantity"
            label="Mahsulot soni"
            placeholder="Mahsulot sonini kiriting"
            type="number"
            rules={{ required: "Mahsulot sonini kiriting" }}
            error={errors?.quantity}
          />
          <InputField
            control={control}
            name="price"
            label="Narxi"
            placeholder="Mahsulot narxini kiriting"
            type="number"
            rules={{
              required: "Mahsulot narxini kiriting",
            }}
            error={errors?.price}
          />
          <InputField
            control={control}
            name="paidAmount"
            label="Qabul qilingan to'lov"
            placeholder="To'lov miqdorini kiriting (so'm)"
            type="number"
            rules={{
              required: "To'lov miqdorini kiriting",
            }}
            error={errors?.paidAmount}
          />
          <SingleDatePickerField
            control={control}
            label={"Topshirish vaqtini tanlang"}
            name={"createdAt"}
            placeholder={"Vaqtni tanlang"}
            rules={{ required: "Topshirish vaqtini tanlang" }}
            error={errors?.createdAt}
          />

          <div className="flex justify-end mt-4">
            <Button type="primary" htmlType="submit">
              Yuborish
            </Button>
          </div>
        </Form>
      </ModalComponent>
    </>
  );
};

export default SoldProduct;
