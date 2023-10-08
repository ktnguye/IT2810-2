import React from 'react';
import '../css/Genre.css';

export default function Genre(props: { genre: string }) {
  return <button className="genre-button">{props.genre}</button>;
}
