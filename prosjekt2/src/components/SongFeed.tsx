import React from 'react';
import Song from "../components/Song";
import "../css/SongFeed.css";

const songs: Song[] = [
  {
    title: 'Hot Line Bling',
    artist: 'Drake',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Views',
    length: 4.27,
    rating: 4.5,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg',
  },
  {
    title: "The Hills",
    artist: "The Weeknd",
    genres: ["Rap", "Pop"],
    year: 2015,
    album: "Beauty Behind the Madness",
    length: 4.02,
    rating: 4,
    cover:
      "https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg",
  },
];

export default function SongFeed() {
  return (
    <div className="song-feed">
      {songs.map((song) => (
        <Song song={song} />
      ))}
    </div>
  );
}
