import React from 'react';
import Song from '../components/Song';
import '../css/SongFeed.css';
import { SongInterface } from '../types/interfaces';

export default function SongFeed(props: { songs: SongInterface[] }) {
  return (
    <div className="song-feed">
      {props.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}
