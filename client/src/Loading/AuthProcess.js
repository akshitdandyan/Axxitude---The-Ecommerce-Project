import './AuthProcess.css';
import React, { useEffect, useState } from 'react'

function AuthProcess() {
    const [joke,setJoke] = useState({setup:'',punchline:''})
    useEffect(() => {
        fetch('https://official-joke-api.appspot.com/random_joke')
            .then(res=>res.json())
            .then((json)=>{
               setJoke({setup:json.setup,punchline:json.punchline})
            })
        .catch(err => {
            console.error(err);
        });
    },[])
    return (
        <div className='AuthProcess'>
            <div className='AuthProcess_Rotator'></div>
           {joke.setup!=='' && <>
            <h3 >Here's some boring stuff while we load your data</h3>
            <div className='randomJoke'>
                <div className='setup'>{joke.setup}</div>
                <div className="punchline">{joke.punchline}</div>
            </div>
            </>}
        </div>
    )
}

export default AuthProcess
