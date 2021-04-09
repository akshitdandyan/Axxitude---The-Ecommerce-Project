import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import SampleProductsHomePage from './SampleProductsHomePage';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Register from './components/register/Register';
import Contact from './components/contact/Contact';
import Signin from './components/signin/Signin';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <main>
          <Router> 
            <Navbar />
            <Switch>
              <Route path="/" exact component={SampleProductsHomePage}/>
              <Route path="/register" exact component={Register }/>
              <Route path="/about" exact component={About}/>
              <Route path="/signin" exact component={Signin}/>
              <Route path="/contact" exact component={Contact}/>
            </Switch>
          </Router>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
