import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, Alert, Row, Col, Image } from "antd";
import { toast } from "react-toastify";
import api from "../../../axios";

const Single = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`users-uz/${id}`);
      if (response?.data?.data) {
        setData(response.data.data);
      } else {
        setData(null);
        toast.warning("Foydalanuvchi topilmadi!");
      }
    } catch (err) {
      console.error("Xatolik:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
      toast.error("Foydalanuvchi ma'lumotlarini yuklashda xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Alert
        message="Xatolik"
        description={`Xatolik yuz berdi: ${error}`}
        type="error"
        showIcon
        style={{ margin: "20px" }}
      />
    );
  }

  if (!loading && !data) {
    return (
      <Alert
        message="Foydalanuvchi topilmadi"
        description={`ID: ${id} bo'yicha ma'lumotlar mavjud emas`}
        type="error"
        showIcon
        style={{ margin: "20px" }}
      />
    );
  }

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
           <a
            class="inline-flex items-center mb-8 text-gray-600 hover:text-gray-800 transition-colors"
            href="/"
            data-discover="true"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Orqaga
          </a>
      <h2 className="text-2xl" style={{ textAlign: "center", marginBottom: "40px", }}>
        Foydalanuvchi Ma'lumotlari
      </h2>
      {loading ? (
        <Spin
          tip="Ma'lumotlar yuklanmoqda..."
          style={{ display: "block", margin: "50px auto" }}
        />
      ) : (
        <Card bordered style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={10} style={{ textAlign: "center" }}>
              <Image
                width={250}
                height={250}
                src={data?.imageUrl || "https://via.placeholder.com/150"}
                alt="Foydalanuvchi rasmi"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </Col>

            <Col xs={24} md={12}>
              <p>
                <strong>Ism va Familiya:</strong>{" "}
                {`${data?.firstName || "Noma'lum"} ${data?.lastName || ""}`}
              </p>
              <p>
                <strong>Yosh:</strong> {data?.age || "Noma'lum"}
              </p>

              <p>
                <strong>Manzil:</strong> {data?.address || "Noma'lum"}
              </p>

              <p>
                <strong>Oilaviy Holati:</strong>{" "}
                {data?.maritalStatus || "Noma'lum"}
              </p>
              <p>
                <strong>Kasbi:</strong> {data?.jobTitle || "Noma'lum"}
              </p>
              <p>
                <strong>Ta'lim:</strong> {data?.qualification || "Noma'lum"}
              </p>
              <p>
                <strong>Telefon:</strong> {data?.phone || "Noma'lum"}
              </p>
              <p>
                <strong>Izoh:</strong> {data?.description || "Izoh mavjud emas"}
              </p>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default Single;
