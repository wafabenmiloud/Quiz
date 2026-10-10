import { useEffect } from 'react';

/** Tints the whole page. Colours animate via the @property rules in App.css. */
export function useTheme(color, color2) {
    useEffect(() => {
        const root = document.documentElement;
        if (!color) return undefined;
        root.style.setProperty('--accent', color);
        root.style.setProperty('--accent-2', color2 || color);
        return () => {
            root.style.removeProperty('--accent');
            root.style.removeProperty('--accent-2');
        };
    }, [color, color2]);
}
