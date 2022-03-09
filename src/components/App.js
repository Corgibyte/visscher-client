import React from 'react';
import Header from './Header';
import Map from './Map';
import { Helmet } from 'react-helmet';
import ParchmentBackground from '../img/parchmentBackground.jpg';
import "./Header.css";

function App() {
  return (
    <div className="App">
      <Helmet>
        <style>{`body { background-image: url(${ParchmentBackground}); }`}</style>
        <title>Visscher</title>
      </Helmet>
      <Header />
      <Map />
    </div>
  );
}

export default App;
