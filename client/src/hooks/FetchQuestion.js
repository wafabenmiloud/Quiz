import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { questions, answers } from "../data/questions";

/** redux actions */
import * as Action from '../redux/question_reducer'

/** load questions from local data */
export const useFetchQestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading : false, apiData : [], serverError: null});

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        try {
            if (questions.length > 0) {
                setGetData(prev => ({...prev, isLoading : false, apiData : questions}));
                dispatch(Action.startExamAction({ question: questions, answers }));
            } else {
                throw new Error("No Questions Available");
            }
        } catch (error) {
            setGetData(prev => ({...prev, isLoading : false, serverError : error}));
        }
    }, [dispatch]);

    return [getData, setGetData];
}


/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}