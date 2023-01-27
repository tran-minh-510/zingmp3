import React from "react";
import "./ItemsSong.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import {
  persistMusic,
  actionsPersistMusic,
} from "../../../../Components/GeneralSlice/sliceMusic";
import { Audio } from "react-loader-spinner";

export default function ItemsSong(props) {
  const dispatch = useDispatch();
  const { encodeId, title, artists, thumbnail, link, releaseDate } = props.data;
  const { start, ellipsis } = props.icon;
  const { curSongID, infoSong, isPlaying } = useSelector(persistMusic);
  const handleStringSong = (name) => {
    if (name.length > 20) {
      return name.substring(0, 20) + "...";
    }
    return name;
  };
  // console.log(isPlaying)
  const dispatchSong = (id) => {
    if (id === curSongID) {
      dispatch(actionsPersistMusic.setPlaying({ type: 0, isPlaying }));
    }
    if (id !== curSongID) {
      dispatch(actionsPersistMusic.setIdMusicLocal(id));
      dispatch(actionsPersistMusic.setPlaying({ type: 1, isPlaying: true }));
    }
  };
  return (
    <div className="item-song d-flex">
      <div className="item-song_detail d-flex">
        <div className="item-song_img rounded">
          <img title="" alt="" src={thumbnail} className="img-fluid" />
          <div
            className="item-song_img-icon"
            style={Object.assign(
              {},
              encodeId === curSongID &&
                isPlaying === true && {
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  position: "absolute",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                }
            )}
          >
            <span
              onClick={() => dispatchSong(encodeId)}
              style={Object.assign(
                {},
                encodeId === curSongID &&
                  isPlaying === true && { display: "block" }
              )}
            >
              {encodeId === curSongID && isPlaying === true ? (
                <div className="item-song_img-icon_audio">
                  <Audio
                    height="25"
                    width="25"
                    color="#fff"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class_audio align-items-center"
                    visible={true}
                  />
                </div>
              ) : (
                <i className={start} />
              )}
            </span>
          </div>
        </div>
        <div className="item-song_content">
          <p>{handleStringSong(title)}</p>
          <div className="item-song_detail-artists">
            {artists?.map(({ name, link, id }, index) => (
              <div className="artists-name" key={id}>
                <Link to={link}>{name}</Link>{" "}
                <span>{index < artists.length - 1 ? "," : ""}</span>
              </div>
            ))}
          </div>
          <span>1 giờ trước</span>
        </div>
      </div>
      <div className="item-song_icon" title="Khác">
        <i className={ellipsis} />
      </div>
    </div>
  );
}
