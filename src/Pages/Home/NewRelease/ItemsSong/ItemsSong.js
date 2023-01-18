import React from 'react'
import './ItemsSong.scss'
import { Link } from 'react-router-dom'
import moment from "moment";

export default function ItemsSong(props) {
    const { encodeId, title, artists, thumbnail, link, releaseDate } = props.data
    const { start, ellipsis } = props.icon
    return (
        <div className='item-song d-flex'>
            <div className='item-song_detail d-flex'>
                <div className='item-song_img'>
                    <img title='' alt='' src={thumbnail} className="img-fluid rounded" />
                    <div className='item-song_img-icon'>
                        {/* <i className={start} /> */}
                    </div>
                </div>
                <div className='item-song_content'>
                    <p>{title}</p>
                    <div className="item-song_detail-artists">
                        {artists?.map(({ name, link, id }, index) => (
                            <div className="artists-name" key={id}>
                                <Link to={link}>
                                    {name}
                                </Link>{" "}
                                <span>{index < artists.length - 1 ? "," : ""}</span>
                            </div>
                        ))}
                    </div>
                    <span>1 giờ trước</span>
                </div>
            </div>
            <div className='item-song_icon' title='Khác'>
                <i className={ellipsis} />
            </div>
        </div>
    )
}
