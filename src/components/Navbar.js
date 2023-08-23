import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";




const Navbar = () => {
    let navigate = useNavigate();

    const userDetails = localStorage.getItem('userData')
   
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        
        navigate('/login')
    }
    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                    </li>
                </ul>
                
                {!userDetails ? <form className="d-flex">
                   <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                   <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                </form>:<span style={{color: 'white'}}>Welcome <span style={{color:'red', marginRight:'1rem', marginLeft:'0.5rem' }}>{JSON.parse(userDetails).name.toUpperCase()}</span> <button onClick={handleLogout} className="btn btn-primary">Logout</button></span>}


                
            </div>
        </nav>

    )
}


export default Navbar;