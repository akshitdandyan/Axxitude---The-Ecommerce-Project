import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import SampleProductsHomePage from './components/sampleproducts/SampleProductsHomePage';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Register from './components/register/Register';
import Contact from './components/contact/Contact';
import Signin from './components/signin/Signin';
import UserProfile from './components/userProfile/UserProfile'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';

function initAnalytics(){
  ReactGA.initialize("G-XRJM1D430V")
  ReactGA.pageview("/HomePage")
}

function App() {
  console.log("Axxitude's Web🤍" );

  initAnalytics();
  return (
    <div className="app">
        <Router>
          <header>
            <Navbar />
          </header>
          <main>
          <Switch>
            <Route path="/" exact component={SampleProductsHomePage} />
            <Route path="/register" exact component={Register} />
            <Route path="/about" exact component={About} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/myProfile" exact component={UserProfile} />
          </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </Router>
    </div>
  );
}

export default App;
