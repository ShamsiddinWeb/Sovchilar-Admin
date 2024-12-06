import { useState } from "react";
import CRangePicker from "../../../../components/RangePicker";
import PrevBtn from "../../../../components/PrevBtn";

const Header = ({ data }) => {
  const [dates, setDates] = useState([null, null]);

  console.log(dates);

  return (
    <div className="flex justify-between">
      <div className="text-[16px] mb-10">
        <PrevBtn text={"Qaytish"} clazz={"p-0 mb-5"} />
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
        <CRangePicker setDates={setDates} />

        <div className="text-[14px] text-black/50 mt-10">
          <p>
            <span className="font-medium">Jami: </span>
            <span>700 000 000</span>
          </p>
          <p>
            <span className="font-medium">To'langan: </span>
            <span>600 000 000</span>
          </p>
          <p>
            <span className="font-medium">Qarzdorligi: </span>
            <span>100 000 000</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
