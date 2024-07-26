import React, { useState } from 'react';
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

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleMenuClick = (index, changeDesign) => {
    setActiveIndex(index);
    changeDesign();
  };

  const items = [
    {icon: 'pi pi-arrow-left', command: () => { window.location.hash = "/back"; }},
    {icon: 'pi pi-home', command: () => { window.location.hash = "/"; }},
    {icon: 'pi pi-users', command: () => { window.location.hash = "/users"; }},
    {icon: 'pi pi-send', command: () => { window.location.hash = "/send"; }},
    {icon: 'pi pi-tablet', command: () => { window.location.hash = "/tablet"; }},
    {icon: 'pi pi-cog', command: () => { window.location.hash = "/cog"; }},
    {icon: 'pi pi-question-circle', command: () => { window.location.hash = "/question"; }},
    {icon: 'pi pi-sign-out', command: () => { window.location.hash = "/sign-out"; }}
  ];

  const menuActived = items.map((item, index) => ({
    ...item,
    className: classNames({ 'active': index === activeIndex }),
    command: () => handleMenuClick(index, item.changeDesign)
  }));

  return (
    <nav className="flex flex-column align-items-center h-screen w-3.2rem">
      <img src={logo} alt="logo" className="navbar-logo" style={{ width: '35px', height: '35px', marginTop: '10px' }} />
      <Avatar 
        image={avatar} 
        className="navbar-avatar p-overlay-badge" 
        style={{ width: '35px', height: '35px', marginTop: '12px', cursor: 'pointer' }}
      >
        <Badge className="badge" severity="info" /> {/* Add severity or style if needed */}
      </Avatar>
      <div className="flex flex-column justify-content-between h-full w-full mt-2">
        <Menubar model={menuActived} className="custom-menubar" />
      </div>
    </nav>
  );
};

export default NavBar;
