import './App.css';
import Header from './compoents/Header';
import Body from './compoents/Body';
import Sidebar from './compoents/Sidebar';
import Footer from './compoents/Footer';

function App() {
  return (
    <div className="App">
      <Header />

      <div className='main-content'>
        <Body />
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
