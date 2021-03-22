import React,{useState} from 'react';
import "./styles/app.scss";
import Library from './components/Library';
import Player from './components/Player';
import Song from './components/Song';
import Data from './Data';
import Nav from './components/Nav';
function App() {
  //state
  const[songs]=useState(Data());
  const[currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const[libraryStatus,setLibraryStatus]=useState(false);
  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying}
      currentSong={currentSong} songs={songs} setCurrentSong ={setCurrentSong}/>
      <Library setCurrentSong ={setCurrentSong} currentSong={currentSong} songs={songs} libraryStatus={libraryStatus}/>
    </div>
  );
}

export default App;
