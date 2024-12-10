import React, { useState } from "react";
import { FaChartBar, FaDollarSign, FaShoppingCart } from "react-icons/fa";
import ModalComponent from "../../components/Modal";

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
    // Add more monthly data if needed
  ];

  const [productType, setProductType] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [usedResources, setUsedResources] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Analitika Bo'limi</h1>
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Oylik Hisobot
        </button>
      </div>

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

      <ModalComponent
        title="Oylik Hisobot"
        isOpen={isReportModalOpen}
        onCancel={() => setIsReportModalOpen(false)}
      >
        <div className="overflow-auto max-h-64">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-gray-600 sticky top-0 text-left">
                <th className="px-4 py-2 border border-gray-200 font-semibold">Oy</th>
                <th className="px-4 py-2 border border-gray-200 font-semibold">Sotilgan</th>
                <th className="px-4 py-2 border border-gray-200 font-semibold">Tushum</th>
                <th className="px-4 py-2 border border-gray-200 font-semibold">Ishlab Chiqarilgan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`border-t border-gray-200 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50`}
                >
                  <td className="px-4 py-2 border border-gray-200">{item.oy}</td>
                  <td className="px-4 py-2 border border-gray-200">{item.sotilgan} dona</td>
                  <td className="px-4 py-2 border border-gray-200">{item.tushum} so'm</td>
                  <td className="px-4 py-2 border border-gray-200">
                    {item.ishlabChiqarilgan} dona
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModalComponent>

      <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Resurs Hisobi</h2>
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
