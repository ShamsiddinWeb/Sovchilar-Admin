import { useState } from "react";
import { toast } from "react-toastify";
import Service from "../service/service";

function useAttendance() {
  const [isLoading, setIsLoading] = useState(false);

  const addAttendance = async (data) => {
    setIsLoading(true);
    try {
      const response = await Service.attendancePost(data);
      toast.success("Davomad muvaffaqiyatli qo'shildi");
      Service.getAll();
      return response;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error?.response?.message?.[0] ||
        "Davomad qo'shishda xatolik yuz berdi";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getAttendance = async (query = {}) => {
    setIsLoading(true);
    try {
      // Pass query params dynamically
      const response = await Service.attendanceGet(query);
      return response?.data || []; // Return the data directly if response is successful
    } catch (err) {
      const errorMessage =
        err?.response?.data?.error?.message?.[0] || // Adjusted error path
        "Davomad olishda xatolik yuz berdi";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addAttendance,
    getAttendance,
    isLoading,
  };
}

export default useAttendance;
