import React from 'react';
import './Advertising.css'
import AdvertisingStatic from './AdvertisingStatic'
import AdvertisingDynamic from './AdvertisingDynamic'
import { useDispatch, useSelector } from 'react-redux';
import { setNewPopUp } from '../../Actions';
import { useHistory } from 'react-router';

const Advertising = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isLogged = useSelector(state=>state.isLoggedIn)
    if(isLogged===false){
        const popUpData = {title:"Access Denied",body:"You need to have a Axxitude Seller's Account in order to practice Advertising."};
        dispatch(setNewPopUp(popUpData))
        history.push('/')
    }
    return (
        <div className="AdvertisingComponent">
           <AdvertisingStatic />
           <AdvertisingDynamic />
        </div>
    )
}

export default Advertising
