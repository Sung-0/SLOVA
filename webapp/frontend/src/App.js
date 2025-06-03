import './App.css';
import React from 'react';
import Header from './compoents/Header';
import Body from './compoents/Body';
import Sidebar from './compoents/Sidebar';
import Footer from './compoents/Footer';
import { AppContextProvider } from './compoents/context';

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Header />
        <div className='main-content'>
          <div className='body'>
            <Body />
          </div>
          <div className='sidebar'>
            <Sidebar />
          </div>
        </div>
        <Footer />
      </div>
    </AppContextProvider>
  );
}

export default App;
