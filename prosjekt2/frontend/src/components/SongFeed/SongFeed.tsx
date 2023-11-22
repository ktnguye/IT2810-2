import Song from './Song';
import './SongFeed.css';
import { SongInterface } from '../../types/interfaces';

const songColors = [
  '#2d004e', // Dark Indigo
  '#000033', // Dark Blue
  '#003300', // Dark Green
  '#4d4d00', // Dark Olive
  '#4c2800', // Dark Saddle Brown
  '#663d00', // Dark Sienna
  '#4d0000', // Dark Red
];

export default function SongFeed(props: {
  songs: SongInterface[];
  loadMore: () => void;
  reachedEnd: boolean;
}) {
  return (
    <section className="song-feed">
      {/* If there are no songs, display a message, otherwise display the songs */}
      {props.songs.length === 0 ? (
        <p className="no-songs-message">No results</p>
      ) : (
        props.songs.map((song, index) => (
          <Song
            key={song.id}
            song={song}
            color={songColors[index % songColors.length]}
          />
        ))
      )}
      {!props.reachedEnd && (
        <button className="load-more-button" onClick={props.loadMore}>
          Load more
        </button>
      )}
    </section>
  );
}
