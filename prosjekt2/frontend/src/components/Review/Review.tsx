import { ReviewInterface } from '../../types/interfaces';
import './Review.css';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../../graphql/mutations';

export default function Review(props: { review: ReviewInterface }) {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    variables: { id: props.review._id },
  });

  const userID = localStorage.getItem('userID');

  console.log(props.review.ownerID);

  // Deletes the review from the database
  // Only commented out so that if we want to implement an admin user, this can be used
  const handleDelete = () => {
    void deleteReview();
    window.location.reload();
  };

  return (
    <div className="review-box-container">
      <div className="review-box">
        {
          // Only show the delete button if the review is made by the current user
          userID === props.review.ownerID && (
            <button className="delete-button" onClick={handleDelete}>
              X
            </button>
          )
        }
        <h2>{props.review.name}</h2>
        <div className="review-header">
          <p>({props.review.rating}/5)</p>
          <p>{props.review.date.toString().split('T')[0]}</p>
        </div>
        <p>{props.review.review}</p>
      </div>
    </div>
  );
}
