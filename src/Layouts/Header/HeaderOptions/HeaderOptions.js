import React from 'react'
import './HeaderOptions.scss'
import LoginButton from './Login'
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useEffect } from 'react';
import LogoutButton from './LogOut';
import { useDispatch } from 'react-redux';
import { actionsSliceUser } from '../../../Components/GeneralSlice/sliceUser';

export default function HeaderOptions(props) {
    const dispatch = useDispatch();
    const { settings, theme, upload, userIcon, vip } = props.icons;
    const { user, isAuthenticated, isLoading } = useAuth0();
    const menuList = useRef();
    const handleLogOut = () => {
        if (isAuthenticated) {
            menuList.current.style.display = 'block'
        }
    }
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(actionsSliceUser.setIsPrivated(false))
        } else {
            dispatch(actionsSliceUser.setIsPrivated(true))
        }
    }, [])
    return (
        <div className='header-options d-flex justify-content-around'>
            <span title='chủ đề'><i class={`${theme}`}></i></span>
            <span title='nâng cấp vip'><i class={`${vip}`}></i></span>
            <span title='tải lên'><i class={`${upload}`}></i></span>
            <span title='cài đặt'><i class={`${settings}`}></i></span>
            <span onClick={() => handleLogOut()}> {isAuthenticated ? <img alt="" src={user.picture} className="img-fluid" /> : <LoginButton />}
                <div className='menu-list' ref={menuList}>
                    <ul className="list-group">
                        <li className="list-group-item">Nâng cấp VIP</li>
                        <li className="list-group-item">Mua code VIP</li>
                        <li className="list-group-item"><LogoutButton /></li>
                    </ul>
                </div></span>
        </div>
    )
}
{/* <i class={`${userIcon}`}></i> */ }