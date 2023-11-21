import React, { useEffect, useState } from 'react';
import RatingStar from './RatingStar';
import './ReviewWriter.css';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../../graphql/mutations';

export default function ReviewWriter(props: { songId: number }) {
  const [reviewName, setReviewName] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(1);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewDate, setReviewDate] = useState<Date>(new Date());

  const [addReview] = useMutation(CREATE_REVIEW, {
    variables: {
      songId: props.songId,
      name: reviewName,
      rating: reviewRating,
      review: reviewText,
      date: reviewDate,
    },
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewName(event.target.value);
  };

  const handleRatingChange = (rating: number) => {
    setReviewRating(rating);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  };

  useEffect(() => {
    // set the current date with only the date part (no time)
    setReviewDate(new Date(new Date()));
  }, []);

  const handleReviewSubmit = () => {
    if (reviewName === '' || reviewText === '') {
      return;
    }

    void addReview();

    window.location.reload();
  };

  return (
    <div className="review-writer">
      <h3>Write a review</h3>
      <form
        className="review-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={reviewName}
          onChange={handleNameChange}
          required
        />
        <label htmlFor="rating">Rating</label>
        <div className="rating-stars">
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <RatingStar
              key={starNumber}
              setRating={handleRatingChange}
              rating={starNumber}
              isFilled={starNumber <= reviewRating}
            />
          ))}
        </div>
        <label htmlFor="review">Review</label>
        <textarea
          className="review-textarea"
          id="review"
          name="review"
          value={reviewText}
          onChange={handleTextChange}
          required
        />
        <br></br>
        <button className="submit-button"
          type="submit"
          onClick={handleReviewSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
