import React, { useState } from 'react';
import '../css/SideBar.css';
import Genre from './Genre';
// import songify logo from '../../public/songify-logo.png';
import songifyLogo from '../assets/songify-logo.png';
import { Link } from 'react-router-dom';

const genres = ['Rap', 'Pop', 'Rock', 'Country', 'Jazz', 'Classical', 'Metal'];

export default function SideBar() {
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  return (
    <div className="side-bar">
      <Link to="/">
        <img src={songifyLogo} className="side-bar-logo" alt="songify logo" />
      </Link>
      <h2>Genre</h2>
      <div className="genres-display">
        {genres.map((genre) => (
          <Genre
            genre={genre}
            isSelected={genre === selectedGenre}
            selectGenre={setSelectedGenre}
          />
        ))}
      </div>
    </div>
  );
}
