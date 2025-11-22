import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { GameDetail } from './pages/GameDetail'
import { Bookmarks } from './pages/Bookmarks'
import { ThemeProvider, useTheme } from './components/ThemeProvider'
import { Navbar } from './components/Navbar'
import { BookmarkProvider } from './components/BookmarkProvider'
import { StoreProvider } from './components/StoreProvider'

function App() {

  const { theme } = useTheme();
  
  if(theme === "light"){
    document.body.classList.add("bg-gray-700");
    document.body.classList.remove("bg-white");
  }else{
    document.body.classList.add("bg-white");
    document.body.classList.remove("bg-gray-700");
  }

  return (
    <>
      <ThemeProvider>
        <StoreProvider>
          <BookmarkProvider>
            <BrowserRouter>
    
              <Navbar/>
    
              <Routes>
                <Route path="/" element={ <Home/> }/>
                <Route path="/game/:id" element={ <GameDetail/> }/>
                <Route path="/bookmarks" element={ <Bookmarks/> }/> 
              </Routes>
            </BrowserRouter>
          </BookmarkProvider>
        </StoreProvider>
      </ThemeProvider>
    </>
  )
}

export default App
