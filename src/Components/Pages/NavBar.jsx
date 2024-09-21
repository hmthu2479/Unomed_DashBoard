import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
<<<<<<< HEAD:src/Components/Pages/NavBar.jsx
import '../Style/NavBar.css';
=======
import '../CSS/NavBar.css';
>>>>>>> 43a67bc5dd26a353eacb9a93567bbfde82059b73:src/Components/NavBar/NavBar.jsx

const NavBar = () => {
  const topItems = [
    { icon: 'pi pi-arrow-left', path: 'back' },
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

  return (
    <nav className="flex flex-column align-items-center h-screen w-3.2rem">
      <img src={logo} alt="logo" className="navbar-img logo" />
      <Avatar 
        image={avatar} 
        className="navbar-img avatar p-overlay-badge"
      >
        <Badge className="badge" severity="info" />
      </Avatar>
      <div className="flex flex-column h-full w-full align-items-center mt-2">
        <div className="top-menu">
          {topItems.map((item, index) => (
            <div key={index}>
              <NavLink 
                to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
              {({isActive}) => (<i className={`nav-item ${item.icon} ${isActive ? 'active' : ''}`}></i>)}
              </NavLink>
            </div>
          ))}
        </div>
        <div className="bottom-menu mt-auto mb-3 custom-menubar"> 
          {bottomItems.map((item, index) => (
            <div key={index}>
              <NavLink 
                to={item.path}
              >
                {({isActive}) => (<i className={`nav-item ${item.icon} ${isActive ? 'active' : ''}`}></i>)}
                
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;