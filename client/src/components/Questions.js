import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Quiz.css";

import { useFetchQestion } from '../hooks/FetchQuestion'
import { updateResult } from '../hooks/setResult'

const LETTERS = ['A', 'B', 'C', 'D'];

export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions);
    const result    = useSelector(state => state.result.result);
    const [{ isLoading, serverError }] = useFetchQestion()
    const questions  = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch   = useDispatch()

    useEffect(() => {
        if (checked !== undefined) {
            dispatch(updateResult({ trace, checked }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked])

    function onSelect(i) {
        onChecked(i)
        setChecked(i)
        dispatch(updateResult({ trace, checked: i }))
    }

    if (isLoading)   return <h3 className='text-light'>Loading…</h3>;
    if (serverError) return <h3 className='text-light'>{String(serverError)}</h3>;

    return (
        <div className='questions'>
            <h2>{questions?.question}</h2>

            <ul key={questions?.id}>
                {questions?.options.map((q, i) => (
                    <li key={i} className={result[trace] === i ? 'selected' : ''}>
                        <input
                            type="radio"
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />
                        <label htmlFor={`q${i}-option`}>
                            <span className="opt-letter">{LETTERS[i]}</span>
                            {q}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}
