import { Splitter, SplitterPanel } from 'primereact/splitter';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
<<<<<<<< HEAD:src/Components/Pages/User.jsx
import useUser from '../Hooks/useUser.jsx';
import { useEffect, useState } from 'react';
import '../Style/User.css';
import image from '../../assets/book&pen.png';
========
import { useUser } from '../../Hook/useUser.jsx';
import '../../CSS/User.css';
import image from '../../../assets/book&pen.png';
>>>>>>>> 43a67bc5dd26a353eacb9a93567bbfde82059b73:src/Components/Pages/UserDirectory/User.jsx
import InfiniteScroll from 'react-infinite-scroll-component';
import 'primeflex/primeflex.css';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';

const User = () => {
<<<<<<<< HEAD:src/Components/Pages/User.jsx
  const { users, fetchMoreData,hasMore, search, setSearch, loading } = useUser();
  const randomColor = () => {
    const r = (Math.floor(Math.random()*55)+200);
    const b = (Math.floor(Math.random()*55)+200);
    const g = (Math.floor(Math.random()*55)+200);
    return `rgb(${r},${g},${b})`;
};
========
  const { error, search, setSearch, data, hasMore, fetchMoreData } = useUser();
>>>>>>>> 43a67bc5dd26a353eacb9a93567bbfde82059b73:src/Components/Pages/UserDirectory/User.jsx

  const AvatarUser = (user) => {
    const [color, setColor] = useState('');
  
    useEffect(() => {
      setColor(randomColor());
    },[]);
  
    return (
      <Avatar
        className="p-overlay-badge"
        style={{ backgroundColor: color, color: '#000' }}
      >
        <span>{user.firstName.charAt(0)}</span>
        <i className="fa-solid fa-circle-dot badge-icon" />
      </Avatar>
    );
  };
  const sendIcon = () => <i className="pi pi-send" />;
  const userName = (user) => <span>{`${user.firstName} ${user.lastName}`}</span>;

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
<<<<<<<< HEAD:src/Components/Pages/User.jsx
            dataLength={users.length}
========
            dataLength={data.length}
>>>>>>>> 43a67bc5dd26a353eacb9a93567bbfde82059b73:src/Components/Pages/UserDirectory/User.jsx
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              !loading &&
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            scrollableTarget="scrollableDiv"
          >
            <DataTable
<<<<<<<< HEAD:src/Components/Pages/User.jsx
              value={users}
========
              value={data}
>>>>>>>> 43a67bc5dd26a353eacb9a93567bbfde82059b73:src/Components/Pages/UserDirectory/User.jsx
              header={header}
              scrollable
              scrollHeight="flex"
              sortField=""
              className=" text-sm"

            >
<<<<<<<< HEAD:src/Components/Pages/User.jsx
              <Column header="" body={AvatarUser} className="px-3" />
              <Column field="firstName" header="Name" body={userName} sortable style={{ width:'25%'}}  />
              <Column header="Kurzbezeichnung" body={() => null} sortable style={{ width:'25%'}}  />
              <Column header="Hauptarbeitsort" body={() => null} sortable style={{ width:'25%'}} />
              <Column header="" body={sendIcon} className="pr-4" />
========
              <Column header="" body={avatarBodyTemplate} className="px-3" />
              <Column field="firstName" header="Name" body={nameBodyTemplate} sortable />
              <Column header="Kurzbezeichnung" body={() => null} sortable />
              <Column header="Hauptarbeitsort" body={() => null} sortable  />
              <Column header="" body={actionBodyTemplate} className="pr-4" />
>>>>>>>> 43a67bc5dd26a353eacb9a93567bbfde82059b73:src/Components/Pages/UserDirectory/User.jsx
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