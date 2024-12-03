
import React, { useState } from "react";
import { FaChartBar, FaDollarSign, FaShoppingCart } from "react-icons/fa";

const Analytics = () => {
  const data = [
    {
      oy: "Yanvar",
      sotilgan: 120,
      tushum: 300000,
      ishlabChiqarilgan: 150,
      resurslar: {
        goosht: 50,
        haropka: 10,
        butulka: 60,
        kirichka: 40,
        periprava: 15,
        yog: 20,
        etiketka: 10,
        termoPlonka: 5,
      },
    },
    {
      oy: "Fevral",
      sotilgan: 110,
      tushum: 280000,
      ishlabChiqarilgan: 130,
      resurslar: {
        goosht: 45,
        haropka: 9,
        butulka: 55,
        kirichka: 35,
        periprava: 12,
        yog: 18,
        etiketka: 9,
        termoPlonka: 4,
      },
    },
    // Qo'shimcha oylik ma'lumotlar kiritilishi mumkin
  ];

  const [productType, setProductType] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [usedResources, setUsedResources] = useState(null);

  const umumiyHisobla = () => {
    const umumiy = data.reduce(
      (acc, item) => {
        acc.sotilgan += item.sotilgan;
        acc.tushum += item.tushum;
        acc.ishlabChiqarilgan += item.ishlabChiqarilgan;
        Object.keys(item.resurslar).forEach((key) => {
          acc.resurslar[key] += item.resurslar[key];
        });
        return acc;
      },
      {
        sotilgan: 0,
        tushum: 0,
        ishlabChiqarilgan: 0,
        resurslar: {
          goosht: 0,
          haropka: 0,
          butulka: 0,
          kirichka: 0,
          periprava: 0,
          yog: 0,
          etiketka: 0,
          termoPlonka: 0,
        },
      }
    );
    return umumiy;
  };

  const calculateResources = () => {
    if (productType && productCount > 0) {
      const resourceUsage = {
        goosht: productCount * 0.5,
        haropka: productCount * 0.1,
        butulka: productCount * 0.6,
        kirichka: productCount * 0.4,
        periprava: productCount * 0.15,
        yog: productCount * 0.2,
        etiketka: productCount * 0.1,
        termoPlonka: productCount * 0.05,
      };
      setUsedResources(resourceUsage);
    } else {
      alert("Mahsulot turi va sonini kiriting!");
    }
  };

  const umumiy = umumiyHisobla();

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Analitika Bo'limi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <FaShoppingCart className="text-blue-500 text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Umumiy Sotilgan</h2>
          <p className="text-xl font-bold">{umumiy.sotilgan} dona</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <FaDollarSign className="text-green-500 text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Umumiy Tushum</h2>
          <p className="text-xl font-bold">{umumiy.tushum} so'm</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <FaChartBar className="text-yellow-500 text-3xl mb-2" />
          <h2 className="text-lg font-semibold">Ishlab Chiqarilgan</h2>
          <p className="text-xl font-bold">{umumiy.ishlabChiqarilgan} dona</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Oyma-Oy Hisobot</h2>
      <div className="bg-white rounded shadow overflow-auto max-h-64">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 sticky top-0">
              <th className="px-4 py-2">Oy</th>
              <th className="px-4 py-2">Sotilgan</th>
              <th className="px-4 py-2">Tushum</th>
              <th className="px-4 py-2">Ishlab Chiqarilgan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-t text-gray-700 hover:bg-gray-100"
              >
                <td className="px-4 py-2">{item.oy}</td>
                <td className="px-4 py-2">{item.sotilgan} dona</td>
                <td className="px-4 py-2">{item.tushum} so'm</td>
                <td className="px-4 py-2">{item.ishlabChiqarilgan} dona</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">
        Resurs Hisobi
      </h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <label className="block mb-2 font-semibold">Mahsulot Turi:</label>
        <input
          type="text"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="border px-4 py-2 rounded w-full mb-4"
        />
        <label className="block mb-2 font-semibold">Mahsulot Soni:</label>
        <input
          type="number"
          value={productCount}
          onChange={(e) => setProductCount(Number(e.target.value))}
          className="border px-4 py-2 rounded w-full mb-4"
        />
        <button
          onClick={calculateResources}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yuklash
        </button>
      </div>
      {usedResources && (
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Resurslardan Foydalanish:</h3>
          <ul>
            {Object.entries(usedResources).map(([key, value]) => (
              <li key={key} className="text-gray-700">
                {key}: {value} dona
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Analytics;
