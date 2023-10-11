import React from 'react';
import '../css/Genre.css';

export default function Genre(props: {
  genre: string;
  isSelected: boolean;
  selectGenre: (genre: string) => void;
}) {
  const selectGenre = (genre: string) => {
    props.selectGenre(genre);
  };

  return (
    <button
      className={props.isSelected ? 'selected-genre-button' : 'genre-button'}
      onClick={selectGenre.bind(
        null,
        props.genre
      )} /**After a button is clicked, its css is changed */
    >
      {props.genre}
    </button>
  );
}
