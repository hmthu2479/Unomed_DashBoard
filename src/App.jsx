import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/Pages/NavBar';
import Main from './Components/Pages/Main';
import User from './Components/Pages/User';
import 'primeflex/primeflex.css';
import UserProfile from './Components/Pages/UserProfile';

const App = () => {
  return (
    <Router>
    <div className="flex">
      <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/users" element={<User />}>
            <Route path=":userId" element={<UserProfile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;