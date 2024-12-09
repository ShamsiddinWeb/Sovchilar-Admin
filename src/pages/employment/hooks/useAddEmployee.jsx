import { useState } from "react";
import { toast } from "react-toastify";
import Service from "../service/service";

function useAddEmployee() {
  const [isLoading, setIsLoading] = useState(false);

  const addNewEmployee = async (data) => {
    setIsLoading(true);
    try {
      const response = await Service.post(data);
      toast.success("Ishchi muvaffaqiyatli qo'shildi");
      Service.getAll();
      return response;
    } catch (err) {

      const errorMessage =
        err?.response?.data?.error?.response?.message?.[0] ||
        "Ishchi qo'shishda xatolik yuz berdi";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addNewEmployee,
    isLoading,
  };
}

export default useAddEmployee;
