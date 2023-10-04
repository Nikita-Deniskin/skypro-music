import './App.css'
import { useEffect, useState } from 'react'
import { tracks, playLists } from './data'
import Navigation from './components/navmenu/NavMenu'
import Player from './components/audioplayer/AudioPlayer'
import Sidebar from './components/sidebar/Sidebar'
import TrackList from './components/tracklist/Tracklist'

function App() {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setContent({
        tracklist: tracks,
        sidebar: playLists,
        player: tracks[0],
      })
      setLoading(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <main className="main">
            <Navigation />
            {loading && (
              <>
                <TrackList />
                <Sidebar />
                <Player />
              </>
            )}
            {!loading && (
              <>
                <TrackList tracks={content.tracklist} />
                <Sidebar array={content.sidebar} />
                <Player prop={content.player} />
              </>
            )}
          </main>
          <footer className="footer" />
        </div>
      </div>
    </div>
  )
}

export default App
