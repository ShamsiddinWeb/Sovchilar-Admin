import { useState, useEffect } from "react";
import api from "../../axios";

const useGetData = (endpoint, config) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(endpoint, config);
      setData(response?.data?.data);
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, config]);

  return { data, loading, error, refetch: fetchData };
};

export default useGetData;