import React from 'react';
import '../css/SongDisplay.css';
import { SongInterface } from '../types/interfaces';
import { Link } from 'react-router-dom';

export default function SongDisplay(props: { song: SongInterface }) {
  return (
    <div className="song-display">
      <Link to={'/'} className="back-button">
        {'<-'}
      </Link>
      <h2 className="song-display-title">{props.song.title}</h2>
      <img className="song-display-cover" src={props.song.cover} alt="cover" />
      <div className="song-display-info">
        <h3 className="song-display-artist">
          {props.song.artist} ({props.song.year})
        </h3>
        <h4 className="song-display-album">Album: {props.song.album}</h4>

        <p className="song-display-length">
          Length: {props.song.length}
          <br></br>
          Rating: {props.song.rating}
        </p>
        <p className="song-display-rating"></p>
        {props.song.genres.map((genre, index) => {
          return (
            <span key={index} className="song-display-genre">
              {genre} {index !== props.song.genres.length - 1 ? '• ' : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
}
