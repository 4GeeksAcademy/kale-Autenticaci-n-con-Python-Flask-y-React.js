import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
