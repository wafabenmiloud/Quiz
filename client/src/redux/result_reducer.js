import { createSlice } from "@reduxjs/toolkit"
import { startQuizAction } from "./question_reducer"

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
        userId : null,
        birthday : '',
        result : [],        /** result[i] → chosen option index, or null */
        challenger : null,  /** friend whose share link brought the user here */
        saved : false       /** current result already sent to the server */
    },
    reducers : {
        setUser : (state, action) => {
            state.userId = action.payload.userId
            state.birthday = action.payload.birthday || ''
        },
        setAnswerAction : (state, action) => {
            const { index, value } = action.payload;
            state.result[index] = value;
            state.saved = false;
        },
        setChallenger : (state, action) => {
            state.challenger = action.payload
        },
        markSaved : (state) => {
            state.saved = true
        },
        /** keeps the name and birthday so "try again" doesn't ask twice */
        resetResultAction : (state) => {
            state.result = []
            state.challenger = null
            state.saved = false
        }
    },
    extraReducers : (builder) => {
        builder.addCase(startQuizAction, (state, action) => {
            state.result = action.payload.order.map(() => null)
            state.saved = false
        })
    }
})

export const { setUser, setAnswerAction, setChallenger, markSaved, resetResultAction } = resultReducer.actions;

export default resultReducer.reducer;
