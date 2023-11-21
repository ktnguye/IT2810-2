import { useEffect, useState } from 'react';
import Review from './Review';
import WriteReview from './ReviewWriter';
import { ReviewInterface, SongInterface } from '../../types/interfaces';
import './ReviewList.css';
import { useQuery } from '@apollo/client';
import { GET_REVIEWS_BY_SONG_ID } from '../../graphql/queries';
import { Link } from 'react-router-dom';
import '../../pages/SongDisplay.css';

interface DataProps {
  reviewsBySongId: ReviewInterface[];
}

export default function ReviewsList(props: { song: SongInterface }) {
  const [isShowingReviewWriter, setIsShowingReviewWriter] =
    useState<boolean>(false);

  const toggleReviewWriter = () => {
    setIsShowingReviewWriter(!isShowingReviewWriter);
  };

  const [reviews, setReviews] = useState<ReviewInterface[]>([]);

  // Fetches reviews from the database
  const { data } = useQuery<DataProps>(GET_REVIEWS_BY_SONG_ID, {
    variables: {
      songId: props.song.id,
    },
  });

  // Updates the reviews when the data changes
  useEffect(() => {
    if (data && data.reviewsBySongId) {
      setReviews([...data.reviewsBySongId]);
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
      <h2>Reviews </h2>
      <button className="reviews-button" onClick={toggleReviewWriter}>
        {isShowingReviewWriter ? 'Stop Writing' : 'Write Review'}
      </button>
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
