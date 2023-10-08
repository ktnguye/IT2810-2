import { Route, Routes } from 'react-router-dom';
import '../css/App.css';
import Home from './Home';

const song: Song = {
  id: 1,
  title: 'Song title',
  artist: 'Artist name',
  cover: 'https://picsum.photos/seed/picsum/200/300',
  genres: ['Pop', 'Rock'],
  year: 2021,
  album: 'Album name',
  length: 180,
  rating: 4.5,
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/song/:id" element={<Home song={song} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
