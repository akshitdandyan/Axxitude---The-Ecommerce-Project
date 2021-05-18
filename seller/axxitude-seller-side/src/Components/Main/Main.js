import React, { useEffect } from 'react';
import './Main.css';
import Video from './VideoComponent/Video1';
import MainContent from './Main_Content/Main_Content';
import Video2 from './../Main/VideoComponent/Video2';
import ty from './../../Media/IMAGES/ty.png';
import Register from './../Register/Register';
import Login from './../Login/Login';
import Dashboard from './Dashboard/Dashboard';
import Profile from './../Profile/Profile';
import Advertising from './Advertising/Advertising'
import About from './../about/About'
import { Switch, Route, useHistory } from 'react-router-dom'
import { LOGOUTAUTH } from '../Constants/Constants';
import { useDispatch } from 'react-redux'
import Contact from './Contact/Contact';
import Analytics from './Analytics/Analytics';
import AccountManagement from './AccountManagement.jsx/AccountManagement';

export default function Main() {
    const History = useHistory();
    const dispatch = useDispatch();
    useEffect(()=>{
        const foo = async() =>{
            if(localStorage.getItem('seller_account_email')!=='null'){
                History.push('/dashboard')
            }else if(localStorage.getItem('seller_account_email')==='null'){
                dispatch({type:LOGOUTAUTH})
                console.log("MAIN _ LOGGED OUT")
            }
        }
        foo()
    },[History])
    return (
        <div className="main">
            <Switch>
                <Route path='/' exact>
                    <Video />
                    <MainContent />
                    <Video2 />
                </Route>
                <Route path="/register" exact component={Register} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/login" exact component={Login} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/advertising" exact component={Advertising} />
                <Route path="/contact" exact component={Contact} />
                <Route path="/about" exact component={About} />
                <Route path="/analytics" exact component={Analytics} />
                <Route path="/account-management" exact component={AccountManagement} />
            </Switch>
            <div className='ty'>
                <img src={ty} alt='THANKYOU' />
            </div>

        </div>
    )
}
