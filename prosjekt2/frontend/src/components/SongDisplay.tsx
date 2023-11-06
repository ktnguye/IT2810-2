import '../css/SongDisplay.css';
import { SongInterface } from '../types/interfaces';
import { Link } from 'react-router-dom';

export default function SongDisplay(props: { song: SongInterface }) {
  return (
    <div className="song-display">
      <Link to={'/project2/'} className="back-button">
        {'<-'}
      </Link>
      <h2 className="song-display-title">{props.song.title}</h2>
      <div className="song-display-info">
        <h3 className="song-display-artist">
          {props.song.artist} ({props.song.year})
        </h3>
      </div>
    </div>
  );
}
