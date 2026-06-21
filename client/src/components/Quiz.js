import React, { useState } from 'react'
import Questions from './Questions'
import "./Quiz.css";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";
import headerImg from "../assets/bg.svg";

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

export default function Quiz() {

    const [check, setChecked] = useState(undefined)

    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    function onNext() {
        if (trace < queue.length) {
            dispatch(MoveNextQuestion());
            if (result.length <= trace) {
                dispatch(PushAnswer(check))
            }
        }
        setChecked(undefined)
    }

    function onPrev() {
        if (trace > 0) {
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check) {
        setChecked(check)
    }

    if (result.length && result.length >= queue.length) {
        return <Navigate to={'/result'} replace={true} />
    }

    const totalQ   = queue.length || 1;
    const progress = Math.round((trace / totalQ) * 100);

    return (
        <>
            <nav>
                <Link to="/">
                    <img src={headerImg} alt="Home" />
                </Link>
            </nav>

            <div className="quiz-progress">
                <div className="progress-header">
                    <span className="q-counter">Question {trace + 1} of {queue.length || '—'}</span>
                    <span className="q-counter">{progress}%</span>
                </div>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className='quiz'>
                <Questions onChecked={onChecked} />

                <div className='grid'>
                    {trace > 0
                        ? <button className='prev' onClick={onPrev}><ArrowLeft size={17} /> Prev</button>
                        : <div />
                    }
                    <button className='next' onClick={onNext}>Next <ArrowRight size={17} /></button>
                </div>
            </div>
        </>
    )
}
