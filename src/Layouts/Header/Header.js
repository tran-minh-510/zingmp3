import React from "react";
import './Header.scss'
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderOptions from "./HeaderOptions/HeaderOptions";

export default function Header(props) {
    const { violetColor } = props.mailColor
    const { arrowLeft, arrowRight, search, settings, theme, upload, user, vip } = props.iconHeader
    return (
        <div className="w-100 fixed-top" style={{ backgroundColor: `${violetColor?.Violet400}` }}>
            <div className="header py-3 d-flex justify-content-between">
                <HeaderSearch icons={{ arrowLeft, arrowRight, search }} />
                <HeaderOptions icons={{ settings, theme, upload, user, vip }} />
            </div>
        </div>
    );
}
