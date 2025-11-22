import { useEffect, useRef, useState } from "react";
import { Games } from "../components/Games";
import { useTheme } from "../components/ThemeProvider";

export function Home(){
  const { theme } = useTheme();

  const [games, setGames] = useState("");
  const [query, setQuery] = useState("");
  
  useEffect(() => {
    setGames("");
  }, []);


  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGames(query);
    setQuery("");
    searchInputRef.current?.focus();
  };

  return (
    <>      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4">   
          <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative">
              <input ref={searchInputRef} value={query} onChange={(e) => setQuery(e.target.value)} type="search" id="search" 
                className={`block w-full p-4 ps-10 text-sm border rounded-lg focus:outline-none 
                  ${theme === "light" ? "text-gray-900 border-gray-300 bg-gray-50 focus:border-gray-600" : "text-gray-100 border-gray-700 bg-gray-800 focus:border-gray-300"}
                  `}

                placeholder="Search Games, DLC..." />
              <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
          </div>
      </form>

      <Games games={games} isBookmarkPage={false}/>
    </>
  )
}