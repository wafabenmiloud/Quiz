import React from 'react'
import "./Quiz.css";
import { SLIDER_LABELS } from '../quiz/engine'

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

/**
 * Renders one question. `order` is the shuffled display order;
 * onSelect always receives the option's original index.
 */
export default function Questions({ question, order, value, onSelect }) {

    if (question.type === 'slider') {
        return (
            <div className='questions'>
                <p className='q-kind'>How much do you agree?</p>
                <h2>“{question.question}”</h2>
                <div className='scale' role='radiogroup' aria-label={question.question}>
                    {SLIDER_LABELS.map((label, i) => (
                        <button
                            key={label}
                            type='button'
                            role='radio'
                            aria-checked={value === i}
                            aria-label={label}
                            title={label}
                            className={`scale-dot size-${Math.abs(i - 2)}${value === i ? ' selected' : ''}`}
                            onClick={() => onSelect(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <div className='scale-ends'>
                    <span>Disagree</span>
                    <span>Agree</span>
                </div>
            </div>
        )
    }

    if (question.type === 'versus' || question.type === 'image') {
        return (
            <div className='questions'>
                <h2>{question.question}</h2>
                <div className={`tiles ${question.type}`}>
                    {order.map((orig, pos) => (
                        <React.Fragment key={orig}>
                            {question.type === 'versus' && pos === 1 && <span className='versus-or'>or</span>}
                            <button
                                type='button'
                                className={`tile${value === orig ? ' selected' : ''}`}
                                aria-pressed={value === orig}
                                onClick={() => onSelect(orig)}
                            >
                                <span className='tile-emoji'>{question.options[orig].emoji}</span>
                                <span className='tile-text'>{question.options[orig].text}</span>
                                <span className='tile-key'>{LETTERS[pos]}</span>
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='questions'>
            <h2>{question.question}</h2>

            <ul>
                {order.map((orig, pos) => (
                    <li key={orig} className={value === orig ? 'selected' : ''}>
                        <button
                            type='button'
                            className='opt'
                            aria-pressed={value === orig}
                            onClick={() => onSelect(orig)}
                        >
                            <span className="opt-letter">{LETTERS[pos]}</span>
                            {question.options[orig].text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
