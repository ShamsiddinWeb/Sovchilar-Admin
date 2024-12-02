import React from 'react'
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const navigate = useNavigate()
  
  return (
    <Result
      status="404"
      title="404"
      subTitle="Kechirasiz, siz tashrif buyurgan sahifa mavjud emas."
      extra={<Button onClick={() => navigate("/")} type="primary">Bosh sahifaga qaytish</Button>}
    />
  )
}

export default Error404