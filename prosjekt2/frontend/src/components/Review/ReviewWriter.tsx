import React, { useEffect, useState } from 'react';
import RatingStar from './RatingStar';
import './ReviewWriter.css';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../../graphql/mutations';

// uuidv4 is used to generate a random ID for the review
import { v4 as uuidv4 } from 'uuid';

export default function ReviewWriter(props: { songId: number }) {
  const [reviewName, setReviewName] = useState<string>('');
  const [reviewRating, setReviewRating] = useState<number>(1);
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewDate, setReviewDate] = useState<Date>(new Date());

  // Adds the review to the database
  const [addReview] = useMutation(CREATE_REVIEW, {
    variables: {
      songId: props.songId,
      name: reviewName,
      rating: reviewRating,
      review: reviewText,
      date: reviewDate,
      ownerID: localStorage.getItem('userID') as string,
    },
  });

  // Updates the review name
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewName(event.target.value);
  };

  // Updates the review rating
  const handleRatingChange = (rating: number) => {
    setReviewRating(rating);
  };

  // Updates the review text
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  };

  useEffect(() => {
    // set the current date with only the date part (no time)
    setReviewDate(new Date(new Date()));
  }, []);

  // Adds the review to the database
  const handleReviewSubmit = () => {
    if (reviewName === '' || reviewText === '') {
      return;
    }

    let userID = localStorage.getItem('userID');

    if (userID === null) {
      userID = uuidv4();
      localStorage.setItem('userID', userID);
    }

    void addReview();

    console.log('Review submitted');
    console.log('Owner ID: ' + userID);

    // window.location.reload();
  };

  return (
    <div className="review-writer">
      <h3>Write a review</h3>
      <form
        aria-label="review-form"
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
          autoComplete="name"
        />
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
        <button
          className="submit-button"
          type="submit" // not of type submit to keep it from activating when pressing enter in another field
          onClick={handleReviewSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
