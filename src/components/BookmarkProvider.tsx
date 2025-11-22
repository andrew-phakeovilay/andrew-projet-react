import React, { createContext, useState, useContext, useEffect } from "react";
import type { Game } from "../interfaces/Game";

interface BookmarkContextType {
  bookmarks: Game[];
  addBookmark: (game: Game) => void;
  removeBookmark: (game: Game) => void;
}

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
});

export function BookmarkProvider({children}: {children: React.ReactNode}) {
  const [bookmarks, setBookmarks] = useState<Game[]>( () => {
    const storage = localStorage.getItem("bookmarks");
    return storage ? JSON.parse(storage) : [];
  });

  const addBookmark = (game: Game) => setBookmarks((prev) => [...prev, game]);
  const removeBookmark = (game: Game) => setBookmarks((prev) => prev.filter((g) => g.gameID !== game.gameID));

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  return useContext(BookmarkContext);
};
