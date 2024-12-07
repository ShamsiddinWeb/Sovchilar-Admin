
import Header from "./sold-product/Header";
import PaymeTable from "./sold-product/PaymeTable";
import SoldProduct from "./sold-product/SingleShopingTable";

const SingleShop = () => {

  return (
    <>
      <Header data={data}/>
      <SoldProduct />
      <PaymeTable />
    </>
  );
};

export default SingleShop;

const data = {title: "Andalus", address: "Yunusobod 19-kvartal 29-dom 54-xonadon", phone: "+998 (77) 777-77-77"}