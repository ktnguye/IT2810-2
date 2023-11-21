import './SongDisplay.css';
import { SongInterface } from '../types/interfaces';
import { Link, useParams } from 'react-router-dom';
import ReviewsList from '../components/Review/ReviewsList';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SONG } from '../graphql/queries';

interface DataProps {
  song: SongInterface;
}

export default function SongDisplay(props: { isShowingReviews?: boolean }) {
  const [selectedSong, setSelectedSong] = useState<SongInterface>({
    id: 0,
    title: '',
    artist: '',
    year: 0,
    lyrics: '',
    views: 0,
    tag: '',
  });

  const lyrics = selectedSong.lyrics.split('\n').map((line, index) => {
    return <p key={index}>{line}</p>;
  });

  const { id } = useParams<{ id: string }>();

  const { data } = useQuery<DataProps>(GET_SONG, {
    variables: { id: parseInt(id || '') },
  });

  useEffect(() => {
    if (data && data.song) {
      setSelectedSong(data.song);
    }
  }, [data]);

  return (
    <>
      {props.isShowingReviews ? (
        <ReviewsList song={selectedSong} />
      ) : (
        <div className="song-display">
          <Link to={'/project2/'} className="back-button">
            {'<-'}
          </Link>
          <div className="song-display-info-and-lyrics">
            <div className="song-display-info">
              <h1 className="song-display-title">{selectedSong.title}</h1>
              <h2 className="song-display-artist">
                {selectedSong.artist} ({selectedSong.year})
              </h2>
              <p>Tag: {selectedSong.tag.toUpperCase()}</p>
              <p>Views: {selectedSong.views}</p>
              <Link
                to={`/project2/song/${selectedSong.id}/reviews`}
                className="reviews-button"
              >
                Show Reviews
              </Link>
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
