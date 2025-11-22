import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

export function Navbar(){

    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }


    
    return(
            <nav className="nav-bar bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="static flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <div className="absolute left-4 flex items-center">
                                    <span className="font-medium text-white text-lg">Digital Games Deals</span>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="flex space-x-6">
                                    <Link
                                        to="/"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/bookmarks"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                    >
                                        Bookmarks
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute right-4 flex items-center">
                                <button
                                  onClick={toggleTheme}
                                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                                >
                                  {theme === "light" ? "☀️ Light" :  "🌙 Dark"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
    )
}