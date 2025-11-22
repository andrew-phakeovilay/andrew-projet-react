import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { GameDetail } from './pages/GameDetail'
import { Bookmarks } from './pages/Bookmarks'
import { ThemeProvider } from './components/ThemeProvider'
import { Navbar } from './components/Navbar'
import { BookmarkProvider } from './components/BookmarkProvider'
import { StoreProvider } from './components/StoreProvider'

function App() {

  return (
    <>
      <ThemeProvider>
        <StoreProvider>
          <BookmarkProvider>
            <BrowserRouter>
    
              <Navbar/>
    
              <Routes>
                <Route path="/andrew-projet-react/" element={ <Home/> }/>
                <Route path="/andrew-projet-react/game/:id" element={ <GameDetail/> }/>
                <Route path="/andrew-projet-react/bookmarks" element={ <Bookmarks/> }/> 
              </Routes>
            </BrowserRouter>
          </BookmarkProvider>
        </StoreProvider>
      </ThemeProvider>
    </>
  )
}

export default App
