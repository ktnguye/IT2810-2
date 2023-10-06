import React from 'react';
import '../css/SideBar.css';
import Genre from './Genre';
// import songify logo from '../../public/songify-logo.png';
import songifyLogo from '../assets/songify-logo.png';
import { Link } from "react-router-dom";

const genres = ['Rap', 'Pop', 'Rock', 'Country', 'Jazz', 'Classical'];

export default function SideBar() {
  return (
    <div className="side-bar">
      <Link to="/">
        <img src={songifyLogo} className='side-bar-logo' alt='songify logo' />
      </Link>
      <h2>Genre</h2>
      

      {genres.map((genre) => (
        <Genre genre={genre} />
      ))}
    </div>
  );
}
