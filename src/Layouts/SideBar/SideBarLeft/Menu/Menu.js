import React from "react";
import { NavLink } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Menu.scss'

export default function Menu(props) {
    const { menu } = props;
    return (
        <div className="zm-sidebar-wrapper">
            <ul className="zm-sidebar_menu">
                {menu.map(({ link, name, icon }, index) => {
                    return <li key={index} className={`py-1 fw-bolder`}>
                        <i className={`${icon} pe-2`}></i>
                        <NavLink to={link}>{name}</NavLink>
                    </li>;
                })}
            </ul>
        </div>
    );
}
