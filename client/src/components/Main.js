import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/result_reducer";
import { startQuizAction } from "../redux/question_reducer";
import "./Main.css";
import TrackVisibility from "react-on-screen";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/bg.svg";
import { SECTIONS, DEFAULT_QUIZ_ID, getQuiz } from "../data/quizzes";
import { shuffledOrder, isAnswered } from "../quiz/engine";

const PERIOD = 1800;

/** Types and deletes each phrase in turn. */
function useTypewriter(phrases) {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  useEffect(() => {
    setText("");
    setIsDeleting(false);
    setLoopNum(0);
    setDelta(200);
  }, [phrases]);

  useEffect(() => {
    const ticker = setTimeout(() => {
      const fullText = phrases[loopNum % phrases.length];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(prev => Math.max(30, prev / 2));
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(PERIOD);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(120);
      } else if (!isDeleting) {
        setDelta(70 + Math.random() * 60);
      }
    }, delta);
    return () => clearTimeout(ticker);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, phrases]);

  return text;
}

export default function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, birthday: savedBirthday, challenger, result } = useSelector(state => state.result);
  const { quizId: activeQuizId, trace } = useSelector(state => state.questions);

  const [quizId, setQuizId] = useState(challenger?.quizId || DEFAULT_QUIZ_ID);
  const [name, setName] = useState(userId || "");
  const [birthday, setBirthday] = useState(savedBirthday || "");
  const [error, setError] = useState("");

  const quiz = getQuiz(quizId);
  const text = useTypewriter(quiz.typewriter);

  const activeQuiz = getQuiz(activeQuizId);
  const canResume = activeQuiz && userId && result.some(isAnswered) && trace < activeQuiz.questions.length;

  function startQuiz(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name to begin.");
      return;
    }
    dispatch(setUser({ userId: trimmed, birthday }));
    dispatch(startQuizAction({ quizId: quiz.id, order: shuffledOrder(quiz) }));
    navigate("/quiz");
  }

  return (
    <div className="main">
      <div className="row">

        {/* ── Left: content ── */}
        <div>
          <TrackVisibility once>
            {({ isVisible }) => (
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>

                {challenger && (
                  <p className="challenge-banner">
                    🔮 <strong>{challenger.name}</strong> got <strong>{challenger.title}</strong>.
                    {" "}Take the quiz to see how you compare.
                  </p>
                )}

                <span className="tag">✦ Personality Quiz</span>

                <h1>
                  {quiz.heading[0]}<br />
                  <span className="gradient-text">{quiz.heading[1]}</span>
                </h1>

                <p className="tagline">
                  <span className="wrap">{text || " "}</span>
                </p>

                <ul className="steps">
                  {quiz.steps.map((step) => <li key={step}>{step}</li>)}
                </ul>

                <form onSubmit={startQuiz} noValidate>
                  <input
                    className={`userid${error ? " invalid" : ""}`}
                    type="text"
                    value={name}
                    maxLength={40}
                    aria-label="Your name"
                    aria-invalid={Boolean(error)}
                    onChange={(e) => { setName(e.target.value); setError(""); }}
                    placeholder="Enter your name to begin…"
                  />
                  {error && <p className="field-error" role="alert">{error}</p>}

                  {quiz.id === "zodiac" && (
                    <label className="birthday">
                      <span>Birthday (optional) — compare your birth sign with your personality sign</span>
                      <input
                        className="userid"
                        type="date"
                        value={birthday}
                        max={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </label>
                  )}

                  <button className="button" type="submit">
                    Start Quiz <ArrowRightCircle size={18} />
                  </button>
                </form>

                <p className="home-links">
                  {canResume && <Link to="/quiz">↩ Resume {activeQuiz.title}</Link>}
                  <Link to="/today">☀ Today's horoscope</Link>
                </p>

              </div>
            )}
          </TrackVisibility>
        </div>

        {/* ── Right: illustration ── */}
        <div className="col-visual">
          <TrackVisibility once>
            {({ isVisible }) => (
              <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                <img src={headerImg} alt="Zodiac illustration" />
              </div>
            )}
          </TrackVisibility>
        </div>

      </div>

      {/* ── Quiz catalogue ── */}
      <div className="catalogue">
        {SECTIONS.map((section) => (
        <section key={section.title}>
        <h2>{section.title}</h2>
        <div className="catalogue-grid" role="radiogroup" aria-label={section.title}>
          {section.quizzes.map((q) => (
            <button
              key={q.id}
              type="button"
              role="radio"
              aria-checked={q.id === quizId}
              className={`quiz-card${q.id === quizId ? " active" : ""}`}
              onClick={() => { setQuizId(q.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              <span className="quiz-card-emoji">{q.emoji}</span>
              <span className="quiz-card-title">{q.title}</span>
              <span className="quiz-card-blurb">{q.blurb}</span>
              <span className="quiz-card-meta">{q.questions.length} questions</span>
            </button>
          ))}
        </div>
        </section>
        ))}
      </div>
    </div>
  );
}
