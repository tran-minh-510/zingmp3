import React from 'react'
import { Route } from "react-router-dom";
import Home from '../Pages/Home/Home';
import ZingChart from '../Pages/ZingChart/ZingChart';
import Follow from '../Pages/Follow/Follow';
import Radio from '../Pages/Radio/Radio';
import Album from '../Pages/Album/Album';

const routePubic = (
    <>

        <Route path='' element={<Home />} />
        <Route path='zing-chart' element={<ZingChart />} />
        <Route path='radio' element={<Radio />} />
        <Route path='the-loai-nghe-si' element={<Follow />} />
        <Route path=':playlist/:name/:id' element={<Album />} />
    </>
)

export default routePubic