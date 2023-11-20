import { useEffect, useState } from 'react';
import Review from './Review';
import WriteReview from './ReviewWriter';
import { ReviewInterface, SongInterface } from '../../types/interfaces';
import './ReviewList.css';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS_BY_SONG_ID } from '../../graphql/queries';
import { Link } from 'react-router-dom';

export default function ReviewsList(props: { song: SongInterface }) {
  const [isShowingReviewWriter, setIsShowingReviewWriter] =
    useState<boolean>(false);

  const toggleReviewWriter = () => {
    setIsShowingReviewWriter(!isShowingReviewWriter);
  };

  const [reviews, setReviews] = useState<ReviewInterface[]>([]);

  const { data } = useQuery(GET_REVIEWS_BY_SONG_ID, {
    variables: {
      songId: props.song.id,
    },
  });

  useEffect(() => {
    console.log('songId: ' + props.song.id);
    console.log(data);
    if (data) {
      setReviews(data.reviewsBySongId);
    } else {
      setReviews([]);
    }
  }, [data]);

  return (
    <div className="song-display-reviews">
      <Link to={`/project2/song/${props.song.id}`} className="back-button">
        {'<-'}
      </Link>
      <h1 className="reviews-header">{props.song.title}</h1>
      <h2 className="reviews-artist">
        {props.song.artist} ({props.song.year})
      </h2>
      <h2>
        Reviews{' '}
        <button className="write-review-button" onClick={toggleReviewWriter}>
          {isShowingReviewWriter ? 'Stop Writing' : 'Write Review'}
        </button>
      </h2>
      <div className="song-display-review">
        {isShowingReviewWriter ? (
          <WriteReview songId={props.song.id} />
        ) : (
          reviews.map((review, index) => <Review key={index} review={review} />)
        )}
      </div>
    </div>
  );
}
