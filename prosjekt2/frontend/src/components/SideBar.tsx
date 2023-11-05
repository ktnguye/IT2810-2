import { useState } from 'react';
import '../css/SideBar.css';
import Genre from './Genre';
// import songify logo from '../../public/songify-logo.png';
import songifyLogo from '../assets/songify-logo.png';
import { Link } from 'react-router-dom';

const genres = [
  'Rap',
  'Pop',
  'Rock',
  'Country',
  'Jazz',
  'Classical',
  'Metal',
  'Bangers',
];

export default function SideBar(props: { setGenre: (genre: string) => void }) {
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  const setGenre = (genre: string) => {
    setSelectedGenre(genre);
    props.setGenre(genre);
  };

  return (
    <div className="side-bar">
      <Link to="/">
        <img src={songifyLogo} className="side-bar-logo" alt="songify logo" />
      </Link>
      <h2>Genre</h2>
      <div className="genres-display">
        {genres.map((genre, index) => (
          <Genre
            key={index}
            genre={genre}
            isSelected={genre === selectedGenre}
            selectGenre={setGenre}
          />
        ))}
      </div>
    </div>
  );
}
