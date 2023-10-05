import React from 'react';
import Song from '../components/Song';

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
];

export default function SongFeed(props: { searchTerm: string }) {
  return (
    <div>
      {songs.map((song) => (
        <Song song={song} />
      ))}
    </div>
  );
}
