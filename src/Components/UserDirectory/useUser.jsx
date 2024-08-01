import { useState, useEffect, useRef } from 'react';

const getRandomLightColor = () => {
  const r = Math.floor(Math.random() * 106) + 150;
  const g = Math.floor(Math.random() * 106) + 150;
  const b = Math.floor(Math.random() * 106) + 150;
  return `rgb(${r}, ${g}, ${b})`;
};

export const useFetch = (initialUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const userIds = useRef(new Set());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const currentUrl = `${initialUrl}&skip=${page * 10}`;
      
      try {
        const response = await fetch(currentUrl);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        if (!json.users || json.users.length === 0) {
          setHasMore(false);
        } else {
          const newUsers = json.users.filter(user => !userIds.current.has(user.id));
          newUsers.forEach(user => userIds.current.add(user.id));

          const usersWithColors = newUsers.map(user => ({
            ...user,
            color: getRandomLightColor()
          }));
          setData(prevData => [...prevData, ...usersWithColors]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, initialUrl]);

  const fetchMoreData = () => {
    if (loading || !hasMore) return;
    setPage(prevPage => prevPage + 1);
  };

  const searchedUsers = search
    ? data.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return {
    loading,
    error,
    search,
    setSearch,
    searchedUsers,
    hasMore,
    fetchMoreData
  };
};
