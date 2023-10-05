import React from 'react';

export default function Song(props: { song: Song }) {
  return (
    <div className="song">
      <h3>{props.song.title}</h3>
      <h4>{props.song.artist}</h4>
      <h5>{props.song.genres}</h5>
      <img src={props.song.cover} alt="cover" />
    </div>
  );
}
