import star from '../../assets/star.svg';
import starFilled from '../../assets/star_filled.svg';
import '../../css/RatingStar.css';

export default function RatingStar(props: {
  setRating: (rating: number) => void;
  rating: number;
  isFilled: boolean;
}) {
  const handleSetRating = () => {
    props.setRating(props.rating);
  };

  return (
    <button type="button" onClick={handleSetRating} className="rating-star">
      <img src={props.isFilled ? starFilled : star} alt="star" />
    </button>
  );
}
