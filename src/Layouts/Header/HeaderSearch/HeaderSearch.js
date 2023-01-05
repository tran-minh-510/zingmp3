import React from 'react'

export default function HeaderSearch(props) {
    const { arrowLeft, arrowRight, search } = props.icons
    return (
        <div className="header-search d-flex w-75">
            <div className="icon_next-prev px-2 justify-content-center align-items-center d-flex">
                <div className="icon icon-prev px-3">
                    <i class={arrowLeft}></i>
                </div>
                <div className="icon icon-next px-3">
                    <i class={arrowRight}></i>
                </div>
            </div>
            <div className="input-search input-group flex-nowrap w-75 p-2 rounded-pill d-flex justify-content-center align-items-center py-0">
                <i class={`${search} px-1`}></i>
                <input
                    type="text"
                    className="form-control border border-0 shadow-none"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                />
            </div>
        </div>
    )
}
