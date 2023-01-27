import React from 'react'

export default function SideBarRight(props) {
    const { violetColor } = props.mailColor
    return (
        <div style={{ backgroundColor: `${violetColor?.Violet400}`, height: "100%", borderLeft: '0.1px solid #fff' }}>
            <h3>SideBarRight</h3>
        </div>
    )
}
