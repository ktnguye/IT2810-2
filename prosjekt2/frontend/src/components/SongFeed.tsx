import Song from './Song';
import '../css/SongFeed.css';
import { SongInterface } from '../types/interfaces';
import { useState } from 'react';

export default function SongFeed(props: {
  songs: SongInterface[];
  setIndex: (index: number) => void;
  reachedEnd: boolean;
}) {
  const [index, setIndex] = useState<number>(0);

  function loadMore() {
    props.setIndex(index + 12);
    setIndex(index + 12);
  }

  return (
    <div className="song-feed">
      {props.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
      {!props.reachedEnd && (
        <button className="load-more-button" onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
