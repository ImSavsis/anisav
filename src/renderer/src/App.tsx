import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Genres from './pages/Genres'
import Schedule from './pages/Schedule'
import TitleDetail from './pages/TitleDetail'
import MyLists from './pages/MyLists'
import History from './pages/History'
import Wishlist from './pages/Wishlist'

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/catalog" element={<PageTransition><Catalog /></PageTransition>} />
          <Route path="/genres" element={<PageTransition><Genres /></PageTransition>} />
          <Route path="/schedule" element={<PageTransition><Schedule /></PageTransition>} />
          <Route path="/title/:idOrAlias" element={<PageTransition><TitleDetail /></PageTransition>} />
          <Route path="/lists" element={<PageTransition><MyLists /></PageTransition>} />
          <Route path="/history" element={<PageTransition><History /></PageTransition>} />
          <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}
