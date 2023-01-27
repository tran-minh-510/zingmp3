import React from "react";
import "./SideBarLeft.scss";
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";
import { useState, useEffect } from "react";
import HttpClient from "../../../Services/Api/HttpClient";

const client = new HttpClient();

export default function SideBarLeft(props) {
    const { violetColor } = props.mailColor
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await client.get(client.menu);
            if (res.response.ok) {
                setMenu(res.data);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <div className="nav-bar_left w-100" style={{ backgroundColor: `${violetColor?.Violet300}` }}>
                <Logo />
                <Menu menu={menu} />
            </div>
        </>
    );
}
