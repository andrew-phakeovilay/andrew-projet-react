import { useFetch } from "../customhooks/useFetch";
import { useCallback, useMemo, useState } from "react";
import { useBookmark } from "./BookmarkProvider";
import type { Game } from "./Game";
import { GameCard } from "./GameCard";
import { useTheme } from "./ThemeProvider";

export function Games(props: {games: string, isBookmarkPage:boolean}) {
    const [sortOption, setSortOption] = useState("name-asc");

    const { bookmarks, addBookmark, removeBookmark } = useBookmark(); 
    const { theme } = useTheme();

    let games = props.games;

    if(games == ''){
        games = "?";
    }

    let gamesList;
    
    if(props.isBookmarkPage){
        gamesList = bookmarks;
    }else{
        gamesList = useFetch<Game[]>(`https://www.cheapshark.com/api/1.0/games?title=${games}&limit=50`);
    }

    const sortedGames = useMemo(() => {
        if (!gamesList) return [];

        const listCopy = [...gamesList];

        switch (sortOption) {
          case "name-asc":
            return listCopy.sort((a, b) => a.external.localeCompare(b.external));
          case "name-desc":
            return listCopy.sort((a, b) => b.external.localeCompare(a.external));
          case "price-asc":
            return listCopy.sort((a, b) => Number(a.cheapest) - Number(b.cheapest));
          case "price-desc":
            return listCopy.sort((a, b) => Number(b.cheapest) - Number(a.cheapest));
          default:
            return listCopy;
        }
    }, [gamesList, sortOption]);

    const handleBookmark = useCallback((game: Game) => {
        if(bookmarks.find((g) => g.gameID === game.gameID)){
            removeBookmark(game);
        } else {
            addBookmark(game);
        }
    }, [bookmarks, addBookmark, removeBookmark]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    },[setSortOption]);

    if(!gamesList){
        return (
            <>
                <br></br>
                <h1 className={`mt-2 ${theme === "light" ? "text-gray-700" : "text-gray-100"}`}>Loading...</h1>
            </>
        )
    }

    if(gamesList.length === 0){
        return (
            <>
                <br></br>
                <h1 className={theme === "light" ? "text-gray-700" : "text-gray-100"}>No games found</h1>
            </>
        )
    }

    return (
        <>
            <div className="flex justify-end mb-4">
                <label htmlFor="sort-select" className={`mr-2 self-center ${theme === "light" ? "text-gray-700" : "text-gray-100"}  font-medium`}>Sort by</label>
                <select
                    id="sort-select"
                    className={`p-2 bg-transparent appearance-none rounded-md focus:outline-none ${theme === "light" ? "text-gray-700" : "text-gray-100"}`}
                    value={sortOption}
                    onChange={handleChange}
                >
                    <option className="text-black" value="name-asc">Name (A-Z)</option>
                    <option className="text-black" value="name-desc">Name (Z-A)</option>
                    <option className="text-black" value="price-asc">Price (Cheapest)</option>
                    <option className="text-black" value="price-desc">Price (Highest)</option>
                </select>

            </div>


            <div className="grid-games flex flex-wrap justify-center gap-6">
            {sortedGames.map((game) => (
                <GameCard
                    key={game.gameID}
                    game={game}
                    isFavorite={bookmarks.some((g) => g.gameID === game.gameID)}
                    onToggleFavorite={handleBookmark}
                />
            ))}
            </div>
        </>
    )
}