import { useState } from "react";
import CRangePicker from "../../../../components/RangePicker";
import PrevBtn from "../../../../components/PrevBtn";
import useFetch from "../../../../hooks/reqFetch";
import { useParams } from "react-router-dom";

const Header = () => {
  const { id } = useParams();
  const { data } = useFetch(`/api/stores/${id}`);
  const [dates, setDates] = useState([null, null]);

  return (
    <div className="flex justify-between gap-x-5">
      <div className="text-[16px] mb-10">
        <PrevBtn text={"Qaytish"} clazz={"p-0 mb-5"} />
        <p>
          <span className="font-medium">Tashkilot nomi: </span>
          <span>{data?.name}</span>
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
