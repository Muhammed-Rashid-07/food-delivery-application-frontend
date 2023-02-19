import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'

function AdminLogin() {

    const [credentials,setCredentials] = useState({email:"",password:""})
    const navigate = useNavigate();

    
    const handleClick=async(event)=>{
        event.preventDefault();
        console.log(JSON.stringify({email:credentials.email,password:credentials.password}));
        let result = await fetch('http://localhost:5000/admin/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        })
        const json = await result.json();
        console.log("json",json);
        if(json.success){
            navigate("/");
        }
        if(!json.success){
            alert('You are not a real admin.')
        }

        
    }
    const onChange=(e)=>{
            setCredentials({...credentials,[e.target.name]:e.target.value})
    }


    return (
        <div className='container' style={{"display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"}}>
            <h1>Let'sEat😋</h1>
            <h2>Admin Panel</h2>
            <form onSubmit={handleClick} className='form'  style={{"marginLeft":"auto","marginRight":"auto"}}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} placeholder="Enter email" style={{ "width": "100%" }}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name='password' className="form-control"  id="exampleInputPassword1" value={credentials.password} placeholder="Password" onChange={onChange} style={{ "width": "100%" }} />
                </div>
                <div>
                <button type="submit"  className="btn btn-success mb-2" style={{ "width": "80px" }}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default AdminLogin;
