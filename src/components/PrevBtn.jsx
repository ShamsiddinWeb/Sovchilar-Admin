import { Button } from 'antd';
import React from 'react'
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const PrevBtn = ({text}) => {
    const navigate = useNavigate()
  return (
    <Button onClick={() => navigate(-1)} type="link" className='flex items-center gap-[3px]'><GrLinkPrevious /> <div>{text}</div></Button>
  )
}

export default PrevBtn