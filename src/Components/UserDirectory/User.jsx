import React, { useState, useEffect } from 'react';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useFetch } from './useUser.jsx';
import './User.css';
import image from '../../assets/book&pen.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'primeflex/primeflex.css';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import '../Main/Main.css'

const User = () => {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [url, setUrl] = useState(`https://dummyjson.com/users?limit=10&skip=0&select=id,firstName,lastName,maidenName,age`);
  const { data, error, hasMore } = useFetch(url);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (data && data.length > 0) {
      // Remove duplicates based on unique user IDs
      setUsers(prevUsers => {
        const existingUserIds = new Set(prevUsers.map(user => user.id));
        const newUsers = data.filter(user => !existingUserIds.has(user.id));
        return [...prevUsers, ...newUsers];
      });
    }
  }, [data]);

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm) {
      setFilteredUsers(users.filter(user => 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredUsers(users);
    }
  }, [users, searchTerm]);

  const fetchMoreData = () => {
    if (hasMore) {
      const newPage = page + 1;
      setPage(newPage);
      setUrl(`https://dummyjson.com/users?limit=10&skip=${newPage * 10}&select=id,firstName,lastName,maidenName,age`);
    }
  };

  const getRandomLightColor = () => {
    const r = Math.floor(Math.random() * 106) + 150;
    const g = Math.floor(Math.random() * 106) + 150;
    const b = Math.floor(Math.random() * 106) + 150;
    return `rgb(${r}, ${g}, ${b})`;
  };
  
  const avatarBodyTemplate = (rowData) => (
    <Avatar 
      className="p-overlay-badge"
      style={{ backgroundColor: getRandomLightColor(), color: '#000' }}
    >
      <span>{rowData.firstName.charAt(0)}</span>
      <i className="fa-solid fa-circle-dot badge-icon" />
    </Avatar>
  );

  const nameBodyTemplate = (rowData) => <span>{`${rowData.firstName} ${rowData.lastName}`}</span>;
  const actionBodyTemplate = () => <i className="pi pi-send" />;

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2 ">
      <div className="title custom-header flex align-items-center border-bottom-none w-auto m-0">
        <span className="text-xl text-900 font-bold"><i className="pi pi-users mx-2"></i>Verzeichnis</span>
      </div>
      <div className="searchBar ">
        <IconField iconPosition="right" >
            <InputIcon className="pi pi-search text-sm"> </InputIcon>
            <InputText 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            v-model="value1" placeholder="Suchen" className='text-sm border-round-md w-20rem' />
        </IconField>
      </div>
    </div>
  );

  return (
    <Splitter className="w-full h-screen" layout="horizontal">
      <SplitterPanel className="flex align-items-center justify-content-center h-screen" size={60} minSize={40}>
        <div id="scrollableDiv">
          <InfiniteScroll
            dataLength={filteredUsers.length} 
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<p>Loading more...</p>}
            endMessage={<p>All users loaded.</p>}
            scrollableTarget="scrollableDiv"
            style={{ height: '100%' }}
          >
            {error && <p>Error: {error}</p>}
            <DataTable 
              value={filteredUsers} 
              header={header} 
              scrollable 
              scrollHeight="flex" 
              sortField="" 
              className=" text-sm"
            >
              <Column header="" body={avatarBodyTemplate} style={{ width: '80px' }} />
              <Column field="firstName" header="Name" body={nameBodyTemplate} sortable style={{ width: '150px' }} />
              <Column header="Kurzbezeichnung" body={() => null} sortable style={{ width: '180px' }} />
              <Column header="Hauptarbeitsort" body={() => null} sortable style={{ width: '180px' }} />
              <Column header="" body={actionBodyTemplate} style={{ width: '60px' }} />
            </DataTable>
          </InfiniteScroll>
        </div>
      </SplitterPanel>
      <SplitterPanel className="flex flex-column align-items-center justify-content-center text-sm text-900" minSize={40}>
        <img src={image} alt="Placeholder" />
        <p>Wählen Sie einen Benutzer aus, um deren Benutzerprofil anzuzeigen...</p>
      </SplitterPanel>
    </Splitter>
  );
};

export default User;
