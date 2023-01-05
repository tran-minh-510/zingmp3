import React from 'react'
import logo from '../../../../Assets/images/logo.svg'

export default function Logo() {
    return (
        <div className='logo ps-4 pe-3 h-18 d-flex align-items-center nav-bar_left'>
            <img src={logo} alt='logo' className='img-fluid' />
        </div>
    )
}
