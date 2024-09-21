import 'primeflex/primeflex.css';
import Header from './Header';
import Dashboard from './Dashboard';
import '../Style/Main.css';

const Main = () => {
  return (
    <main className="flex flex-wrap h-screen p-2 bg-surface-0 m-0 custom-main">
      <Header />
      <Dashboard />
    </main>
  );
};

export default Main;
