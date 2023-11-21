import { ReviewInterface } from '../../types/interfaces';
import './Review.css';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../../graphql/mutations';

export default function Review(props: { review: ReviewInterface }) {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: { id: props.review._id },
  });

  const handleDelete = () => {
    console.log('Deleting review with _id: ' + props.review._id);
    console.log(props.review);
    deleteReview();

    window.location.reload();
  };

  return (
    <div className="review-box">
      <button className="delete-button" onClick={handleDelete}>
        X
      </button>
      <h2>{props.review.name}</h2>
      <div className="review-header">
        <p>({props.review.rating}/5)</p>
        <p>{props.review.date.toString().split('T')[0]}</p>
      </div>
      <p>{props.review.review}</p>
    </div>
  );
}
