import React from "react";
import CallAPIZing from "../../../Services/Api/CallAPIZing";
import { Link } from "react-router-dom";
import './PlayerControlLeft.scss'
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function PlayerControlLeft(props) {
    const { heart, ellipsis } = props.listIcon
    const { infoSong } = props;
    return (
        <div className="player-control_left d-flex gap-3 px-3 align-items-center h-100">
            <div className="player-control_left-img">
                <img src={infoSong?.thumbnail} alt="ImageSong" className="img-fluid rounded" />
            </div>
            <div className="player-control_left-details">
                <span className="fw-bold">{infoSong?.title}</span>
                <div className="fw-semibold">
                    {infoSong?.artists?.map(({ name, link, id }, index) => (
                        <div className="artists-name" key={id}>
                            <Link to={link}>
                                {name}
                            </Link>{" "}
                            <span>{index < infoSong.artists.length - 1 ? ", " : ""}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="player-control_left-icon d-flex">
                <div className="d-flex align-items-center justify-content-center">
                    <i className={`${heart} px-2`}></i>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <i className={`${ellipsis} px-2`}></i>
                </div>
            </div>
        </div>
    );
}
