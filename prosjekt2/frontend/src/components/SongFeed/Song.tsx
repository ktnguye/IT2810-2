import './Song.css';
import { Link } from 'react-router-dom';
import { SongInterface } from '../../types/interfaces';

export default function Song(props: { song: SongInterface; color: string }) {
  return (
    <Link
      to={`/project2/song/${props.song.id}`}
      className="song-card"
      style={{ backgroundColor: props.color }}
    >
      <div className="song-cover-fade"></div>
      <div className="song-info">
        <h2 className="song-title">{props.song.title}</h2>
        <h4 className="song-artist">{props.song.artist}</h4>
        <h5 className="song-tags">{props.song.tag}</h5>
      </div>
    </Link>
  );
}
