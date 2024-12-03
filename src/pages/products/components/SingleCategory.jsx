import React from "react";
import { Button } from "antd";

const SingleCategory = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>Mahsulotlar</div>
        <Button type="primary" >
          Mahsulot qo'shish
        </Button>
      </div>
    </div>
  );
};

export default SingleCategory;
