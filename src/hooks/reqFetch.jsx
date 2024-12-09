import { useEffect, useState } from "react";
import api from "../../axios";

const useFetch = (url, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET so'rovni amalga oshirish uchun funksiya
  const getData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(url);
      if (response?.status !== 200) {
        throw new Error("Xato yuz berdi!");
      }
      setData(response?.data?.data || []);
    } catch (err) {
      setError(err.message || "Noma'lum xato ro'y berdi");
    } finally {
      setLoading(false);
    }
  };

  // POST so'rovni amalga oshirish uchun funksiya
  const postData = async (newData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(url, newData);
      if (response?.status !== 201) {
        throw new Error("POST xatosi yuz berdi!");
      }
      // Yangi ma'lumot qo'shilgandan so'ng GET so'rovni qayta ishga tushiramiz
      await getData();
    } catch (err) {
      setError(err.message || "Qo'shishda qilishda xato yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  // Delete so'rovni amalga oshirish uchun funksiya
  const deleteData = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.delete(`${url}/${id}`);
      if (response?.status !== 200) {
        throw new Error("O'chirishda xatosi yuz berdi!");
      }
      // Yangi ma'lumot qo'shilgandan so'ng GET so'rovni qayta ishga tushiramiz
      await getData();
    } catch (err) {
      setError(err.message || "O'chirishda qilishda xato yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  // EDIT (PUT) so'rovni amalga oshirish uchun funksiya
  const editData = async (id, updatedData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.patch(`${url}/${id}`, updatedData);
      if (response?.status !== 200) {
        throw new Error("EDIT xatosi yuz berdi!");
      }
      // Ma'lumot yangilangandan so'ng GET so'rovni qayta ishga tushiramiz
      await getData();
    } catch (err) {
      setError(err.message || "Tahrirlashda qilishda xato yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  // useEffect orqali birinchi GET so'rovni amalga oshirish
  useEffect(() => {
    getData();
    // dependencies orqali qayta ishga tushiriladi
  }, dependencies);

  return { data, loading, error, postData, editData, getData, deleteData };
};

export default useFetch;
