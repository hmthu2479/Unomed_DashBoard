import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { createUsers } from "../../redux/userSlice";
import { fetchUsers } from '../../redux/userSlice.jsx';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
        

const AddUserForm = ({setVisible}) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUsers(user))
    .unwrap()
    .then((data) => {
      console.log("User data:",data);
      navigate(`/users/${data.id}`, { state: { id: data.id } });
      setVisible(false);
      return data;
    })

  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

    return(
      <>
        <form onSubmit={handleSubmit} className="flex flex-wrap align-items-center justify-content-center gap-3 mt-2">
          <InputText name = "first_name" placeholder="First Name" onChange={handleChange}></InputText>
          <InputText name = "last_name" placeholder="Last Name" onChange={handleChange}></InputText>
          <Button label="Submit" />
        </form>
      </>
    );
};
export default AddUserForm;