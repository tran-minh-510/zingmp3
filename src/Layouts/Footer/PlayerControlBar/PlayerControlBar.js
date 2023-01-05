import React, { useState, useEffect, useRef } from "react";
import "./PlayerControlBar.scss";
import CallAPIZing from "../../../Services/Api/CallAPIZing";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getStatePlayerControlBar } from "./slicePlayerControlBar";

import {
    persistMusic,
    actionsPersistMusic,
} from "../../../Components/GeneralSlice/sliceMusic";


const callApiZing = new CallAPIZing();
let isDrag = false;

export default function PlayerControlBar(props) {
    const { duration, IdSong, listIcon } = props;
    const { shuffle, prev, next, start, pause, repeat } = listIcon;
    const [effectRun, setEffectRun] = useState(0);
    const dispatch = useDispatch();
    const { isPlaying } = useSelector(persistMusic);
    const audio = useRef(new Audio()).current;
    const progressBar = useRef();
    const progressBarThumb = useRef();
    const refCurrentTime = useRef();
    const isPlayed =
        audio.currentTime > 0 &&
        !audio.paused &&
        !audio.ended &&
        audio.readyState > audio.HAVE_CURRENT_DATA;
    useEffect(() => {
        const distanceLeftProgressBar = progressBar.current.getBoundingClientRect().left
        const widthProgressBar = progressBar.current.offsetWidth
        const setCurrentTimer = (percentProgressThumb) => moment
            .utc(moment.duration((percentProgressThumb * duration) / 100, "seconds").asMilliseconds())
            .format("mm:ss")
        progressBar.current.onmousedown = (e) => {
            let percentProgressThumb = ((e.clientX - distanceLeftProgressBar) / widthProgressBar) * 100
            progressBarThumb.current.style.width = `${percentProgressThumb}%`
            refCurrentTime.current.innerText = setCurrentTimer(percentProgressThumb)
            isDrag = true
        }
        document.onmousemove = (e) => {
            const condition1 = e.clientX - distanceLeftProgressBar >= 0
            const condition2 = e.clientX < widthProgressBar + distanceLeftProgressBar
            let percentProgressThumb = ((e.clientX - distanceLeftProgressBar) / widthProgressBar) * 100
            if (isDrag) {
                if (condition1 && condition2) {
                    progressBarThumb.current.style.width = `${percentProgressThumb}%`
                    refCurrentTime.current.innerText = setCurrentTimer(percentProgressThumb)
                } else {
                    if (!condition1) percentProgressThumb = 0
                    if (!condition2) percentProgressThumb = 100
                    progressBarThumb.current.style.width = `${percentProgressThumb}%`
                    refCurrentTime.current.innerText = setCurrentTimer(percentProgressThumb)
                }
            }
        }
        document.onmouseup = (e) => {
            if (isDrag) {
                let percentProgressThumb = ((e.clientX - distanceLeftProgressBar) / widthProgressBar) * 100
                progressBarThumb.current.style.width = `${percentProgressThumb}%`
                audio.currentTime = (percentProgressThumb * duration) / 100
            }
            isDrag = false

        }
    }, [duration])

    useEffect(() => {
        const getAudioSong = async () => {
            const res = await callApiZing.get(`${callApiZing.getSong}?id=${IdSong}`);
            if (res.response.ok) {
                audio.src = res?.data?.data["128"];
                if (effectRun === 1) {
                    dispatch(actionsPersistMusic.setPlaying(isPlaying));
                    if (!isPlayed) {
                        audio.play()
                    }
                }
                setEffectRun(1);
            }
        };
        getAudioSong();
        return () => {
            audio.pause();
            audio.remove();
        };
    }, [IdSong]);

    useEffect(() => {
        const startSong = async () => {
            if (!isPlaying) {
                audio.pause();
            }
            if (isPlaying) {
                if (!isPlayed) {
                    audio.play()
                }
            }
        };
        startSong();
        return () => {
            audio.pause();
            audio.remove();
        };
    }, [isPlaying]);

    useEffect(() => {
        // console.log('123', duration)
        audio.ontimeupdate = function () {
            const percentProgressThumb = (audio.currentTime / duration) * 100
            if (!isDrag) {
                progressBarThumb.current.style.width = `${percentProgressThumb}%`
                refCurrentTime.current.innerText = moment
                    .utc(moment.duration(audio.currentTime, "seconds").asMilliseconds())
                    .format("mm:ss")
            }
        };
        if (effectRun === 1) {
            if (audio.currentTime === 0) {
                if (!isPlayed) {
                    // audio.currentTime = currentTime;
                    audio.play()
                    if (isPlaying === false)
                        dispatch(actionsPersistMusic.setPlaying(isPlaying));
                }
            }
        }
    }, [duration]);
    return (
        <div className="player-control_bar">
            <div className="player-control_bar-controls d-flex justify-content-center mt-3">
                <div className="icon-controls px-4">
                    <i className={`${shuffle}`}></i>
                </div>
                <div className="icon-controls px-4">
                    <i className={`${prev}`}></i>
                </div>
                <div
                    className="icon-controls px-4"
                    onClick={() => dispatch(actionsPersistMusic.setPlaying(isPlaying))}
                >
                    <i
                        className={`${isPlaying ? pause : start
                            } border-start rounded-circle d-flex justify-content-center align-items-center`}
                    ></i>
                </div>
                <div className="icon-controls px-4">
                    <i className={`${next}`}></i>
                </div>
                <div className="icon-controls px-4">
                    <i className={`${repeat}`}></i>
                </div>
            </div>
            <div className="player-control_bar-range d-flex justify-content-around align-items-center mt-2">
                <span ref={refCurrentTime}></span>
                <div
                    className="progress-bar w-75 rounded-2"
                    ref={progressBar}
                >
                    <div
                        className="progress-bar_thumb rounded-start"
                        ref={progressBarThumb}
                    ></div>
                </div>
                <span>
                    {moment
                        .utc(moment.duration(duration, "seconds").asMilliseconds())
                        .format("mm:ss")}
                </span>
            </div>
        </div>
    );
}
