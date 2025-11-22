import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string) {
  const [data, setData] = useState<T | null>(null);
 
  useEffect(() => {
    if(url){
      fetch(url)
        .then((res) => res.json())
        .then(setData)
        .catch((err) => console.error("Erreur fetch:", err));
    }
  }, [url]);

  return data;
}
