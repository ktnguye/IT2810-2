import { Link } from 'react-router-dom';
import { SongInterface } from '../types/interfaces';
import './SongDisplay.css';

export function SongDisplay(props: {
  selectedSong: SongInterface;
  lyrics: JSX.Element[];
}) {
  return (
    <main className="song-display">
      <Link to={'/project2/'} className="back-button">
        {'<-'}
      </Link>
      <div className="song-display-info-and-lyrics">
        <section className="song-display-info">
          <h1 className="song-display-title">{props.selectedSong.title}</h1>
          <h2 className="song-display-artist">
            {props.selectedSong.artist} ({props.selectedSong.year})
          </h2>
          <p>Tag: {props.selectedSong.tag.toUpperCase()}</p>
          <p>Views: {props.selectedSong.views}</p>
          <Link
            to={`/project2/song/${props.selectedSong.id}/reviews`}
            className="reviews-button"
          >
            Show Reviews
          </Link>
        </section>
        <section tabIndex={0} className="song-display-lyrics">
          <h3>Lyrics</h3>
          <div>{props.lyrics}</div>
        </section>
      </div>
    </main>
  );
}
