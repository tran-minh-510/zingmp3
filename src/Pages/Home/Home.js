import React, { useEffect, useState } from 'react'
import CallAPIZing from '../../Services/Api/CallAPIZing'
import HttpClient from '../../Services/Api/HttpClient'
import { useDispatch, useSelector } from 'react-redux'
import Banner from './Banner/Banner'
import { banner } from './Banner/sliceBanner'
import { actionsPlaylist, statePlaylistHArtistTheme, stateHAutoTheme1, stateHAutoTheme2, stateHAlbum, stateHXone, stateH100 } from './Playlist/slicePlaylist'

import { actionsBanner } from './Banner/sliceBanner'
import HAutoTheme from './Playlist/HAutoTheme/HAutoTheme'
import NewRelease from './NewRelease/NewRelease'
import { actionsNewRelease, stateNewRelease } from './NewRelease/sliceRelease'

const callapiZing = new CallAPIZing()
const callapi = new HttpClient()

export default function Home() {
    const dispatch = useDispatch()
    const listBanner = useSelector(banner)
    const hArtistTheme = useSelector(statePlaylistHArtistTheme)
    const hAutoTheme1 = useSelector(stateHAutoTheme1)
    const hAutoTheme2 = useSelector(stateHAutoTheme2)
    const hAlbum = useSelector(stateHAlbum)
    const hXone = useSelector(stateHXone)
    const h100 = useSelector(stateH100)
    const newRelease = useSelector(stateNewRelease)
    const [listIcon, setListIcon] = useState({})
    useEffect(() => {
        const callApiBanner = async () => {
            const res = await callapiZing.get(callapiZing.home)
            if (res.response.ok) {
                const items = res.data.data.items
                const banner = items.find(item => item.sectionType === 'banner')
                const hArtistTheme = items.find(item => item.sectionId === 'hArtistTheme')
                const hAutoTheme1 = items.find(item => item.sectionId === 'hAutoTheme1')
                const hAutoTheme2 = items.find(item => item.sectionId === 'hAutoTheme2')
                const hAlbum = items.find(item => item.sectionId === 'hAlbum')
                const hXone = items.find(item => item.sectionId === 'hXone')
                const h100 = items.find(item => item.sectionId === 'h100')
                const newRelease = items.find(item => item.sectionType === 'new-release')
                dispatch(actionsBanner.setBanner(banner.items))
                dispatch(actionsPlaylist.setHArtistTheme(hArtistTheme))
                dispatch(actionsPlaylist.setHAutoTheme1(hAutoTheme1))
                dispatch(actionsPlaylist.setHAutoTheme2(hAutoTheme2))
                dispatch(actionsPlaylist.setHAlbum(hAlbum))
                dispatch(actionsPlaylist.setHXone(hXone))
                dispatch(actionsPlaylist.setH100(h100))
                dispatch(actionsNewRelease.setNewRelease(newRelease))
            }
        }
        const callApiIcon = async () => {
            const res = await callapi.get(callapi.iconAlbum)
            if (res.response.ok) {
                const data = res.data
                setListIcon(data)
            }
        }
        callApiBanner()
        callApiIcon()
    }, [])
    return (
        <>
            <div className="container container-fluid">
                <Banner listBanner={listBanner} />
                <HAutoTheme listIcon={listIcon} hAutoTheme={hArtistTheme} />
                <HAutoTheme listIcon={listIcon} hAutoTheme={hAutoTheme1} />
                <HAutoTheme listIcon={listIcon} hAutoTheme={hAutoTheme2} />
                <HAutoTheme listIcon={listIcon} hAutoTheme={hAlbum} />
                <HAutoTheme listIcon={listIcon} hAutoTheme={hXone} />
                <HAutoTheme listIcon={listIcon} hAutoTheme={h100} />
                <NewRelease listIcon={listIcon} newRelease={newRelease.newRelease} />
            </div>
        </>
    )
}
