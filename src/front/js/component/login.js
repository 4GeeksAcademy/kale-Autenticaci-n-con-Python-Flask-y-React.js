import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from '../store/appContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendUrl = process.env.BACKEND_URL
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== ""){
        const resp = await actions.getLogin(email, password);
        if (resp.ok) {
            sessionStorage.setItem('token', resp.token);  // Tomar token directamente de resp
            navigate("/private");
        } else {
            console.log("Login failed.");
        }
    }
    else {
        alert("Faltan datos")
    }
  };

  return  (
    <div style={{color: "teal"}}>
      <div className="d-flex vh-100 flex-column justify-content-center align-items-center pb-5">
        <div className="mb-5">
          <form className="container mb-5" onSubmit={handleSubmit}>
            <div className="row g-3 pb-4 ps-3 pe-3" style={{ borderRadius: "15px", border: "3px solid white", background:"azure" }}>
              <h1 className="d-flex justify-content-center mb-2"><i>LOGIN</i></h1>
              <div className="col-md-4">
                <label htmlFor="inputEmail4" className="form-label">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your@email.com" className="form-control" id="inputEmail4" />
              </div>
              <div className="col-md-4">
                <label htmlFor="inputPassword4" className="form-label">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*******" className="form-control" id="inputPassword4" />
              </div>
              <div className="col-md-12 d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-outline-success ps-5 pe-5">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
