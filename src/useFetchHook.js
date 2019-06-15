import { useState, useEffect } from "react";

const nextPickup = {
  data: {
    expectedTime: 1710,
    expectedDeliveryTime: 1655,
    porterName: "Joe Porter",
    urgent: true
  }
};

export const useFetch = url => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  async function fetchData() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      if (response.status !== 200) {
        setError(true);
        setData(null);
        setLoading(false);
      } else {
        const json = await response.json();
        setData(json);
        setLoading(false);
      }
    } catch {
      setError(true);
      setData(nextPickup.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error };
};
