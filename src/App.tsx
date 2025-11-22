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
            <BrowserRouter basename="/andrew-projet-react">
    
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
