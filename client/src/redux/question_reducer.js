import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizId : null,
    order : [],   /** order[i] → shuffled option indexes for question i */
    trace : 0
}

/** create reducer */
export const questionReducer = createSlice({
    name: 'questions',
    initialState,
    reducers : {
        startQuizAction : (state, action) => {
            const { quizId, order } = action.payload
            return { quizId, order, trace : 0 }
        },
        moveNextAction : (state) => {
            state.trace += 1
        },
        movePrevAction : (state) => {
            state.trace = Math.max(0, state.trace - 1)
        },
        resetAllAction : () => initialState
    }
})

export const { startQuizAction, moveNextAction, movePrevAction, resetAllAction } = questionReducer.actions;

export default questionReducer.reducer;
