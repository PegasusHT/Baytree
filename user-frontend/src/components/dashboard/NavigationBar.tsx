import React, {useState} from 'react'
import { IconContext } from 'react-icons';
import {FaBars, FaTimes} from "react-icons/fa";
import {NavLink as Link} from "react-router-dom";
import "../../css/dashboard/Navbar.css"
import baytreeLogo from "../../resources/baytree-logo.svg"

const NavigationBar = () => {

    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    return (

        <IconContext.Provider value={{ color: '#ffffff' }}>
            <nav className={"navbar"}>

                <div className={"navbar-container container"}>
                    <Link to={"/"}>
                        <img className={"brand-logo"}
                             src={baytreeLogo}
                             alt={"Baytree-logo"}/>
                    </Link>
                </div>

                <div className={"menu-icon"} onClick={handleClick}>
                    {click ? <FaTimes/> : <FaBars/>}
                </div>

                <ul className={click ? "nav-menu-active" : "nav-menu"}>
                    <li className={"nav-item"}>
                        <Link activeClassName={"active"} exact to={'/dashboard'} className="nav-links" onClick={closeMobileMenu}>
                            <a href="/#">Dashboard</a>
                        </Link>
                    </li>
                    <li className={"nav-item"}>
                        <Link to={'/monthlyquestionnaire'} className="nav-link" onClick={closeMobileMenu}>
                            <a href="/#">Questionnaires</a>
                        </Link>
                    </li>
                    <li className={"nav-item"}>
                        <Link to={'/resources'} className="nav-links" onClick={closeMobileMenu}>
                            <a href="/#">Resources</a>
                        </Link>
                    </li>
                    <li className={"nav-item"}>
                        <Link to={'/profile'} className="nav-links" onClick={closeMobileMenu}>
                            <a href="/#">Profile</a>
                        </Link>
                    </li>
                    <li className={"nav-item"}>
                        <Link to={'/goals'} className="nav-links" onClick={closeMobileMenu}>
                            <a href="/#">Goals</a>
                        </Link>
                    </li>

                </ul>

            </nav>

            <section className="header-background"/>

        </IconContext.Provider>
    );
};

export {
    NavigationBar
}
