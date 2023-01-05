import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Footer.scss'
import PlayerControlBar from './PlayerControlBar/PlayerControlBar'
import PlayerControlLeft from './PlayerControlLeft/PlayerControlLeft'
import PlayerControlRight from './PlayerControlRight/PlayerControlRight'
import HttpClient from "../../Services/Api/HttpClient"
import { persistMusic, actionsPersistMusic } from '../../Components/GeneralSlice/sliceMusic'
import CallAPIZing from "../../Services/Api/CallAPIZing";
const client = new HttpClient()
const callApiZing = new CallAPIZing();

export default function Footer(props) {
    const { violetColor } = props.mailColor
    const [listIcon, setListIcon] = useState({})
    const { curSongID, infoSong } = useSelector(persistMusic);
    const dispatch = useDispatch();
    useEffect(() => {
        const callApiIcon = async () => {
            const res = await client.get(client.iconFooter)
            if (res.response.ok) {
                const data = res.data
                setListIcon(data)
            }
        }
        callApiIcon()
    }, [])
    useEffect(() => {
        const getApiInfoSong = async () => {
            const res = await callApiZing.get(`${callApiZing.infoSong}?id=${curSongID}`);
            const { title, artists, thumbnail, duration } = res.data.data;
            dispatch(actionsPersistMusic.setInfoSong({ title, artists, thumbnail, duration }));
        };
        getApiInfoSong();
    }, [curSongID]);
    return (
        <div className="footer z-index-2000" style={{ backgroundColor: `${violetColor?.Violet600}` }}>
            <div className="row h-100">
                <div className="col col-3">
                    <PlayerControlLeft listIcon={listIcon} infoSong={infoSong} />
                </div>
                <div className="col col-7">
                    <PlayerControlBar listIcon={listIcon} IdSong={curSongID} duration={infoSong.duration} />
                </div>
                <div className="col col-2">
                    <PlayerControlRight listIcon={listIcon} />
                </div>
            </div>
        </div>
    )
}
