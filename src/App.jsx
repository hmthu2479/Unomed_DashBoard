import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import NavBar from './Components/Pages/NavBar';
import Main from './Components/Pages/Main';
import User from './Components/Pages/User';
=======
import NavBar from './Components/NavBar/NavBar';
import Main from './Components/Pages/Main/Main';
import User from './Components/Pages/UserDirectory/User';
>>>>>>> 43a67bc5dd26a353eacb9a93567bbfde82059b73
import 'primeflex/primeflex.css';

const App = () => {
  return (
    <Router>
    <div className="flex">
      <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;