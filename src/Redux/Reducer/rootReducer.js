import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

import sliceBanner from "../../Pages/Home/Banner/sliceBanner";
import sliceMusic from "../../Components/GeneralSlice/sliceMusic";
import sliceUser from '../../Components/GeneralSlice/sliceUser';
import slicePlaylist from '../../Pages/Home/Playlist/slicePlaylist';
import sliceNewRelease from '../../Pages/Home/NewRelease/sliceRelease';

import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'



const commonConfig = {
    storage, stateReconciler: autoMergeLevel2
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    blacklist: ['isPlaying']
}

const rootReducer = {
    reducer: {
        sliceBanner: sliceBanner,
        persistReducer: persistReducer(musicConfig, sliceMusic),
        sliceUser: sliceUser,
        slicePlaylist: slicePlaylist,
        sliceNewRelease: sliceNewRelease
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            serializableCheck: false
        }),
}

export default rootReducer
