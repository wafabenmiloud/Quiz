import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";
import "./Main.css";
import TrackVisibility from "react-on-screen";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/bg.svg";

export default function Main() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [
    " Get ready for your next programming interview with our quiz app!",
    " Become a programming interview pro with our quiz app",
    " Are you ready to tackle challenging questions?",
  ];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  const inputRef = useRef();
  const dispatch = useDispatch();

  function startQuiz() {
    const userId = inputRef.current.value;
    if (userId) {
      dispatch(setUserId(userId));
    }
  }

  return (
    <div className="main">
      <div className="row">
        <div>
          <TrackVisibility>
            {({ isVisible }) => (
              <div
                className={isVisible ? "animate__animated animate__fadeIn" : ""}
              >
                <h1> Hi!  
                  <span
                    className="txt-rotate"
                    dataPeriod="100"
                    data-rotate='[ " Get ready for your next programming interview with our quiz app!", " Become a programming interview pro with our quiz app", " Are you ready to tackle challenging questions?" ]'
                  >
                    <span className="wrap">{text}</span>
                  </span>
                </h1>

                <ul>
                <li>You will be asked 20 questions.</li>
                <li>10 points for the correct answer.</li>
                <li>
                  Each question has 3 options. Only one is correct.
                </li>
                <li>
                  You can review and change answers before the quiz finishes.
                </li>

                </ul>
                <input
                  ref={inputRef}
                  className="userid"
                  type="text"
                  placeholder="Username *"
                />
                <Link className="button" to="/quiz" onClick={startQuiz}>
                  Start Quiz <ArrowRightCircle size={25} />
                </Link>
              </div>
            )}
          </TrackVisibility>
        </div>

        <div>
          <TrackVisibility>
            {({ isVisible }) => (
              <div
                className={isVisible ? "animate__animated animate__zoomIn" : ""}
              >
                <img src={headerImg} alt="Header Img" />
              </div>
            )}
          </TrackVisibility>
        </div>
      </div>
    </div>
  );
}
