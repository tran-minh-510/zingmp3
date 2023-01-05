import React, { useState, useEffect, useRef } from 'react'
import HttpClient from '../../Services/Api/HttpClient'
import SideBarLeft from '../../Layouts/SideBar/SideBarLeft/SideBarLeft'
import SideBarRight from '../../Layouts/SideBar/SideBarRight/SideBarRight'
import Header from '../../Layouts/Header/Header'
import { Outlet } from 'react-router-dom'
import './Public.scss'
import Footer from '../../Layouts/Footer/Footer'
import { Scrollbars } from 'react-custom-scrollbars';
import { actionsBodyAppRef } from '../../Layouts/Footer/PlayerControlBar/slicePlayerControlBar'
import { useDispatch } from 'react-redux'

const callapi = new HttpClient()

export default function Public() {
    const [mailColor, setMainColor] = useState({})
    const [iconHeader, setIconHeader] = useState({})
    const bodyAppRef = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        const callApiColor = async () => {
            const res = await callapi.get(callapi.mainColor)
            if (res.response.ok) {
                setMainColor(res.data)
            }
        }
        const callApiIconHeader = async () => {
            const res = await callapi.get(callapi.iconOptionsHeader)
            if (res.response.ok) {
                setIconHeader(res.data)
            }
        }
        callApiColor()
        callApiIconHeader()
        // dispatch(actionsBodyAppRef.setBodyAppRef(bodyAppRef.current))
    }, [])
    return (
        <>
            <div className="w-100 container-fluid h-100 p-0" ref={bodyAppRef}>
                <div className="row h-100 w-100 m-0">
                    <div className="col col-1 px-0 z-index-1500" style={{ width: '12.7%' }}>
                        <SideBarLeft mailColor={mailColor} />
                    </div>
                    <div className="col col-9 px-0" style={{ width: '71%' }}>
                        <Header mailColor={mailColor} iconHeader={iconHeader} />
                        <div className="wrapper-content overflow-auto h-100vh" style={{ backgroundColor: `${mailColor?.violetColor?.Violet400}` }}>
                            <Scrollbars
                                autoHide
                                autoHideDuration={500}
                                style={{ width: '100%', height: '100%', backGround: "red" }}
                                renderTrackVertical={props => <div {...props} className="track-vertical" />}
                                renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
                            >
                                <Outlet context={mailColor} />
                            </Scrollbars>
                        </div>
                    </div>
                    <div className="col col-2 px-0 z-index-1500" style={{ width: '16.3%' }}>
                        <SideBarRight mailColor={mailColor} />
                    </div>
                </div>
            </div>
            <Footer mailColor={mailColor} />
        </>
    )
}
