import { Button } from 'antd';
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

const PrevBtn = ({text, clazz}) => {
    const navigate = useNavigate()
  return (
    <Button onClick={() => navigate(-1)} type="link" className={`flex items-center gap-[3px] ${clazz}`}><GrLinkPrevious /> <div>{text}</div></Button>
  )
}

export default PrevBtn