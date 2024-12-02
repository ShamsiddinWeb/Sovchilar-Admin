import { Modal } from 'antd'
import React from 'react'

const ModalComponent = ({ title, isOpen, onCancel, children }) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      footer={false}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  )
}

export default ModalComponent