import React from 'react';
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

const User = () => {
  const { error, search, setSearch, searchedUsers, hasMore, fetchMoreData } = useFetch(
    'https://dummyjson.com/users?limit=10&select=id,firstName,lastName,maidenName,age'
  );

  const avatarBodyTemplate = (rowData) => (
    <Avatar
      className="p-overlay-badge"
      style={{ backgroundColor: rowData.color, color: '#000' }}
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
        <IconField iconPosition="right">
          <InputIcon className="pi pi-search text-sm"> </InputIcon>
          <InputText
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Suchen" className='text-sm border-round-md w-20rem' />
        </IconField>
      </div>
    </div>
  );

  return (
    <Splitter className="w-full h-screen" layout="horizontal">
      <SplitterPanel className="flex align-items-center justify-content-center h-screen" size={60} minSize={40}>
        <div id="scrollableDiv" style={{ height: '100%', overflow: 'auto' }}>
          <InfiniteScroll
            dataLength={searchedUsers.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<p>Loading more...</p>}
            endMessage={<p>No more users to load.</p>}
            scrollableTarget="scrollableDiv"
          >
            {error && <p>Error: {error}</p>}
            <DataTable
              value={searchedUsers}
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
