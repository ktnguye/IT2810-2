import './Song.css';
import { Link } from 'react-router-dom';
import { SongInterface } from '../../types/interfaces';

export default function Song(props: { song: SongInterface; color: string }) {
  return (
    // Link to the song display page
    <Link
      to={`/project2/song/${props.song.id}`}
      className="song-card"
      style={{ backgroundColor: props.color }}
    >
      <div className="song-cover-fade"></div>
      <div className="song-info">
        <h2 className="song-title">{props.song.title}</h2>
        <h3 className="song-artist">{props.song.artist}</h3>
        <p className="song-tags">{props.song.tag}</p>
      </div>
    </Link>
  );
}
