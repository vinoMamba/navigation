export const useDark = () => {
    let modeState = window.localStorage.getItem("theme");
    const setModeState = () => {
        modeState = modeState === "darkMode" ? "" : "darkMode";
        document.documentElement.setAttribute("data-theme", modeState);
        localStorage.setItem("theme", modeState);
    };
    return {modeState, setModeState};
};
