import React, { useEffect, useMemo } from "react";
import { Button } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../../../../../components/InputField";
import SelectField from "../../../../../components/SelectField";
import useGetData from "../../../../../hooks/useGetData";
import { MdDeleteOutline } from "react-icons/md";
import { useParams } from "react-router-dom";
import api from "../../../../../../axios";

const ReadyProductInForm = ({ onModalClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {id} = useParams()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const { data } = useGetData("api/products");

  const productOptions = useMemo(() => {
    return data?.map((item) => ({
      id: item.id, // IDni 'value'ga o'tkazamiz
      category: item.category.category, // Kategoriyani 'label'ga o'tkazamiz
    }));
  }, [data]);

  console.log(data);
  

  useEffect(() => {
    reset();
  }, [onModalClose]);

  const onSubmit = async (formData) => {
    const formattedData = formData.products.map((product) => ({
      ...product,
      quantity: Number(product.quantity), // Quantity ni raqamga aylantirish
    }));
  
    const newData = {
      conserveTypeId: id,
      products: formattedData,
    };    
  
    try {
      const response = await api.post("/api/product-consuption", newData);

      if (response?.status === 200 || response?.status === 201) {
        toast.success("Ma'lumot muvaffaqiyatli saqlandi!");
        onModalClose();
        reset();
      }
    } catch (error) {
      toast.error("Ma'lumotni saqlashda xatolik yuz berdi!");
    }
  };

  return (
    <form className="mt-[20px]" onSubmit={handleSubmit(onSubmit)}>
      {fields?.map((field, index) => (
        <div key={field?.id} className="flex gap-2 justify-between mb-[10px]">
          <SelectField
            className="w-[200px]"
            control={control}
            name={`products[${index}].productId`}
            placeholder="Mahsulot turini tanlang"
            options={productOptions}
            rules={{
              required: "Miqdor turi maydoni talab qilinadi",
            }}
            error={errors?.products?.[index]?.productId}
          />
          <InputField
            className="w-[200px]"
            control={control}
            name={`products[${index}].quantity`}
            placeholder="Masalan, 200"
            type="number"
            rules={{
              required: "Mahsulot miqdori maydoni talab qilinadi"
            }}
            error={errors?.products?.[index]?.quantity}
          />
          <Button danger onClick={() => remove(index)}>
            <MdDeleteOutline className="text-[16px]" />
          </Button>
        </div>
      ))}

      <Button
        type="dashed"
        onClick={() => append({ productId: "", quantity: "" })}
        className="w-full mb-4"
      >
        + Qo'shish
      </Button>

      <Button type="primary" htmlType="submit" className="w-full">
        Saqlash
      </Button>
    </form>
  );
};

export default ReadyProductInForm;
