import './App.css';
import React from 'react';
import Header from './compoents/Header';
import Body from './compoents/Body';
import Sidebar from './compoents/Sidebar';
import Footer from './compoents/Footer';
import { AppContextProvider } from './compoents/context';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AppContextProvider>
      <ToastContainer />
      <div className="App">
        <Header />
        <div className='main-content'>
            <Body />
            <Sidebar />
        </div>
        <Footer />
      </div>
    </AppContextProvider>
  );
}

export default App;
