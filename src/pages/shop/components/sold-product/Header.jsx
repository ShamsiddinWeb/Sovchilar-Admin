import { useState } from "react";
import CRangePicker from "../../../../components/RangePicker";

const Header = ({ data }) => {
  const [dates, setDates] = useState([null, null])

  console.log(dates);
  
  return (
    <div className="flex justify-between">
      <div className="text-[16px] mb-10">
        <p>
          <span className="font-medium">Tashkilot nomi: </span>
          <span>{data?.title}</span>
        </p>
        <p>
          <span className="font-medium">Tashkilot manzili: </span>
          <span>{data?.address}</span>
        </p>
        <p>
          <span className="font-medium">Tashkilot telefoni: </span>
          <span>{data?.phone}</span>
        </p>
      </div>

      <div>
        <CRangePicker setDates={setDates}/>
      </div>
    </div>
  );
};

export default Header;
