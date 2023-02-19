import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import Badge from 'react-bootstrap/Badge'
import { useCart } from '../ContextReducer'
import { useState } from 'react'

import Cart from '../screen/Cart'

function Navbar() {
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ "background-color": "#00425A", "color": "whitesmoke" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to={"/"} style={{ "color": "whitesmoke" }}>LetsEat</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active " style={{ "color": "white", "fontSize": "18px" }} aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active" style={{ "color": "whitesmoke" }} aria-current="page" to="/myorder">My Orders</Link>
                </li>
                : ""}

            </ul>
            {(!localStorage.getItem("authToken")) ?

              <div className='d-flex'>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle me-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Login
                  </button>
                  <ul class="dropdown-menu">
                    <li><Link class="dropdown-item" to="/admin">Admin</Link></li>
                    <li><Link class="dropdown-item" to="/login">User</Link></li>
                  </ul>
                </div>
                <Link className="btn bg-white me-3 " style={{ "color": "#00425A" }} to={"/createuser"}>Signup</Link>
              </div>

              :
              <div>
                <div className='btn bg-white mx-2' style={{ "color": "#00425A" }}>
                  <Link style={{"textDecoration":"none"}} to="/mycart">My Cart {" "}</Link>
                <Badge pill bg='danger rounded'>{data.length}</Badge>
                </div>
                <div className='btn bg-white mx-2 text-danger' onClick={handleLogout} >LogOut
                </div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
