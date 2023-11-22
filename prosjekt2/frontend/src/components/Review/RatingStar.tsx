import star from '../../assets/star.svg';
import starFilled from '../../assets/star_filled.svg';
import './RatingStar.css';

export default function RatingStar(props: {
  setRating: (rating: number) => void;
  rating: number;
  isFilled: boolean;
}) {
  const handleSetRating = () => {
    props.setRating(props.rating);
  };

  return (
    <>
      <label htmlFor={`star${props.rating}`} hidden={true}>
        Rating
      </label>
      <button
        type="button"
        onClick={handleSetRating}
        className="rating-star"
        id={`star${props.rating}`}
      >
        <img src={props.isFilled ? starFilled : star} alt="star" />
      </button>
    </>
  );
}
