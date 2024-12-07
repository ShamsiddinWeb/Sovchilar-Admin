import { useState } from "react";
import { toast } from "react-toastify";
import Service from "../service/service";

function useEditEmployee() {
  const [isLoading, setIsLoading] = useState(false);

  const editEmployee = async (id, data) => {
    setIsLoading(true);
    try {
      const response = await Service.patch(id, data);
      toast.success("Ishchi muvaffaqiyatli tahrirlandi");
      Service.getAll();
      return response; 
    } catch (err) {

      const errorMessage =
        err?.response?.data?.error?.response?.message?.[0] ||
        "Ishchi tahrirlashda xatolik yuz berdi";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    editEmployee,
    isLoading,
  };
}

export default useEditEmployee;

