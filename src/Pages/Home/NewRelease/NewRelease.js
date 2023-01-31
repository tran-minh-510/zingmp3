import React, { useState, useEffect, Fragment } from "react";
import ItemsSong from "./ItemsSong/ItemsSong";
import "./NewRelease.scss";

export default function NewRelease(props) {
  const { newRelease, listIcon } = props;
  const [listPlaylist, setListPlaylist] = useState([]);
  const btnType = ["tất cả", "việt nam", "quốc tế"];
  const [indexList, setIndexList] = useState(0);
  useEffect(() => {
    if (indexList === 0) {
      setListPlaylist(newRelease.items.all);
    }
    if (indexList === 1) {
      setListPlaylist(newRelease.items.vPop);
    }
    if (indexList === 2) {
      setListPlaylist(newRelease.items.others);
    }
  }, [newRelease.title, indexList]);
  const changeListType = (index) => {
    setIndexList(index);
  };
  return (
    <div className="new-release">
      <h3>{newRelease.title}</h3>
      <div className="new-release_type">
        {btnType.map((item, index) => (
          <div
            key={index}
            className={`btn-type ${indexList === index && "active"}`}
            onClick={() => changeListType(index)}
          >
            {item}
          </div>
        ))}
      </div>
      <div class="new-release_content pt-3">
        {listPlaylist?.map((item, index) => {
          const { encodeId, title, artists, thumbnail, link, releaseDate, streamingStatus } =
            item;
          return (
            <Fragment key={index}>
              <ItemsSong
                data={{
                  encodeId,
                  title,
                  artists,
                  link,
                  thumbnail,
                  releaseDate,
                  streamingStatus
                }}
                icon={listIcon}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
