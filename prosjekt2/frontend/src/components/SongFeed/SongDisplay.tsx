import '../../css/SongDisplay.css';
import { SongInterface } from '../../types/interfaces';
import { Link } from 'react-router-dom';
import ReviewsList from '../Review/ReviewsList';

export default function SongDisplay(props: {
  song: SongInterface;
  isShowingReviews?: boolean;
}) {
  const lyrics = props.song.lyrics.split('\n').map((line, index) => {
    return <p key={index}>{line}</p>;
  });

  return (
    <>
      {props.isShowingReviews ? (
        <ReviewsList songId={props.song.id} />
      ) : (
        <div className="song-display">
          <Link to={'/project2/'} className="back-button">
            {'<-'}
          </Link>
          <Link
            to={`/project2/song/${props.song.id}/reviews`}
            className="toggle-reviews-button"
          >
            Show Reviews
          </Link>
          <div className="song-display-info-and-lyrics">
            <div className="song-display-info">
              <h1 className="song-display-title">{props.song.title}</h1>
              <h2 className="song-display-artist">
                {props.song.artist} ({props.song.year})
              </h2>
              <p>Tag: {props.song.tag.toUpperCase()}</p>
              <p>Views: {props.song.views}</p>
            </div>
            <div className="song-display-lyrics">
              <h3>Lyrics</h3>
              <div>{lyrics}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
