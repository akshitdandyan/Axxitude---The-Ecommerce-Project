import React, { useEffect } from 'react'
import './Main.css'
import Video from './VideoComponent/Video1'
import MainContent from './Main_Content/Main_Content'
import Video2 from './../Main/VideoComponent/Video2'
import ty from './../../Media/IMAGES/ty.png'
import Register from './../Register/Register';
import Login from './../Login/Login'
import Dashboard from './Dashboard/Dashboard'
import { Switch, Route, useHistory } from 'react-router-dom'
export default function Main() {
    const History = useHistory();
    useEffect(()=>{
        if(localStorage.getItem('seller_account_email')!=null){
            History.push('/dashboard')
        }
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
            </Switch>
            <div className='ty'>
                <img src={ty} alt='THANKYOU' />
            </div>

        </div>
    )
}
