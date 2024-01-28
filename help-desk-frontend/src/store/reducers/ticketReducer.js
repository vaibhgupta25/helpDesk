import { createSlice } from "@reduxjs/toolkit";

const ticketInitialState = { ticket: [] }
const ticketSlice = createSlice({
    name: "ticket",
    initialState: ticketInitialState,
    reducers: {
        setTicket(state, action) {
            state.ticket = action.payload;
        }
    }
})

const ticketActions = ticketSlice.actions;
const ticketReducers = ticketSlice.reducer;
export { ticketActions, ticketReducers };