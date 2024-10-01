import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header id="header">
            <div className="logo">
                <span className="icon fa-gem"></span>
            </div>
            <div className="content">
                <div className="inner">
                    <h1>Management Console</h1>
                    <p>All employees manipulation operations are here.</p>
                </div>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/list-all">List all</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create">Create</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
