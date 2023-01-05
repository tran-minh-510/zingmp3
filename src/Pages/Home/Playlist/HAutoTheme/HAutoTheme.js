import React from 'react'
import { Link } from 'react-router-dom'
import './HAutoTheme.scss'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay } from 'swiper';

export default function HAutoTheme1(props) {
    const { heart, ellipsis, start } = props.listIcon
    const { title, items } = props.hAutoTheme
    const navigate = useNavigate()
    const handleLengthArtists = (index, name, artists) => {
        if (index < 2) {
            return <div className="artists-name" key={index}>
                <Link>{name}</Link>{" "}
                <span>{index < artists.length - 1 ? ", " : ""}</span>
            </div>
        }
        if (index === 2) {
            return <span>...</span>
        }
    }
    return (
        <div className='playlist-hAutoTheme py-3'>
            <h4>{title}</h4>
            <div className='playlist-hAutoTheme_all-box w-100 d-flex mt-3'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={20}
                    slidesPerView={5}
                    // autoplay={{
                    //     delay: 3000,
                    //     disableOnInteraction: false
                    // }}
                    speed={600}
                    loop={true}
                >
                    {
                        items.map(({ encodeId, title, artists, thumbnailM, link, sortDescription }) =>
                            <SwiperSlide>
                                <div key={encodeId} className='playlist-hAutoTheme_child-box px-2 w-100' onClick={() => navigate(link.slice(0, -5))}>
                                    <div className='playlist-hAutoTheme-child_box-img'>
                                        <img alt='' src={thumbnailM} className="img-fluid" />
                                        <div className='playlist-hAutoTheme_child-overlay'>
                                            <div className='playlist-hAutoTheme_child-overlay_controls'>
                                                <div className='overlay_controls_the-others' title='Thêm vào thư viện'>
                                                    <i className={heart} />
                                                </div>
                                                <div className='overlay_controls-start' title={title}>
                                                    <i className={start} />
                                                </div>
                                                <div className='overlay_controls_the-others' title='Khác'>
                                                    <i className={ellipsis} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5>{title}</h5>
                                    <div className='playlist-hAutoTheme_child-box_artists'>
                                        {artists?.map(({ name }, index) => handleLengthArtists(index, name, artists))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }

                </Swiper>

            </div>
        </div>
    )
}
