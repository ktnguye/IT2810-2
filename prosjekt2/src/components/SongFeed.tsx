import React from 'react';
import Song from '../components/Song';
import '../css/SongFeed.css';

export default function SongFeed(props: { songs: Song[] }) {
  return (
    <div className="song-feed">
      {props.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}
