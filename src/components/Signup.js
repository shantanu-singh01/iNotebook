import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const host = "https://inotebook-app-01227d5a45f6.herokuapp.com"
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate("/");
            handleSignUp();
            props.showAlert("Account created successfully", "success")

        } else {
            props.showAlert("Sorry a user with this email already exists", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSignUp = async () => {
        var token = localStorage.getItem('token');
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "auth-token": token
            }
        });
        const result = await response.json();
        localStorage.setItem('userData', JSON.stringify(result));
    }

    return (
        <div className="container mt-3">
            <h2>Create an account to use iNoteboook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-5">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}


export default Signup;