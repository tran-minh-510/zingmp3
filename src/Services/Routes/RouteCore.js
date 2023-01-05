import React from 'react'
import { Routes, Route } from 'react-router-dom'
import routePubic from '../../Routes/routePublic'
import Error404 from '../../Error/Error404'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import routePrivated from '../../Routes/routePrivated';
import Public from '../../Components/Public/Public';
import { getStateUser } from '../../Components/GeneralSlice/sliceUser';

export default function RouteCore() {
    const { isPrivated } = useSelector(getStateUser)
    return (
        <Routes>
            <Route path='/' element={<Public />}>
                {routePubic}
                <Route path='/' element={isPrivated ? <Navigate to='/' /> : <Outlet />} >
                    {routePrivated}
                </Route>
                <Route path='*' element={<Error404 />} />
            </Route>
        </Routes>
    )
}
