import { useState } from "react";
import { toast } from "react-toastify";
import Service from "../service/service";

function useAttendance() {
  const [isLoading, setIsLoading] = useState(false);

  const addAttendance = async (data) => {
    setIsLoading(true);
    try {
      const response = await Service.attendance(data);
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

  return {
    addAttendance,
    isLoading,
  };
}

export default useAttendance;
