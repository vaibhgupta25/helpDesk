import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './reducers/userReducer'
import { ticketReducers } from './reducers/ticketReducer'

const userInfoFromStorage = localStorage.getItem('account')
    ? JSON.parse(localStorage.getItem('account')) : null

const initialState = {
    user: { userInfo: userInfoFromStorage }
}

const store = configureStore({
    reducer: {
        user: userReducers,
        ticket: ticketReducers,
    },
    preloadedState: initialState
})
export default store