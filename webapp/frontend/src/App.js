import './App.css';
import React from 'react';
import Header from './compoents/Header';
import Body from './compoents/Body';
// import Sidebar from './compoents/Sidebar';
import Footer from './compoents/Footer';
import { MapProvider } from "./compoents/map/MapContext.js";

function App() {
  return (
    <MapProvider>
      <div className="App">
        <Header />
        <div className='main-content'>
          <Body />
          {/* <Sidebar /> */}
        </div>
        <Footer />
      </div>
    </MapProvider>
  );
}

export default App;
