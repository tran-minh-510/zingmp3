import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CallAPIZing from "../../Services/Api/CallAPIZing";
import moment from "moment";
import HttpClient from "../../Services/Api/HttpClient";
import "./Album.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    persistMusic,
    actionsPersistMusic,
} from "../../Components/GeneralSlice/sliceMusic";
import { Audio } from "react-loader-spinner";
const client = new HttpClient();

const callApiZing = new CallAPIZing();

export default function Album() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const [listIdSong, setListIdSong] = useState([])
    const { curSongID, isPlaying } = useSelector(persistMusic);
    const [detailPlaylist, setDetailPlaylist] = useState({});
    const [secondRuns, setSecondRuns] = useState(0);
    const [listIcon, setListIcon] = useState({});
    const borderRadiusImg = useRef();
    const overlayRef = useRef();
    const overlayIconRef = useRef().current;
    const isBelongListIdSong = listIdSong.includes(curSongID)

    const handlePlayingThumbnail = () => {
        const index = Math.floor(Math.random() * listIdSong.length) + 1
        if (!isBelongListIdSong) {
            dispatch(actionsPersistMusic.setIdMusicLocal(listIdSong[index]))
            dispatch(actionsPersistMusic.setPlaying({ type: 1, isPlaying: true }))
        } else {
            dispatch(actionsPersistMusic.setPlaying({ type: 0, isPlaying }))
        }
    }

    useEffect(() => {
        let timeout1;
        let timeout2;
        if (secondRuns === 0) {
            overlayRef.current.style.background = "rgba(0, 0, 0, 0.5)";
        }
        if (secondRuns === 1) {
            borderRadiusImg.current.classList.remove("rotate-center");
            borderRadiusImg.current.classList.remove("rounded-circle");
            borderRadiusImg.current.classList.remove("rotate-center-reverse");
            if (isPlaying) {
                borderRadiusImg.current.classList.add("rounded-circle");
                borderRadiusImg.current.classList.add("rotate-center");
                overlayRef.current.style.background = "none";
            } else {
                borderRadiusImg.current.classList.add("rotate-center-reverse");
                borderRadiusImg.current.classList.add("rounded-circle");
                timeout1 = setTimeout(() => {
                    borderRadiusImg.current.classList.remove("rounded-circle");
                    timeout2 = setTimeout(() => {
                        overlayRef.current.style.background = "rgba(0, 0, 0, 0.5)";
                    }, 610);
                }, 600);
            }
        }
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, [isPlaying]);
    useEffect(() => {
        const callAlbum = async () => {
            const res = await callApiZing.get(
                `${callApiZing.detailPlaylist}?id=${id}`
            );
            if (res.response.ok) {
                const arrIdSong = []
                res.data.data.song.items.forEach(({ encodeId }) => {
                    arrIdSong.push(encodeId)
                });
                setListIdSong(arrIdSong)
                setDetailPlaylist(res.data.data);
            }
        };
        callAlbum();
        const callIcon = async () => {
            const res = await client.get(client.iconAlbum);
            if (res.response.ok) {
                setListIcon(res.data);
            }
        };
        callIcon();
        setSecondRuns(1);
    }, []);
    return (
        <div className="detail-playlist">
            <div className="row m-0">
                <div className="col col-4">
                    <div className="text-center">
                        <div className="detail-playlist_thumbnail pb-3">
                            <div
                                className="detail-playlist_thumbnail-wrapper rounded-3"
                                onClick={() =>
                                    handlePlayingThumbnail()
                                }
                            >
                                <img
                                    src={detailPlaylist?.thumbnailM}
                                    alt="thumbnail"
                                    ref={borderRadiusImg}
                                    onMouseOver={() => {
                                        console.log('123..')
                                        borderRadiusImg.current.style.transform = "scale(1.1)"
                                    }}
                                // style={{ transform: 'scale(1.1)' }}
                                />
                                <div
                                    className={`overlay d-flex justify-content-center align-items-center ${isBelongListIdSong && isPlaying && "rounded-circle"
                                        }`}
                                    ref={overlayRef}
                                ></div>
                                <div
                                    className="overlay-icon"
                                    ref={overlayIconRef}
                                    style={Object.assign({}, isBelongListIdSong && isPlaying && { display: "block" })}
                                >
                                    <span>
                                        {isBelongListIdSong && isPlaying ? (
                                            <Audio
                                                height="35"
                                                width="35"
                                                color="#fff"
                                                ariaLabel="audio-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="wrapper-class_audio align-items-center"
                                                visible={true}
                                            />
                                        ) : (
                                            <i className={listIcon.start} />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <h4 className="detail-playlist_title fw-bold">
                            {detailPlaylist?.title}
                        </h4>
                        <div className="detail-playlist_playlist-info pb-3">
                            <p className="m-0 fw-semibold">
                                Cập nhật:{" "}
                                {moment
                                    .unix(detailPlaylist?.contentLastUpdate)
                                    .format("DD MM YYYY")
                                    .replaceAll(" ", "/")}
                            </p>
                            <p className="m-0 fw-semibold">
                                {detailPlaylist?.artists?.map(({ id, name, link }, index) => {
                                    return (
                                        <span className="artists-name" key={id}>
                                            <Link to={link}>{name}</Link>{" "}
                                            <span>
                                                {index < detailPlaylist.artists.length - 1 ? ", " : ""}
                                            </span>
                                        </span>
                                    );
                                })}
                            </p>
                            <p className="m-0 fw-semibold">
                                {Math.round(detailPlaylist?.like / 1000)}K người yêu thích
                            </p>
                        </div>
                        <div className="detail-playlist_btn-ramdom-song">
                            <button className="w-100 rounded-5 p-2 fw-semibold" onClick={() => handlePlayingThumbnail()}>
                                {isBelongListIdSong ? isPlaying ? 'Tạm dừng' : 'Tiếp tục phát' : <><span className="p-2">
                                    <i className={listIcon?.start} />
                                </span>
                                    Phát ngẫu nhiên</>}
                            </button>
                        </div>
                        <div className="detail-playlist_icon-controls d-flex justify-content-center py-3">
                            <div className="d-flex justify-content-center align-items-center mx-3">
                                <i className={listIcon?.heart} />
                            </div>
                            <div className="d-flex justify-content-center align-items-center mx-3">
                                <i className={listIcon?.ellipsis} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-8 p-0">
                    <div className="detail-palylist_song">
                        <div className="detail-palylist_song-description">
                            <span className="fw-semibold">Lời tựa</span>
                            <span className="fw-semibold">{detailPlaylist?.description}</span>
                        </div>
                        <div className="detail-palylist_song-list">
                            <div className="select-song_header d-flex justify-content-between">
                                <span className="fw-semibold">
                                    <i className={listIcon?.sort} />
                                    bài hát
                                </span>
                                <span className="fw-semibold">album</span>
                                <span className="fw-semibold">thời gian</span>
                            </div>
                            <div className="select-song_body">
                                {detailPlaylist?.song?.items?.map(
                                    (
                                        {
                                            encodeId,
                                            title,
                                            thumbnail,
                                            duration,
                                            streamingStatus,
                                            artists,
                                            album,
                                        },
                                        index
                                    ) => {
                                        return (
                                            <div
                                                className={`item-song d-flex justify-content-between ${streamingStatus === 2 && "faint"
                                                    }`}
                                                key={index}
                                                onClick={() => {
                                                    if (streamingStatus === 1) {
                                                        dispatch(
                                                            actionsPersistMusic.setIdMusicLocal(encodeId)
                                                        );
                                                        dispatch(
                                                            actionsPersistMusic.setPlaying({ type: 1, isPlaying: true })
                                                        );
                                                    }
                                                    if (streamingStatus === 2)
                                                        alert(
                                                            "Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản VIP để nghe bài hát này."
                                                        );
                                                }}
                                            >
                                                <div className="item-song_thumbnail d-flex w-50 align-items-center">
                                                    <i className={listIcon?.music} />
                                                    <div className="item-song_thumbnail-image d-flex justify-content-center">
                                                        <img
                                                            src={thumbnail}
                                                            alt="thumbnail"
                                                            className="w-50 img-fluid rounded-2"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="m-0">{title}</p>
                                                        <p className="link-artists">
                                                            {artists?.map(({ id, name, link }, index) => {
                                                                return (
                                                                    <span key={id}>
                                                                        <Link to={link}>{name}</Link>{" "}
                                                                        <span>
                                                                            {index < artists.length - 1 ? ", " : ""}
                                                                        </span>
                                                                    </span>
                                                                );
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="item-song_album">
                                                    <Link to={album?.link}>{album?.title}</Link>{" "}
                                                </div>
                                                <div className="item-song_time">
                                                    {moment
                                                        .utc(
                                                            moment
                                                                .duration(duration, "seconds")
                                                                .asMilliseconds()
                                                        )
                                                        .format("mm:ss")}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                                <div className="total-playlist">
                                    <span className="fw-semibold">
                                        {detailPlaylist?.song?.total} bài hát
                                    </span>
                                    <span className="px-2 fw-semibold">
                                        <i className={listIcon?.circle} />
                                    </span>
                                    <span className="fw-semibold">
                                        {moment
                                            .duration(detailPlaylist?.song?.totalDuration, "seconds")
                                            .hours()}{" "}
                                        giờ{" "}
                                        {moment
                                            .duration(detailPlaylist?.song?.totalDuration, "seconds")
                                            .minutes()}{" "}
                                        phút
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
