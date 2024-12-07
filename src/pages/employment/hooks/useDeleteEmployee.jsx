import { useState } from "react";
import { toast } from "react-toastify";
import Service from "../service/service";

function useDeleteEmployee() {
  const [isLoading, setIsLoading] = useState(false);

  const deleteEmployee = async (id) => {
    setIsLoading(true);
    try {
      const response = await Service.delete(id);
      toast.success("Ishchi o'chirildi");
      Service.getEmployees();
      return response;
    } catch (err) {
      console.error(err);
      const errorMessage =
        err?.response?.data?.error?.response?.message?.[0] ||
        "Ishchi o'chirishda xatolik yuz berdi";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteEmployee,
    isLoading,
  };
}

export default useDeleteEmployee;

