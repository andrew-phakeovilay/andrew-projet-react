import { useBookmark } from "../components/BookmarkProvider";
import { Games } from "../components/Games";
import { useTheme } from "../components/ThemeProvider";

export function Bookmarks(){

    const { bookmarks } = useBookmark(); 
    const { theme } = useTheme();

    if(bookmarks.length == 0){
        return <h1 className={`mt-4 ${theme === "light" ? "text-gray-700" : "text-gray-100"}`}>No bookmarks !</h1>
    } 

    return (
        <>      
        <Games games={""} isBookmarkPage={true} />
        </>
    )
}