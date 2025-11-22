import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<{theme: string, setTheme: (theme: string) => void}>({
    theme: "light",
    setTheme: () => {}
});

export function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setThemeState] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "light";
    })

    const setTheme = (newTheme: string) => {
        setThemeState(newTheme);
        localStorage.setItem("theme", newTheme);
    }

    useEffect(() =>{
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "light") {
            document.body.classList.add("bg-white");
            document.body.classList.remove("bg-gray-700");
        } else {
            document.body.classList.add("bg-gray-700");
            document.body.classList.remove("bg-white");
        }
    }, [theme]);
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    return useContext(ThemeContext);
}