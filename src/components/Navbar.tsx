import React, { useEffect, useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { authService  } from "../hook/auth";
import { useNavigate } from "react-router-dom";

function Example() {
    const [userloggedin, setUserloggedin] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const role = authService.isLoggedIn();
        setUserloggedin(role);
    }, [])

    const handleLogout = () => {
        authService.logout();
        window.location.href = "/";
    };

  return (
    <Nav tabs>
      <NavItem>
        <NavLink href="/">Home</NavLink>
      </NavItem>
      {authService.isLoggedIn() ? (
         <NavItem>
         <NavLink onClick={handleLogout}>Logout</NavLink>
       </NavItem>
        ) : (
      <NavItem>
        <NavLink onClick={()=> navigate('./login')}>Login</NavLink>
      </NavItem>
        )}
      <NavItem>
        <NavLink href="/profile">Profile</NavLink>
      </NavItem>
     
    </Nav>
  );
}

export default Example;