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
  const toRotate = [
    "Fire, Earth, Air, or Water?",
    "12 questions. One cosmic truth.",
    "Discover your elemental identity.",
  ];
  const period = 1800;

  useEffect(() => {
    let ticker = setInterval(() => { tick(); }, delta);
    return () => { clearInterval(ticker); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prev => prev / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
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

        {/* ── Left: content ── */}
        <div>
          <TrackVisibility>
            {({ isVisible }) => (
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>

                <span className="tag">✦ Personality Quiz</span>

                <h1>
                  Discover Your<br />
                  <span className="gradient-text">Zodiac Personality</span>
                </h1>

                <p className="tagline">
                  <span className="wrap">{text || " "}</span>
                </p>

                <ul className="steps">
                  <li>Answer 12 personality questions honestly</li>
                  <li>Choose from 4 options — no right or wrong answers</li>
                  <li>Discover if you are Fire ♈, Earth ♉, Air ♊, or Water ♋</li>
                </ul>

                <input
                  ref={inputRef}
                  className="userid"
                  type="text"
                  placeholder="Enter your name to begin…"
                />

                <Link className="button" to="/quiz" onClick={startQuiz}>
                  Start Quiz <ArrowRightCircle size={18} />
                </Link>

              </div>
            )}
          </TrackVisibility>
        </div>

        {/* ── Right: illustration ── */}
        <div className="col-visual">
          <TrackVisibility>
            {({ isVisible }) => (
              <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                <img src={headerImg} alt="Zodiac illustration" />
              </div>
            )}
          </TrackVisibility>
        </div>

      </div>
    </div>
  );
}
