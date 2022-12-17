import React from 'react'
import { Link } from "react-router-dom"

export default function Sidebar() {
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
            </ul>

        </aside>
    )
}
