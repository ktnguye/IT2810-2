import React from 'react';
import '../css/Song.css';
import { Link } from 'react-router-dom';

export default function Song(props: { song: Song }) {
  return (
    <Link to={`/song/${props.song.id}`} className="song-card">
      <img className="song-cover" src={props.song.cover} alt="cover" />
      <div className="song-cover-fade"></div>
      <div className="song-info">
        <h2 className="song-title">{props.song.title}</h2>
        <h4 className="song-artist">{props.song.artist}</h4>
        <h5 className="song-genres">
          {props.song.genres.map((genre, index) => {
            return (
              <span key={index} className="song-genre">
                {genre} {index !== props.song.genres.length - 1 ? '• ' : ''}
              </span>
            );
          })}
        </h5>
      </div>
    </Link>
  );
}
