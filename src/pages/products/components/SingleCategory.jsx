import React from "react";
import { Button } from "antd";
import PrevBtn from "../../../components/PrevBtn";

const SingleCategory = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <PrevBtn text="Kategoriyalar"></PrevBtn>
        <Button type="primary" >
          Mahsulot qo'shish
        </Button>
      </div>
    </div>
  );
};

export default SingleCategory;
