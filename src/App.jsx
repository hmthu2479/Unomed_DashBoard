import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Main from './Components/Main/Main';
import User from './Components/UserDirectory/User';
import 'primeflex/primeflex.css';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <NavBar />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/users" element={<User />} />
          </Routes>
        </div>
    </Router>
  );
};

export default App;
