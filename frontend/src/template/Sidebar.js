import React from 'react';
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
    
    const { isLogin, setLogin } = useContext(AuthContext);

    let navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        setLogin(false);
        navigate('home');
    }

    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/">
                        <i className="bi bi-grid"></i>
                        <span>Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/users">
                        <i className="bi bi-grid"></i>
                        <span>Users</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/projects">
                        <i className="bi bi-grid"></i>
                        <span>Projects</span>
                    </Link>
                </li>

                {
                    !isLogin ? <>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" to="/register">
                                <i className="bi bi-grid"></i>
                                <span>Register</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" to="/login">
                                <i className="bi bi-grid"></i>
                                <span>Login</span>
                            </Link>
                        </li>
                    </> : <li className="nav-item">
                            <Link className="nav-link collapsed" to="#" onClick={logout}>
                            <i className="bi bi-grid"></i>
                            <span>Logout</span>
                        </Link>
                    </li>
                }
            </ul>

        </aside>
    );
}
