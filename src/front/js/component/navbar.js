import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [location]);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
            <span className="navbar-brand mb-0 p">Sistema de Autenticación</span>    
                <div className="ml-auto">
                    {isAuthenticated ? (
                        <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="btn btn-primary" style={{margin:"5px"}}>Login</button>
                            </Link>
                            
                                <Link to="/signup">
                                    <button className="btn btn-primary">Sign Up</button>
                                </Link>
                            
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

