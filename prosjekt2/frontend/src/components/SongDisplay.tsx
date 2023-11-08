import '../css/SongDisplay.css';
import { SongInterface } from '../types/interfaces';
import { Link } from 'react-router-dom';

export default function SongDisplay(props: { song: SongInterface }) {
  const lyrics = props.song.lyrics.split('\n').map((line, index) => {
    return <p key={index}>{line}</p>;
  });

  return (
    <div className="song-display">
      <Link to={'/project2/'} className="back-button">
        {'<-'}
      </Link>
      <div className="song-display-info">
        <h2 className="song-display-title">{props.song.title}</h2>
        <h3 className="song-display-artist">
          {props.song.artist} ({props.song.year})
        </h3>
        <p>Tag: {props.song.tag.toUpperCase()}</p>
        <p>Views: {props.song.views}</p>
      </div>
      <div className="song-display-lyrics">
        <h3>Lyrics</h3>
        <div>{lyrics}</div>
      </div>
    </div>
  );
}
