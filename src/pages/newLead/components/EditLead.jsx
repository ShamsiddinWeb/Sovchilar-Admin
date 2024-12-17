import React, { useState, useEffect } from "react";
import {
  Upload,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import api from "../../../../axios"; // Axios konfiguratsiyasi

const EditLead = ({ onModalClose, editLeadData }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(editLeadData?.imageUrl || "");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (editLeadData) {
      form.setFieldsValue({
        firstName: editLeadData.firstName,
        lastName: editLeadData.lastName,
        age: editLeadData.age,
        description: editLeadData.description,
        nationality: editLeadData.nationality,
        gender: editLeadData.gender,
        jobTitle: editLeadData.jobTitle,
        qualification: editLeadData.qualification,
        address: editLeadData.address,
        phone: editLeadData.phone,
        maritalStatus: editLeadData.maritalStatus,
      });
    }
  }, [editLeadData, form]);

  // Rasm yuklash funksiyasi
  const handleImageUpload = async (file) => {
    const isValid = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg";

    if (!isValid) {
      message.error("Faqat PNG yoki JPEG formatidagi fayllar qabul qilinadi!");
      return Upload.LIST_IGNORE;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const response = await api.post("file/upload", formData);

      const uploadedUrl =
        response?.data?.data?.path || response?.data?.url || "";
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        message.success("Rasm muvaffaqiyatli yuklandi!");
      } else {
        throw new Error(
          "Javobdan rasm URL manzilini olishda xatolik yuz berdi."
        );
      }
    } catch (error) {
      console.error("Rasm yuklashda xatolik:", error);
      message.error("Rasm yuklashda xatolik yuz berdi. Qayta urinib ko'ring.");
    } finally {
      setIsUploading(false);
    }

    return false; // Default xatti-harakatni to'xtatish
  };

  // Forma yuborilganda bajariladigan funksiya
  const onFinish = async (values) => {
    const payload = {
      ...values,
      age: parseInt(values.age, 10),
      imageUrl, // Yuklangan rasm URL manzilini qo'shish
    };

    try {
      await api.put(`users-uz/${editLeadData.id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message.success("Ma'lumot muvaffaqiyatli yangilandi!");

      // Refresh sahifani
      window.location.reload();
    } catch (error) {
      console.error("Ma'lumotni yangilashda xatolik:", error);
      message.error(
        "Ma'lumotni yangilashda xatolik yuz berdi. Qayta urinib ko'ring."
      );
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ marginTop: 20 }}
    >
      <Form.Item
        name="firstName"
        label="Ism"
        rules={[{ required: true, message: "Iltimos, ismingizni kiriting!" }]}
      >
        <Input placeholder="Ismingizni kiriting" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Familiya"
        rules={[
          { required: true, message: "Iltimos, familiyangizni kiriting!" },
        ]}
      >
        <Input placeholder="Familiyangizni kiriting" />
      </Form.Item>

      <Form.Item
        name="age"
        label="Yosh"
        rules={[
          { required: true, message: "Iltimos, yoshingizni kiriting!" },
          {
            type: "number",
            min: 18,
            message: "Yosh kamida 18 bo'lishi kerak!",
          },
        ]}
      >
        <InputNumber
          placeholder="Yoshingizni kiriting"
          style={{ width: "100%" }}
          min={18}
        />
      </Form.Item>

      <Form.Item
        name="maritalStatus"
        label="Oilaviy holat"
        rules={[
          { required: true, message: "Iltimos, oilaviy holatingizni tanlang!" },
        ]}
      >
        <Select placeholder="Oilaviy holatni tanlang">
          <Select.Option value="SINGLE">Yolg'iz</Select.Option>
          <Select.Option value="DIVORCED">Ajrashgan</Select.Option>
          <Select.Option value="MARRIED_SECOND">
            Ikkinchi marta turmush qurgan
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Tavsif"
        rules={[
          { required: true, message: "Iltimos, o'zingizni tasvirlab bering!" },
        ]}
      >
        <Input.TextArea placeholder="O'zingizni tasvirlab bering" rows={4} />
      </Form.Item>

      <Form.Item
        name="nationality"
        label="Millati"
        rules={[
          { required: true, message: "Iltimos, millatingizni kiriting!" },
        ]}
      >
        <Select placeholder="Millatingizni tanlang">
          <Select.Option value="Uzbek">O'zbek</Select.Option>
          <Select.Option value="Russian">Rus</Select.Option>
          <Select.Option value="Kazakh">Qozog'istonlik</Select.Option>
          <Select.Option value="Kyrgyz">Qirg'iz</Select.Option>
          <Select.Option value="Tajik">Tojik</Select.Option>
          <Select.Option value="Turkmen">Turkman</Select.Option>
          <Select.Option value="Tatar">Tatar</Select.Option>
          <Select.Option value="Other">Boshqa</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="gender"
        label="Jinsi"
        rules={[{ required: true, message: "Iltimos, jinsingizni tanlang!" }]}
      >
        <Select placeholder="Jinsingizni tanlang">
          <Select.Option value="MALE">Erkak</Select.Option>
          <Select.Option value="FEMALE">Ayol</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="jobTitle"
        label="Kasbingiz"
        rules={[{ required: true, message: "Iltimos, kasbingizni kiriting!" }]}
      >
        <Input placeholder="Kasbingizni kiriting" />
      </Form.Item>

      <Form.Item
        name="qualification"
        label="Malaka"
        rules={[{ required: true, message: "Iltimos, malakangizni kiriting!" }]}
      >
        <Select placeholder="Ma'lumotingizni tanlang">
          <Select.Option value="middle">O'rta</Select.Option>
          <Select.Option value="specialized">O'rta maxsu</Select.Option>
          <Select.Option value="higher">Oliy</Select.Option>
          <Select.Option value="master">Magistr</Select.Option>
          <Select.Option value="doctorate">Doktorantura</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="address"
        label="Manzil"
        rules={[
          { required: true, message: "Iltimos, manzilingizni kiriting!" },
        ]}
      >
        <Select placeholder="Viloyatingizni tanlang">
          <Select.Option value="TOSHKENT">Toshkent</Select.Option>
          <Select.Option value="ANDIJON">Andijon</Select.Option>
          <Select.Option value="BUXORO">Buxoro</Select.Option>
          <Select.Option value="FARGONA">Farg‘ona</Select.Option>
          <Select.Option value="JIZZAX">Jizzax</Select.Option>
          <Select.Option value="XORAZM">Xorazm</Select.Option>
          <Select.Option value="NAMANGAN">Namangan</Select.Option>
          <Select.Option value="NAVOIY">Navoiy</Select.Option>
          <Select.Option value="QASHQADARYO">Qashqadaryo</Select.Option>
          <Select.Option value="SAMARQAND">Samarqand</Select.Option>
          <Select.Option value="SIRDARYO">Sirdaryo</Select.Option>
          <Select.Option value="SURXONDARYO">Surxandaryo</Select.Option>
          <Select.Option value="QORAQALPOGISTON">
            Qoraqalpog'iston
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Telefon raqami"
        rules={[
          {
            required: true,
            message: "Iltimos, telefon raqamingizni kiriting!",
          },
        ]}
      >
        <Input placeholder="Telefon raqamingizni kiriting" />
      </Form.Item>

      <Form.Item
        name="imageUrl"
        label="Rasm yuklash"
        rules={[{ required: false, message: "Iltimos, rasmni yuklang!" }]}
      >
        <Upload
          name="image"
          listType="picture-card"
          showUploadList={false}
          beforeUpload={handleImageUpload}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <div>
              {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Yuklash</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Ma'lumotni saqlash
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditLead;
