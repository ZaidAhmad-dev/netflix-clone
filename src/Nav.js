import React, { useEffect, useState } from 'react';
import './Nav.css'

const Nav = () => {
    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100){
                handleShow(true);
            } else{
                handleShow(false)
            }
        }); 
        return () => {
            window.removeEventListener("scroll");
        }
    },[])

  return (
    <div className={`nav ${show && "nav__black"}`}>
      {/* Adding netflix logo */}
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />

      {/* Adding a nav avatar icon */}
      <img
        className="nav__avatar"
        src="https://www.blexar.com/avatar.png"
        alt="Netflix Logo"
      />
    </div>
  );
};

export default Nav;
