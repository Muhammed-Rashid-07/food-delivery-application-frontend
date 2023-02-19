import React from 'react'
import { Link } from 'react-router-dom';
function AdminNav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ "background-color": "#00425A", "color": "whitesmoke" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{"color":"whitesmoke","fontSize":"25px"}}>Let's Eat</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active text-white"  aria-current="page" to="#">Home</Link>
                            </li>
                            <li className="nav-item d-flex">
                                <Link className="nav-link text-white" to="#">View-Products</Link>
                            </li>
                            <li className="nav-item d-flex">
                                <Link className="nav-link text-white" to="#">Add-Products</Link>
                            </li>
                            <li className="nav-item d-flex">
                                <Link className="nav-link text-white" to="#">View-Users</Link>
                            </li>
                        </ul>
                        <div>
                            <Link className='btn bg-white text-black' to='/adminlogin'>Login</Link>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNav
