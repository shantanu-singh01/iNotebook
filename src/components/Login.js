import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = (props) => {

    const host = "https://inotebook-app-01227d5a45f6.herokuapp.com"
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // save the authtoken and redirect
            localStorage.setItem('token', json.authToken);
            
            props.showAlert("Logged in successfully", "success")
            navigate("/");
            handleLogin();
        } else {
            props.showAlert("Invalid Credentials", "danger")
        } 

        
    }

    const handleLogin = async () => {
        
        var token = localStorage.getItem('token')
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "auth-token": token
            }
        });
        const result = await response.json();
        localStorage.setItem('userData', JSON.stringify(result));
    
        
       
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        
    }

    return (
        <div className="mt-3">
            <h2>Sign in to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-5">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}


export default Login;