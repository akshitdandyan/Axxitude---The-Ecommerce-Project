import './App.css';
import React from 'react'
import Header from './Components/Header/Header'
import Main from './Components/Main/Main'
import Footer from './Components/Footer/Footer'
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
          <Header />
          <Main />
          <Footer />
      </Router>
    </div>
  );
}

export default App;
