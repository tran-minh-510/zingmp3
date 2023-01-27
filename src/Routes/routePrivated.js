import React from 'react'
import { Route } from "react-router-dom";
import User from '../Pages/User/User';

const routePrivated = (
    <>
        <Route path='ca-nhan' element={<User />} />
    </>
)

export default routePrivated