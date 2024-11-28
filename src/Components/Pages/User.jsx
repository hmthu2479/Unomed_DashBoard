import { Splitter, SplitterPanel } from 'primereact/splitter';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState, useRef } from 'react';
import '../Style/User.css';
import image from '../../assets/book&pen.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'primeflex/primeflex.css';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Avatar } from 'primereact/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/userSlice.jsx';
import { FilterMatchMode } from 'primereact/api';
import {NavLink, useNavigate, useLocation} from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Outlet } from "react-router-dom";
import AddUserForm from '../Pages/AddUserForm.jsx';


const User = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const users = useSelector((state) => state.user.users);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }});
  const navigate = useNavigate();
  const id = useLocation().state?.id;
  console.log('id:', id);
  const [selectedUser, setSelectedUser] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const randomColor = () => {
    const r = (Math.floor(Math.random() * 55) + 200);
    const b = (Math.floor(Math.random() * 55) + 200);
    const g = (Math.floor(Math.random() * 55) + 200);
    return `rgb(${r},${g},${b})`;
  };

  const AvatarUser = (user) => {
    const [color, setColor] = useState('');

    useEffect(() => {
      setColor(randomColor());
    }, []);

    return (
      <Avatar
        className="p-overlay-badge"
        style={{ backgroundColor: color, color: '#000' }}
      >
        <span>{user.first_name.charAt(0)}</span>
        <i className="fa-solid fa-circle-dot badge-icon" />
      </Avatar>
    );
  };

  const sendIcon = () => <i className="pi pi-send" />;
  const userName = (user) => <span>{`${user.first_name} ${user.last_name}`}</span>;


  const searchUsersOnChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setSearch(value);
  };

  //Pop up dialog
  const headerPopup = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
        <span className="font-bold white-space-nowrap">Add user</span>
    </div>
);


  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2 ">
      <div className="title custom-header flex align-items-center border-bottom-none w-auto m-0">
        <span className="text-xl text-900 font-bold"><i className="pi pi-users mx-2"></i>Verzeichnis</span>
      </div>
      <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <div className="searchBar ">
          <IconField iconPosition="right">
            <InputIcon className="pi pi-search text-sm"> </InputIcon>
            <InputText
              value={search}
              onChange={searchUsersOnChange}
              placeholder="Suchen" className='text-sm border-round-md w-20rem' />
          </IconField>
        </div>
        <button className='add-btn' onClick={() => setVisible(true)} ><i className="pi pi-plus"></i></button>
      </div>

    </div>
  );

  const onRowClick = (e) => {
    navigate(`/users/${e.data.id}`, { state: { id: e.data.id }});
  };


  return (
    <>
      <Splitter className="w-full h-screen" layout="horizontal">
      <SplitterPanel className="flex align-items-center justify-content-center" size={60} minSize={40}>
        <div id="scrollableDiv" style={{ height: '100%', overflow: 'auto' }}>
          <InfiniteScroll
            dataLength={users.length}
            next={() => dispatch(fetchUsers())}
            // hasMore={hasMore}
            // loader={<h4>Loading...</h4>
            // endMessage={
            //   !loading &&
            //   <p style={{ textAlign: 'center' }}>
            //     <b>Yay! You have seen it all</b>
            //   </p>
            // }
            scrollableTarget="scrollableDiv"
          >

          </InfiniteScroll>
          
            <DataTable
              value={users}
              header={header}
              scrollable
              scrollHeight="flex"
              sortField=""
              className=" text-sm"
              filters={filters} filterDisplay="row"
              globalFilterFields={['first_name','last_name']}
              onRowClick={onRowClick}
              selectionMode="single"
              selection={selectedUser}
              onSelectionChange={(e) => setSelectedUser(e.value)}
            >
              <Column header="" body={AvatarUser} className="px-3" />
              <Column field="first_name" header="Name" body={userName} sortable style={{ width: '25%' }} />
              <Column header="Kurzbezeichnung" body={() => null} sortable style={{ width: '25%' }} />
              <Column header="Hauptarbeitsort" body={() => null} sortable style={{ width: '25%' }} />
              <Column header="" body={sendIcon} className="pr-4" />
            </DataTable>
        </div>
      </SplitterPanel>
      <SplitterPanel className="flex flex-column align-items-center justify-content-center text-sm text-900" minSize={40}>
        {!id ? (
          <>
            <img src={image} alt="Placeholder" />
            <p>Wählen Sie einen Benutzer aus, um deren Benutzerprofil anzuzeigen...</p>
          </>

        ) : (<Outlet />)}
      </SplitterPanel>

    </Splitter>
    <Dialog visible={visible} modal header={headerPopup} style={{ width: '20rem', height:'17rem' }} onHide={() => {if (!visible) return; setVisible(false); }}>
      <AddUserForm setVisible={setVisible} />
    </Dialog>
    </>
    
  );
};

export default User;