import 'primeflex/primeflex.css';
import Header from './Header';
import Dashboard from './Dashboard';
<<<<<<<< HEAD:src/Components/Pages/Main.jsx
import '../Style/Main.css';
========
import '../../CSS/Main.css'
>>>>>>>> 43a67bc5dd26a353eacb9a93567bbfde82059b73:src/Components/Pages/Main/Main.jsx

const Main = () => {
  return (
    <main className="flex flex-wrap h-screen p-2 bg-surface-0 m-0 custom-main">
      <Header />
      <Dashboard />
    </main>
  );
};

export default Main;
