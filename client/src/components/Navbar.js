import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
const Navbar = () => {
    const uid = useContext(UidContext);

    const user = useSelector(state => state.userReducer);


    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/">
                        <div className="logo">
                            <img src="./img/icon-r.png" alt="icon" />
                            <h3>Amy'Z</h3>
                        </div>
                    </NavLink>
                </div>
                {
                    uid ?
                        (
                            <ul>
                                <li></li>
                                <li className="welcome">
                                    <NavLink exact to="/profil">
                                        <h5>Bienvenue {user.pseudo} </h5>
                                    </NavLink>
                                </li>
                                <Logout />
                            </ul>
                        )
                        :
                        (
                            <ul>
                                <li></li>
                                <NavLink exact to="/profil">
                                    <img src="./img/icons/login.svg" alt="login" />
                                </NavLink>
                            </ul>
                        )
                }
            </div>
        </nav>
    );
};

export default Navbar;