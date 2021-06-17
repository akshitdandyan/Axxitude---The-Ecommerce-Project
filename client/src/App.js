import './App.css';
import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import SampleProductsHomePage from './components/sampleproducts/SampleProductsHomePage';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Register from './components/register/Register';
import Contact from './components/contact/Contact';
import Signin from './components/signin/Signin';
import UserProfile from './components/userProfile/UserProfile';
import PrivacyPolicy from './components/Legals/PrivacyPolicy';
import TermsOfService from './components/Legals/TermsOfService'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import ChatBox from './components/ChatRoom/ChatBox';

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
            <Route path="/privacypolicy" exact component={PrivacyPolicy} />
            <Route path="/termsofservice" exact component={TermsOfService} />
            <Route path="/chat" exact component={ChatBox} />
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
