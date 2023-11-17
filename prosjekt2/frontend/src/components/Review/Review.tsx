import { ReviewInterface } from '../../types/interfaces';
import '../../css/Review.css';

export default function Review(props: { review: ReviewInterface }) {
  return (
    <div className="review-box">
      <div className="review-header">
        <h2>
          {props.review.name} ({props.review.rating}/5)
        </h2>
        <p>{props.review.date.toString().split('T')[0]}</p>
      </div>
      <p>{props.review.review}</p>
    </div>
  );
}
