import { useEffect, useState, useRef } from 'react';

const useUser = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const isInitialMount = useRef(true);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const timeout = useRef(null);


    useEffect(() => {

        const fetchUsers = async () => {
            setLoading(true);

            let myUrl = `https://dummyjson.com/users`;
            let queryParams = `limit=20&skip=${page * 20}&select=id,firstName,lastName,maidenName,age`;

            if (search) {
                myUrl += '/search';
                queryParams += `&q=${search}`;
            }
            let url = myUrl + '?' + queryParams;

            const response = await fetch(url);
            const data = await response.json();
            setUsers((prevUsers) => [...prevUsers, ...data.users]);
            data.users.length > 0 ? setHasMore(true) : setHasMore(false);
            setLoading(false);
        };

        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            timeout.current = setTimeout(() => {
                fetchUsers();
            }, 500);
        } 

    }, [page,search]);


    useEffect(() => {
        setUsers([]);
        setPage(0);
    }, [search]);

    const fetchMoreData = () => {
        if (loading||!hasMore) return;
        setPage((prevPage) => prevPage + 1)
    }
    
    return { users,hasMore, fetchMoreData, setSearch, search, loading };
};

export default useUser;
