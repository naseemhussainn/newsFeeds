import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import newsIcon from '../files/newsIcon.png'
function Navbar() {
  return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/"> <img src={newsIcon} width={25}height={25}></img> NewsFeeds</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/">headlines</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/business">Business</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/entertainments">Entertainment</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/health">Health</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/science">Science</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/sports">Sports</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/technology">Technology</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
  )
}

export default Navbar
