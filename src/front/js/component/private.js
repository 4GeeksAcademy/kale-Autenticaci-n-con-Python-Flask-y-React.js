import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);


    return (
        <div style={{ color: "teal" }}>
            <div className="d-flex vh-100 flex-column justify-content-center align-items-center pb-5">
                <div className="mb-5">
                    <div className="row g-3 pb-4 ps-3 pe-3" style={{ borderRadius: "15px", border: "3px solid white", background: "azure" }}>
                        <h1 className="d-flex justify-content-center mb-2"><i>Welcome</i></h1>
                        <div className="col-md-12 d-flex justify-content-center mt-4">
                            <p>Esta es la pagina privada, bienvenido a la pagina principal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Private;
