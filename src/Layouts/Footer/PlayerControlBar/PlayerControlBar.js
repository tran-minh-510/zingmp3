import React, { useState, useEffect, useRef } from "react";
import moduleScss from "./PlayerControlBar.module.scss";
import CallAPIZing from "../../../Services/Api/CallAPIZing";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
    persistMusic,
    actionsPersistMusic,
} from "../../../Components/GeneralSlice/sliceMusic";
import { RotatingLines } from 'react-loader-spinner'

const callApiZing = new CallAPIZing();
let isDrag = false;

export default function PlayerControlBar(props) {
    const { id } = useParams();
    const { duration, IdSong, listIcon, isPlaying, isLoading } = props;
    const { shuffle, prev, next, start, pause, repeat } = listIcon;
    const [effectRun, setEffectRun] = useState(0);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isRandom, setIsRandom] = useState(false);
    const [listIdSong, setListIdSong] = useState([]);
    const dispatch = useDispatch();
    const isBelongListIdSong = listIdSong.includes(IdSong);
    const audio = useRef(new Audio()).current;
    const progressBar = useRef();
    const nextBtn = useRef();
    const prevBtn = useRef();
    const progressBarThumb = useRef();
    const refCurrentTime = useRef();
    const [listSongPlay, setListSongPlay] = useState([]);
    const isPlayed =
        audio.currentTime > 0 &&
        !audio.paused &&
        !audio.ended &&
        audio.readyState > audio.HAVE_CURRENT_DATA;
    useEffect(() => {
        const distanceLeftProgressBar =
            progressBar.current.getBoundingClientRect().left;
        const widthProgressBar = progressBar.current.offsetWidth;
        const setCurrentTimer = (percentProgressThumb) =>
            moment
                .utc(
                    moment
                        .duration((percentProgressThumb * duration) / 100, "seconds")
                        .asMilliseconds()
                )
                .format("mm:ss");
        progressBar.current.onmousedown = (e) => {
            let percentProgressThumb =
                ((e.clientX - distanceLeftProgressBar) / widthProgressBar) * 100;
            progressBarThumb.current.style.width = `${percentProgressThumb}%`;
            refCurrentTime.current.innerText = setCurrentTimer(percentProgressThumb);
            isDrag = true;
        };
        document.onmousemove = (e) => {
            const condition1 = e.clientX - distanceLeftProgressBar >= 0;
            const condition2 = e.clientX < widthProgressBar + distanceLeftProgressBar;
            let percentProgressThumb =
                ((e.clientX - distanceLeftProgressBar) / widthProgressBar) * 100;
            if (isDrag) {
                if (condition1 && condition2) {
                    progressBarThumb.current.style.width = `${percentProgressThumb}%`;
                    refCurrentTime.current.innerText =
                        setCurrentTimer(percentProgressThumb);
                } else {
                    if (!condition1) percentProgressThumb = 0;
                    if (!condition2) percentProgressThumb = 100;
                    progressBarThumb.current.style.width = `${percentProgressThumb}%`;
                    refCurrentTime.current.innerText =
                        setCurrentTimer(percentProgressThumb);
                }
            }
        };
        document.onmouseup = (e) => {
            if (isDrag) {
                let percentProgressThumb =
                    ((e.clientX - distanceLeftProgressBar) / widthProgressBar) * 100;
                progressBarThumb.current.style.width = `${percentProgressThumb}%`;
                audio.currentTime = (percentProgressThumb * duration) / 100;
            }
            isDrag = false;
        };
    }, [duration]);

    useEffect(() => {
        if (id) {
            const callAlbum = async () => {
                const res = await callApiZing.get(
                    `${callApiZing.detailPlaylist}?id=${id}`
                );
                if (res.response.ok) {
                    const arrIdSong = [];
                    res.data.data.song.items.forEach(({ encodeId, streamingStatus }) => {
                        if (streamingStatus === 1) arrIdSong.push(encodeId);
                    });
                    setListIdSong(arrIdSong);
                    setListSongPlay(arrIdSong);
                }
            };
            callAlbum();
        }
    }, [id]);

    useEffect(() => {
        const getAudioSong = async () => {
            const res = await callApiZing.get(`${callApiZing.getSong}?id=${IdSong}`);
            if (res.response.ok) {
                audio.src = res?.data?.data["128"];
                dispatch(actionsPersistMusic.setLoading(true))
                if (effectRun === 1) {
                    dispatch(
                        actionsPersistMusic.setPlaying({ type: 1, isPlaying: true })
                    );
                }
                setEffectRun(1);
            }
        };
        getAudioSong();
    }, [IdSong]);

    useEffect(() => {
        dispatch(actionsPersistMusic.setLoading(false))
    }, [IdSong])

    if (!isPlaying) {
        audio.pause();
    }
    if (isPlaying) {
        if (!isPlayed) {
            audio.play()
            // var playPromise = audio.play();
            // if (playPromise !== undefined) {
            //     playPromise
            //         .then(function () {
            //             audio.play();
            //         })
            //         .catch(function (error) {
            //             // alert('Bài hát bị lỗi. Vui lòng thử bài khác !')
            //             // dispatch(actionsPersistMusic.setPlaying({ type: 1, isPlaying: false }));
            //         });
            // }
        }
    }

    const handleLogicRadom = () => {
        if (
            (!isRepeat && isRandom && isBelongListIdSong) ||
            (isRepeat && isRandom && isBelongListIdSong)
        ) {
            const index = Math.floor(Math.random() * listSongPlay.length) + 1;
            setListSongPlay((prev) => {
                prev.splice(index - 1, 1);
                if (prev.length === 0) return listIdSong;
                return prev;
            });
            dispatch(actionsPersistMusic.setIdMusicLocal(listSongPlay[index]));
            console.log('123')
        }
    }

    useEffect(() => {
        audio.onended = function () {
            if (
                (!isRepeat && !isRandom) ||
                (!isRepeat && isRandom && !isBelongListIdSong)
            ) {
                dispatch(actionsPersistMusic.setPlaying({ type: 1, isPlaying: false }));
                audio.currentTime = 0;
            }
            if (isRepeat && !isRandom) {
                audio.currentTime = 0;
                audio.play();
            }
            handleLogicRadom()
        };
        return () => {
            audio.removeEventListener("ended", () => { });
        };
    }, [isRepeat, isRandom]);

    useEffect(() => {
        audio.ontimeupdate = function () {
            const percentProgressThumb = (audio.currentTime / duration) * 100;
            if (!isDrag) {
                progressBarThumb.current.style.width = `${percentProgressThumb}%`;
                refCurrentTime.current.innerText = moment
                    .utc(moment.duration(audio.currentTime, "seconds").asMilliseconds())
                    .format("mm:ss");
            }
        };
    }, [duration]);

    const handleRepeat = () => {
        setIsRepeat((prev) => !prev);
    };

    const handleRandom = () => {
        setIsRandom((prev) => !prev);
    };

    const handleNext = () => {
        handleLogicRadom()
        if (!isRandom && isBelongListIdSong && id) {
            dispatch(actionsPersistMusic.setIdMusicLocal(listSongPlay[listIdSong.indexOf(IdSong) + 1 === listIdSong.length ? 0 : listIdSong.indexOf(IdSong) + 1]))
        }
        if (!isRandom && !isBelongListIdSong) {
            audio.currentTime = 0;
            dispatch(actionsPersistMusic.setPlaying({ type: 1, isPlaying: true }));
        }
    };

    const handlePrev = () => {
        handleLogicRadom()
        if (!isRandom && isBelongListIdSong && id) {
            dispatch(actionsPersistMusic.setIdMusicLocal(listSongPlay[listIdSong.indexOf(IdSong) - 1 < 0 ? listIdSong.length - 1 : listIdSong.indexOf(IdSong) - 1]))
        }
        if (!isRandom && !isBelongListIdSong) {
            audio.currentTime = 0;
            dispatch(actionsPersistMusic.setPlaying({ type: 1, isPlaying: true }));
        }
    };

    return (
        <div className={`${moduleScss.playerControlBar}`}>
            <div className="player-control_bar-controls d-flex justify-content-center mt-3">
                <div className={`${moduleScss.iconControls} px-4`}>
                    <i
                        className={`${shuffle} ${isRandom && moduleScss.active}`}
                        onClick={() => handleRandom()}
                    ></i>
                </div>
                <div className={`${moduleScss.iconControls} px-4`}>
                    <i
                        className={`${prev}`}
                        onClick={() => handlePrev()}
                        ref={prevBtn}
                        onMouseUp={() => {
                            prevBtn.current.classList.remove(moduleScss.active);
                        }}
                        onMouseDown={() => {
                            prevBtn.current.classList.add(moduleScss.active);
                        }}
                    ></i>
                </div>
                {isLoading ? (<div
                    className={`${moduleScss.iconControls} px-4`}
                    onClick={() =>
                        dispatch(actionsPersistMusic.setPlaying({ type: 0, isPlaying }))
                    }
                >
                    <i
                        className={`${isPlaying ? pause : start} ${moduleScss.borderStart
                            } rounded-circle d-flex justify-content-center align-items-center`}
                    ></i>
                </div>) : (<div className={`${moduleScss.loading} px-4`}>
                    <span className={` ${moduleScss.borderStart
                        } rounded-circle d-flex justify-content-center align-items-center`}>
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="25"
                            visible={true}
                        />
                    </span>
                </div>)}
                <div className={`${moduleScss.iconControls} px-4`}>
                    <i
                        className={`${next}`}
                        onClick={() => handleNext()}
                        ref={nextBtn}
                        onMouseUp={() => {
                            nextBtn.current.classList.remove(moduleScss.active);
                        }}
                        onMouseDown={() => {
                            nextBtn.current.classList.add(moduleScss.active);
                        }}
                    ></i>
                </div>
                <div className={`${moduleScss.iconControls} px-4`}>
                    <i
                        className={`${repeat} ${isRepeat && moduleScss.active}`}
                        onClick={() => handleRepeat()}
                    ></i>
                </div>
            </div>
            <div
                className={`${moduleScss.playerControlBarRange} d-flex justify-content-around align-items-center mt-2`}
            >
                <span ref={refCurrentTime}></span>
                <div
                    className={`${moduleScss.progressBar} w-75 rounded-2`}
                    ref={progressBar}
                >
                    <div
                        className={`${moduleScss.progressBarThumb} rounded-start`}
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
