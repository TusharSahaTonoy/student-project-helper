import React from 'react'
import { Link } from "react-router-dom";

export default function SidebarLink({title, destination}) {
  return (
      <li className="nav-item">
          <Link className="nav-link collapsed" to={destination}>
              <i className="bi bi-grid"></i>
              <span>{title}</span>
          </Link>
      </li>
  )
}
