import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HistoryTable from "./components/Table";
import CRangePicker from "../../../../components/RangePicker";
import PrevBtn from "../../../../components/PrevBtn";
import useGetData from "../../../../hooks/useGetData";

const HistoryReadyProduct = () => {
  const [dates, setDates] = useState([null, null]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const { id } = useParams();

  const { data, loading, refetch } = useGetData(
    dates[0] && dates[1]
      ? `api/ready-conserve-history/by-conserve-type/${id}?from=${dates[0]}&to=${dates[1]}&limit=${pagination.pageSize}&page=${pagination.current}`
      : `api/ready-conserve-history/by-conserve-type/${id}?limit=${pagination.pageSize}&page=${pagination.current}`
  );

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    refetch();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PrevBtn text="Mahsulotlar"></PrevBtn>
        <CRangePicker setDates={setDates} />
      </div>
      <HistoryTable
        data={data}
        refetch={refetch}
        loading={loading}
        pagination={pagination}
        onPaginationChange={handleTableChange}
      />
    </div>
  );
};

export default HistoryReadyProduct;
