import React, { useState } from "react";
import { Modal, Button, Input, Form } from "antd";
import useEditEmployee from "../pages/employment/hooks/useEditEmployee";
import "react-toastify/dist/ReactToastify.css";

const EditLoginPasswordModal = ({ visible, onClose, userId }) => {
  const { editEmployee, isLoading } = useEditEmployee(); // Employee ma'lumotlarini tahrirlash uchun hook
  const [form] = Form.useForm();

  
  const handleSave = async () => {
    try {
      const values = await form.validateFields(); 
      const { firstName , phoneNumber, password} = values; 

      console.log({firstName , phoneNumber, password}); 
     
      await editEmployee(userId, {firstName , phoneNumber, password});

      form.resetFields(); 
      onClose(); 
    } catch (error) {
      console.error("Validation Failed:", error); 
    }
  };

  return (
    <Modal
      open={visible}
      title="Parol va Telefon Raqamini Yangilash"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Bekor qilish
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          loading={isLoading}
        >
          Saqlash
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {/* Ism input */}
        <Form.Item
          label="Yangi Ism"
          name="firstName"
          rules={[{ required: true, message: "Ismni kiriting!" }]}
        >
          <Input placeholder="Yangi ismingizni kiriting" />
        </Form.Item>

        {/* Telefon raqami input */}
        <Form.Item
          label="Yangi Telefon Raqami"
          name="phoneNumber"
          rules={[{ required: true, message: "Telefon raqamini kiriting!" }]}
        >
          <Input placeholder="Yangi telefon raqamini kiriting" />
        </Form.Item>
      </Form>

      {/* Parol input */}
      <Form.Item
          label="Yangi Parol"
          name="password"
          rules={[
            { required: true, message: "Parolni kiriting!" },
            { min: 6, message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak!" },
          ]}
        >
          <Input.Password placeholder="Yangi parolni kiriting" />
        </Form.Item>
    </Modal>
  );
};

export default EditLoginPasswordModal;