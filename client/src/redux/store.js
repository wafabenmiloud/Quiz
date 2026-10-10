import { combineReducers, configureStore } from '@reduxjs/toolkit';

/** call reducers */
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';
import { getQuiz } from '../data/quizzes';

const STORAGE_KEY = 'quiz-state-v1';

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer
})

/** restore the last session so a page refresh doesn't lose progress */
function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!saved?.questions || !saved?.result) return undefined;
        const quiz = getQuiz(saved.questions.quizId);
        // drop progress for a quiz that has since been removed or changed length
        if (saved.questions.quizId && (!quiz || saved.result.result.length !== quiz.questions.length)) {
            return undefined;
        }
        return saved;
    } catch {
        return undefined;
    }
}

/** create store with reducer */
const store = configureStore({ reducer : rootReducer, preloadedState : loadState() });

store.subscribe(() => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
    } catch {
        /* storage full or blocked — the quiz still works for this page load */
    }
});

export default store;
