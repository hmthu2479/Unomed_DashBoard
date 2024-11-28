import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import 'primeflex/primeflex.css';
import { Panel } from 'primereact/panel';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import '../Style/UserProfile.css';
import { deleteUsers, updateUsers } from '../../redux/userSlice.jsx';
import { useDispatch } from 'react-redux';

const UserProfile = () => {
  const users = useSelector((state) => state.user.users);
  const id = useLocation().state.id;
  const userId = users.find((u) => u.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState(`${userId.first_name} ${userId.last_name}`);

  useEffect(() => {
    setUpdateData(`${userId.first_name} ${userId.last_name}`);
  }, [userId]);


  const handleUpdateUser = () => {
    const [first_name, last_name] = updateData.split(' ');
    dispatch(updateUsers({
      id,
      first_name,
      last_name
    }));
  };

  const handleDelete = () => {
    console.log('id to delete:', id);
    dispatch(deleteUsers(id));
    navigate('/users');
  };

  const header = (
    <div className="flex align-items-center justify-content-between w-full">
      <div className="title custom-header flex align-items-center border-bottom-none w-auto m-0">
        <span className="text-xl text-900 font-bold">
          <i className="pi pi-users mx-2"></i>
          {updateData}
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
      <button className="update-btn" onClick={() => setIsEditing(!isEditing)}>
        <i className={`pi ${isEditing ? 'pi-check' : 'pi-pencil'}`}></i>
      </button>

        <button className="delete-btn" onClick={handleDelete}>
          <i className="pi pi-times"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className='w-full h-full'>
      <Panel header={header}>
        {isEditing ? (
          <h2>
            User name:
            <Inplace closable onClose={handleUpdateUser}>
              <InplaceDisplay>
                {updateData}
              </InplaceDisplay>
              <InplaceContent>
                <InputText
                  value={updateData}
                  onChange={(e) => {setUpdateData(e.target.value)}}
                  autoFocus
                />
              </InplaceContent>
            </Inplace>
          </h2>
        ) : (
          <h2>User Name: {updateData}</h2>
        )}
      </Panel>
    </div>
  );
};

export default UserProfile;
