import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Questions from './Questions'
import "./Quiz.css";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import headerImg from "../assets/bg.svg";

import { moveNextAction, movePrevAction } from '../redux/question_reducer';
import { setAnswerAction } from '../redux/result_reducer';
import { getQuiz } from '../data/quizzes';
import { isAnswered, scoreQuiz } from '../quiz/engine';
import { attempts_Number } from '../helper/helper';
import { useTheme } from '../hooks/useTheme';

import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

/** long enough to see the selection land before the next question slides in */
const AUTO_ADVANCE_MS = 420;

export default function Quiz() {

    const result = useSelector(state => state.result.result);
    const { quizId, order, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    const quiz = getQuiz(quizId);
    const total = quiz ? quiz.questions.length : 0;
    const question = quiz?.questions[trace];
    const value = result[trace];
    const answered = isAnswered(value);

    const [direction, setDirection] = useState('forward');
    const timer = useRef(null);

    /** page colour drifts toward whichever outcome is currently in the lead */
    const ambient = useMemo(() => {
        if (!quiz) return null;
        const { scores, last } = scoreQuiz(quiz, result);
        return quiz.ambient(scores, last);
    }, [quiz, result]);
    useTheme(ambient?.color, ambient?.color2);

    useEffect(() => () => clearTimeout(timer.current), []);

    const onNext = useCallback(() => {
        clearTimeout(timer.current);
        if (!answered) return;
        setDirection('forward');
        dispatch(moveNextAction());
    }, [answered, dispatch]);

    const onPrev = useCallback(() => {
        clearTimeout(timer.current);
        if (trace > 0) {
            setDirection('back');
            dispatch(movePrevAction());
        }
    }, [trace, dispatch]);

    const onSelect = useCallback((choice) => {
        dispatch(setAnswerAction({ index: trace, value: choice }));
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setDirection('forward');
            dispatch(moveNextAction());
        }, AUTO_ADVANCE_MS);
    }, [trace, dispatch]);

    /** keyboard: 1–5 / A–E pick an option, ← → move between questions */
    useEffect(() => {
        if (!question) return undefined;
        const onKey = (e) => {
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            const key = e.key.toLowerCase();
            const options = order[trace] || [];
            let pos = -1;
            if (/^[1-9]$/.test(key)) pos = Number(key) - 1;
            else if (/^[a-e]$/.test(key)) pos = key.charCodeAt(0) - 97;

            if (pos >= 0 && pos < options.length) {
                e.preventDefault();
                onSelect(options[pos]);
            } else if (key === 'arrowleft') {
                onPrev();
            } else if (key === 'arrowright') {
                onNext();
            } else if (key === 'enter' && document.activeElement?.tagName !== 'BUTTON') {
                onNext();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [question, order, trace, onSelect, onPrev, onNext]);

    if (!quiz) {
        return <Navigate to={'/'} replace={true} />
    }

    if (trace >= total) {
        return <Navigate to={'/result'} replace={true} />
    }

    const progress = Math.round((attempts_Number(result) / total) * 100);
    const isLast = trace === total - 1;

    return (
        <>
            <nav>
                <Link to="/">
                    <img src={headerImg} alt="Home" />
                </Link>
                <span className="nav-title">{quiz.emoji} {quiz.title}</span>
            </nav>

            <div className="quiz-progress">
                <div className="progress-header">
                    <span className="q-counter">Question {trace + 1} of {total}</span>
                    <span className="q-counter">{progress}%</span>
                </div>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className='quiz'>
                <div key={trace} className={`slide slide-${direction}`}>
                    <Questions
                        question={question}
                        order={order[trace]}
                        value={value}
                        onSelect={onSelect}
                    />
                </div>

                <div className='grid'>
                    {trace > 0
                        ? <button className='prev' onClick={onPrev}><ArrowLeft size={17} /> Prev</button>
                        : <div />
                    }
                    <button className='next' onClick={onNext} disabled={!answered}>
                        {isLast ? 'See my result' : 'Next'} <ArrowRight size={17} />
                    </button>
                </div>

                <p className='key-hint'>
                    Tip: press <kbd>1</kbd>–<kbd>{order[trace].length}</kbd> to answer, <kbd>←</kbd> <kbd>→</kbd> to move
                </p>
            </div>
        </>
    )
}
