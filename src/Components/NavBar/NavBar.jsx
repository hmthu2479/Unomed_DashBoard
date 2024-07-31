import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import { Menubar } from 'primereact/menubar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import './NavBar.css';
import { classNames } from 'primereact/utils';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('/');
  const location = useLocation();

  const items = [
    { icon: 'pi pi-arrow-left'},
    { icon: 'pi pi-home', path: '/' },
    { icon: 'pi pi-users', path: '/users' },
    { icon: 'pi pi-send', path: '/send' },
    { icon: 'pi pi-tablet', path: '/tablets' },
    { icon: 'pi pi-cog', path: '/cog' },
    { icon: 'pi pi-question-circle', path: '/qa' },
    { icon: 'pi pi-sign-out', path: '/sign-out' }
  ];


  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const menuActived = items.map(item => ({
    template: () => (
      <Link to={item.path} className={`p-menuitem-link ${activeItem === item.path ? 'active' : ''}`}>
        <i className={`${item.icon} p-menuitem-icon`}></i>
      </Link>
    )
  }));

  return (
    <nav className="flex flex-column align-items-center h-screen w-3.2rem">
      <img src={logo} alt="logo" className="navbar-img logo" />
      <Avatar 
        image={avatar} 
        className="navbar-img avatar p-overlay-badge"
      >
        <Badge className="badge" severity="info" />
      </Avatar>
      <div className="flex flex-column justify-content-between h-full w-full mt-2">
        <Menubar model={menuActived} className="custom-menubar" />
      </div>
    </nav>
  );
};

export default NavBar;
