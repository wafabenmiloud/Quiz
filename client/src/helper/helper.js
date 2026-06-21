import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function attempts_Number(result){
    return result.filter(r => r !== undefined).length;
}

const ZODIAC_SIGNS = {
  0: {
    sign: "Aries ♈",
    element: "Fire",
    emoji: "🔥",
    traits: "Bold, passionate, spontaneous, and driven. You lead with your heart and never back down from a challenge.",
    compatible: "Leo & Sagittarius",
  },
  1: {
    sign: "Taurus ♉",
    element: "Earth",
    emoji: "🌿",
    traits: "Grounded, patient, dependable, and sensual. You find beauty in the simple things and build a life that lasts.",
    compatible: "Virgo & Capricorn",
  },
  2: {
    sign: "Gemini ♊",
    element: "Air",
    emoji: "💨",
    traits: "Curious, witty, adaptable, and social. You thrive on ideas, conversation, and the thrill of something new.",
    compatible: "Libra & Aquarius",
  },
  3: {
    sign: "Cancer ♋",
    element: "Water",
    emoji: "🌊",
    traits: "Deeply intuitive, empathetic, nurturing, and loyal. You feel everything intensely and love fiercely.",
    compatible: "Scorpio & Pisces",
  },
};

/**
 * Tallies element scores and returns the dominant zodiac result.
 * answers is a 2D array: answers[questionIndex][optionIndex] → element (0–3)
 */
export function getZodiacResult(result, answers) {
    const tally = [0, 0, 0, 0]; // Fire, Earth, Air, Water
    result.forEach((optionIndex, i) => {
        if (optionIndex !== undefined && answers[i]) {
            const element = answers[i][optionIndex];
            if (element !== undefined) tally[element]++;
        }
    });
    const dominantElement = tally.indexOf(Math.max(...tally));
    return { ...ZODIAC_SIGNS[dominantElement], tally };
}

/** check user auth  */
export function CheckUserExist({ children }){
    const auth = useSelector(state => state.result.userId)
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
}

/** post server data (kept for result saving) */
export async function postServerData(url, result, callback){
    try {
        const { default: axios } = await import('axios');
        const data = await (await axios.post(url, result))?.data;
        return callback ? callback(data) : data;
    } catch {
        return null;
    }
}
