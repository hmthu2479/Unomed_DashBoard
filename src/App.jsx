import React from 'react';
import NavBar from './Components/NavBar/NavBar'
import Main from './Components/Main/Main';
import 'primeflex/primeflex.css';

const App = () =>{
  return(
    <div class='flex'>
      <NavBar/>
      <Main/>
    </div>
  )
} 
export default App;