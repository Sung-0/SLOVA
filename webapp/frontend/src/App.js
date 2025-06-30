import './App.css';
import React from 'react';
import Header from './compoents/Header';
import Body from './compoents/Body';
import Sidebar from './compoents/Sidebar';
import Footer from './compoents/Footer';
import { ToastContainer } from 'react-toastify';
import { AppContextProvider } from './compoents/context/index';
import SidebarCloseButton from "./compoents/SidebarCloseButton";

function App() {

  return (
    <AppContextProvider>
      <ToastContainer />
      <div className="App">
        <Header />
        <div className='main-content'>
            <Body />
            <SidebarCloseButton />
            <Sidebar />
        </div>
        <Footer />
      </div>
    </AppContextProvider>
  );
}

export default App;
