import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function attempts_Number(result){
    return result.filter(r => r !== null && r !== undefined).length;
}

/** check user auth  */
export function CheckUserExist({ children }){
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

/* ── Server API ─────────────────────────────────────────────── */
const API_URL = process.env.REACT_APP_API_URL
    || (process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : '');

/** JSON request to the quiz server; resolves to null when it is unreachable. */
async function request(path, options) {
    if (!API_URL) return null;
    try {
        const res = await fetch(`${API_URL}/api${path}`, options);
        const data = await res.json().catch(() => null);
        return res.ok ? data : { error : data?.error || 'request_failed' };
    } catch {
        return null;
    }
}

const post = (path, body) => request(path, {
    method : 'POST',
    headers : { 'Content-Type' : 'application/json' },
    body : JSON.stringify(body)
});

export const saveResult = (result) => post('/result', result);

export const fetchStats = (quizId) => request(`/stats?quizId=${encodeURIComponent(quizId)}`);

export const fetchReading = (payload) => post('/reading', payload);

/* ── Last zodiac result (for the daily horoscope) ───────────── */
const LAST_ZODIAC_KEY = 'quiz-last-zodiac';

export function rememberZodiac(entry) {
    try { localStorage.setItem(LAST_ZODIAC_KEY, JSON.stringify(entry)); } catch { /* ignore */ }
}

export function lastZodiac() {
    try { return JSON.parse(localStorage.getItem(LAST_ZODIAC_KEY)); } catch { return null; }
}
