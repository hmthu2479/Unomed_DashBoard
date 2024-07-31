import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        
        //Stop when no more data
        if (!json.users || json.users.length === 0) {
          setHasMore(false);
        }
        
        setData(json.users);
      } catch (error) {
        setError(`${error.message} Could not fetch data`);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, hasMore };
};
