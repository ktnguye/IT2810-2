import { ReviewInterface } from '../../types/interfaces';
import '../../css/Review.css';

export default function Review(props: { review: ReviewInterface }) {
  return (
    <div className="review-box">
      <h2>{props.review.name}</h2>
      <div className="review-header">
        <p>({props.review.rating}/5)</p>
        <p>{props.review.date.toString().split('T')[0]}</p>
      </div>
      <p>{props.review.review}</p>
    </div>
  );
}
