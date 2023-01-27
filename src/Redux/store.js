import rootReducer from './Reducer/rootReducer'
import persistStore from "redux-persist/es/persistStore";
import { configureStore } from "@reduxjs/toolkit";
const reduxConfig = () => {
    const store = configureStore(rootReducer)
    const persistor = persistStore(store)
    return { store, persistor }
}


export default reduxConfig