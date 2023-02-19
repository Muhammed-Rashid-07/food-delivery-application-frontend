import React, { useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
//import { decodeToken } from 'react-jwt'

export default function Login() {
    const [credentials, setCredentials] = useState({ password: "", email: "" })
    let navigate = useNavigate();





    const handleClick = async (event) => {
        event.preventDefault();
        console.log(JSON.stringify({ email: credentials.email, location: credentials.location, name: credentials.name, password: credentials.password }))
        let result = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await result.json();
        if (json.success) {
            localStorage.setItem("authToken", json.authToken)
            let token = localStorage.getItem("authToken")
            console.log('localStorage', localStorage.getItem("authToken"));
            navigate('/')
        }
        if (!json.success) {
            alert('Enter valid credentials')
        }
    }

    /***************   function to check if input is empty   ****************/
    const check_fill = () => {
        if (credentials.email === "" || credentials.password === "") {
            alert("fill the credentials")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container' style={{ "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center" }}>
            <h1>Let'sEat😋</h1>
            <form className='form' onSubmit={handleClick} style={{ "marginLeft": "auto", "marginRight": "auto" }}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" style={{ "width": "100%" }} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name='password' className="form-control" onChange={onChange} id="exampleInputPassword1" placeholder="Password" value={credentials.password} style={{ "width": "100%" }} />
                </div>
                <div className="form-group form-check mb-2">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <div>
                    <button type="submit" onSubmit={check_fill} className="btn btn-success mb-2" style={{ "width": "80px" }}>Login</button>
                </div>
                <Link to={'/createuser'} className="btn btn-danger" style={{ "width": "140px" }}>Signup</Link>
            </form>
        </div>
    )
}
