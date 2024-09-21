import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';

const getRandomLightColor = () => {
  const r = Math.floor(Math.random() * 106) + 150;
  const g = Math.floor(Math.random() * 106) + 150;
  const b = Math.floor(Math.random() * 106) + 150;
  return `rgb(${r}, ${g}, ${b})`;
};

export const useUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const userIds = useRef(new Set());

  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let url = `https://dummyjson.com/users?limit=20&skip=${page * 20}&select=id,firstName,lastName,maidenName,age`;
      if (debouncedSearch) {
        url = `https://dummyjson.com/users/search?q=${debouncedSearch}&limit=20&skip=${page * 20}&select=id,firstName,lastName,maidenName,age`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();

        const newUsers = json.users?.filter(user => !userIds.current.has(user.id)) || [];
        newUsers.forEach(user => userIds.current.add(user.id));

        const usersWithColors = newUsers.map(user => ({
          ...user,
          color: getRandomLightColor()
        }));
        
        setData(prevData => [...prevData, ...usersWithColors]);
        setHasMore(json.users.length === 20);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, debouncedSearch]);

  useEffect(() => {
    setData([]);
    userIds.current.clear();
    setHasMore(true);
    setPage(0);
  }, [debouncedSearch]);

  const fetchMoreData = () => {
    if (loading || !hasMore) return;
    setPage(prevPage => prevPage + 1);
  };

  return {
    loading,
    error,
    search,
    setSearch,
    data,
    hasMore,
    fetchMoreData
  };
};
