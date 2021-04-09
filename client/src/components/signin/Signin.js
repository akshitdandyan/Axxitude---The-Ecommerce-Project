import React from 'react'
import './signin.css'
function Signin() {
    return (
        <div className="signin">
            <div className="signinheading"><h1>Sign In</h1></div>
            <form>
                <div>
                    <label>Email</label>
                    <input type="email" required/>
                    <br />
                    <label>Password</label>
                    <input type="password" required/>
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Signin
