import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './Signup.css'
import {decodeToken} from 'react-jwt'

function Signup() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", location: "", password: "", email: "" })
    const handleClick = async (event) => {
        event.preventDefault();
        console.log(JSON.stringify({ email: credentials.email, location: credentials.location, name: credentials.name, password: credentials.password }))
        let result = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, location: credentials.location, name: credentials.name, password: credentials.password })
        })
        const json = await result.json();
        console.log("json",json);
        if(json.success){
            localStorage.setItem("authToken",json.authToken);
            const token = localStorage.getItem("authToken");
            const decodedToken = decodeToken(token)
            console.log("decode: ",decodedToken.user.id);
            console.log(localStorage.getItem("authToken"));

            navigate('/')
        }
        if (!json.success) {
            alert('fill the credentials properly')
        }
    }
    const emptyDetails=()=>{
        if(credentials.email === "" || credentials.name === "" || credentials.password ==="" || credentials.location === ""){
            alert("pls fill the forms")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h1 style={{ "textAlign": "center" }}>Let'sEat😋</h1>
            <form className='form' onSubmit={handleClick}>
                <div className="form-group mb-2">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input type="text" name='name' className="form-control" id="exampleInputName1" placeholder="Name" onChange={onChange} value={credentials.name} style={{ "width": "100%" }} />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="exampleInputPassword1">Location</label>
                    <input type="text" name='location' className="form-control" id="exampleInputlocation1" placeholder="Location" onChange={onChange} value={credentials.location} style={{ "width": "100%" }} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" style={{ "width": "100%" }}/>
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
                <button type="submit" className="btn btn-success mb-2" onClick={emptyDetails} style={{ "width": "80px" }}>Sign up</button>
                </div>
                <Link to={'/login'} className="btn btn-danger" style={{ "width": "140px" }}>Already a user</Link>
            </form>
        </div>
    )
}
export default Signup
