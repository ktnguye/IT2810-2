import { useEffect, useState } from 'react';
import Review from './Review';
import WriteReview from './ReviewWriter';
import { ReviewInterface } from '../../types/interfaces';
import './ReviewList.css';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS_BY_SONG_ID } from '../../graphql/queries';
import { Link } from 'react-router-dom';

export default function ReviewsList(props: { songId: number }) {
  const [isShowingReviewWriter, setIsShowingReviewWriter] =
    useState<boolean>(false);

  const toggleReviewWriter = () => {
    setIsShowingReviewWriter(!isShowingReviewWriter);
  };

  const [reviews, setReviews] = useState<ReviewInterface[]>([]);

  const { data } = useQuery(GET_REVIEWS_BY_SONG_ID, {
    variables: {
      songId: props.songId,
    },
  });

  useEffect(() => {
    console.log('songId: ' + props.songId);
    console.log(data);
    if (data) {
      setReviews(data.reviewsBySongId);
    } else {
      setReviews([]);
    }
  }, [data]);

  return (
    <div className="song-display-reviews">
      <Link to={`/project2/song/${props.songId}`} className="back-button">
        {'<-'}
      </Link>
      <h2 className="reviews-header">
        Reviews
        <button className="add-review-button" onClick={toggleReviewWriter}>
          {isShowingReviewWriter ? 'Stop Writing' : 'Write Review'}
        </button>
      </h2>

      <div className="song-display-review">
        {isShowingReviewWriter ? (
          <WriteReview songId={props.songId} />
        ) : (
          reviews.map((review, index) => <Review key={index} review={review} />)
        )}
      </div>
    </div>
  );
}
