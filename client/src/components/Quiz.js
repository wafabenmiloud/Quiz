import React, {  useState } from 'react'
import Questions from './Questions'
import "./Quiz.css";
import { ArrowRight,ArrowLeft } from "react-bootstrap-icons";
import headerImg from "../assets/bg.svg";

import { MoveNextQuestion, MovePrevQuestion } from '../hooks/FetchQuestion';
import { PushAnswer } from '../hooks/setResult';

/** redux store import */
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

export default function Quiz() {

    const [check, setChecked] = useState(undefined)

    const result = useSelector(state => state.result.result);
    const { queue, trace } = useSelector(state => state.questions);
    const dispatch = useDispatch()

    /** next button event handler */
    function onNext(){
        if(trace < queue.length){
            /** increase the trace value by one using MoveNextAction */
            dispatch(MoveNextQuestion());

            /** insert a new result in the array.  */
            if(result.length <= trace){
                dispatch(PushAnswer(check))
            }
        }
     
        /** reset the value of the checked variable */
        setChecked(undefined)
    }

    /** Prev button event handler */
    function onPrev(){
        if(trace > 0){
            /** decrease the trace value by one using MovePrevQuestion */
            dispatch(MovePrevQuestion());
        }
    }

    function onChecked(check){
        setChecked(check)
    }

    /** finished exam after the last question */
    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace={true}></Navigate>
    }

  return (
    <>
      <nav>
        <Link to="/">
        <img src={headerImg} alt="Header Img" />

        </Link>
    </nav>
    <div className='quiz'>
           

        {/* display questions */}
        <Questions onChecked={onChecked} />

        <div className='grid'>
            { trace > 0 ? <button className='prev' onClick={onPrev}><ArrowLeft size={35} /> Prev </button> : <div></div>}
            <button className='next' onClick={onNext}> Next <ArrowRight size={35} /></button>
        </div>
    </div>
    </>
  
  )
}
