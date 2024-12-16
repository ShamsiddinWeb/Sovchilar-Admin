import React, { useState } from "react";
import {
  Upload,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../../../axios"; 

const AddCreated = ({ onModalClose, onUserAdded }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Rasm yuklash funksiyasi
  const handleImageUpload = async (file) => {
    const isValid = file.type === "image/png" || file.type === "image/jpeg";

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
        console.error("Kutilmagan javob:", response.data);
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
    if (!imageUrl) {
      message.error("Iltimos, jo'natishdan oldin profil rasmini yuklang!");
      return;
    }
  
    const formData = {
      ...values,
      imageUrl, 
      status: "ACTIVE", 
    };
    

    try {
      const response = await api.post("users-uz", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      message.success("Forma muvaffaqiyatli yuborildi!");
      form.resetFields(); 
      setImageUrl(""); 
      if (onModalClose) onModalClose(); 
  
      if (onUserAdded) {
        onUserAdded(response.data); 
      }
  
      console.log("Forma yuborish javobi:", response.data);
      window.location.reload(); 
    } catch (error) {
      console.error("Forma yuborishda xatolik:", error);
      message.error(
        "Formani yuborishda xatolik yuz berdi. Qayta urinib ko'ring."
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
        <Input placeholder="Malakangizni kiriting" />
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
          <Select.Option value="SURXONDARYO">Surxondaryo</Select.Option>
          <Select.Option value="QORAQALPOGISTON">Qoraqalpog‘iston</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Telefon raqam"
        rules={[
          {
            validator: (_, value) => {
              if (!value) {
                return Promise.reject(
                  new Error("Telefon raqamingizni kiriting!")
                );
              }
              if (!/^\+998\d{9}$/.test(value)) {
                return Promise.reject(
                  new Error("Iltimos, haqiqiy telefon raqamini kiriting!")
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Input placeholder="Telefon raqamingizni kiriting" />
      </Form.Item>

      <Form.Item
        label="Profil rasm yuklang"
        required
        rules={[
          {
            validator: (_, value) =>
              imageUrl
                ? Promise.resolve()
                : Promise.reject(new Error("Iltimos, profil rasmini yuklang!")),
          },
        ]}
      >
        <Upload
          listType="picture-card"
          customRequest={({ file }) => handleImageUpload(file)}
          accept=".png,.jpeg"
          maxCount={1}
          showUploadList={false}
        >
          <div>
            {isUploading ? (
              <div>Yuklanmoqda...</div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Yuklangan"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Yuklash</div>
              </div>
            )}
          </div>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Yuborish
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCreated;
