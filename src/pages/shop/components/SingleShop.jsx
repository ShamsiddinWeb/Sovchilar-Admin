import Header from "./sold-product/Header";
import PaymeTable from "./sold-product/PaymeTable";
import SoldProduct from "./sold-product/SingleShopingTable";
import useFetch from "../../../hooks/reqFetch";
import { useParams } from "react-router-dom";

const SingleShop = () => {
  const { id } = useParams();
  const { data } = useFetch(`/api/stores/${id}`);

  return (
    <>
      <Header data={data} />
      <SoldProduct />
      <PaymeTable data={data} />
    </>
  );
};

export default SingleShop;
