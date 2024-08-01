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

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();

  const topItems = [
    { icon: 'pi pi-arrow-left'},
    { icon: 'pi pi-home', path: '/' },
    { icon: 'pi pi-users', path: '/users' },
    { icon: 'pi pi-send', path: '/send' },
    { icon: 'pi pi-tablet', path: '/tablets' },
  ];

  const bottomItems = [
    { icon: 'pi pi-cog', path: '/cog' },
    { icon: 'pi pi-question-circle', path: '/qa' },
    { icon: 'pi pi-sign-out', path: '/sign-out' }
  ];

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const renderMenuItems = (items) => 
    items.map(item => ({
      template: () => (
        <button
          className={`p-menuitem-link ${activeItem === item.path ? 'active' : ''}`}
          onClick={() => item.path && navigate(item.path)}
        >
          <i className={`${item.icon} p-menuitem-icon`}></i>
        </button>
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
      <div className="flex flex-column h-full w-full mt-2">
        <div className="top-menu">
          <Menubar model={renderMenuItems(topItems)} className="custom-menubar top" />
        </div>
        <div className="bottom-menu mt-auto mb-3"> 
          <Menubar model={renderMenuItems(bottomItems)} className="custom-menubar" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
