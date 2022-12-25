import React from 'react';
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SidebarLink from "../components/SidebarLink";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {

    const { user, setUser } = useContext(AuthContext);

    let navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        setUser({
            login: false,
            role: null
        });
        navigate('/');
    };

    return (
        <aside id="sidebar" className="sidebar">

            <ul className="sidebar-nav" id="sidebar-nav">
                <SidebarLink title="Home" destination="/" />

                {
                    !user.login ? <>
                        <SidebarLink title={'Register'} destination="/register" />
                        <SidebarLink title="Login" destination="/login" />
                    </> : <>
                        <SidebarLink title="Users" destination="/users" />
                        <SidebarLink title="Projects" destination="/projects" />

                        <li className="nav-item">
                            <Link className="nav-link collapsed" to="#" onClick={logout}>
                                <i className="bi bi-grid"></i>
                                <span>Logout</span>
                            </Link>
                        </li>
                    </>
                }
            </ul>

        </aside>
    );
}
