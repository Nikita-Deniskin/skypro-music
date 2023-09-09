import './App.css';
import Navigation from './components/NavMenu';
import Player from './components/AudioPlayer';
import Sidebar from './components/Sidebar';
import TrackList from './components/Tracklist';

function App() {
  return (
    <div className='App'>
  <div className="wrapper">
    <div className="container">
      <main className="main">
      < Navigation />
      < TrackList />
        < Sidebar />
      </main>
      < Player />
      <footer className="footer" />
    </div>
  </div>
  </div>
  );
};

export default App;
