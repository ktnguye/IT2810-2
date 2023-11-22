import { Link } from 'react-router-dom';
import { SongInterface } from '../types/interfaces';
import './SongDisplay.css';
import heart from '../assets/heart.svg';
import heartFilled from '../assets/heart_filled.svg';
import { useEffect, useState } from 'react';

export function SongDisplay(props: { selectedSong: SongInterface }) {
  const lyrics = props.selectedSong.lyrics.split('\n').map((line, index) => {
    return <p key={index}>{line}</p>;
  });

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    setIsFavourite(
      localStorage
        .getItem('favourites')
        ?.includes(props.selectedSong.id.toString()) || false
    );
  }, [props.selectedSong.id]);

  const toggleHeart = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    // get all favorites from local storage
    const favourites = localStorage.getItem('favourites');

    if (isFavourite) {
      // if selectedSong is already a favorite, remove it
      localStorage.setItem(
        'favourites',
        favourites
          ? favourites.replace(props.selectedSong.id.toString() + ',', '')
          : ''
      );
    } else {
      // if selectedSong is not a favorite, add it
      localStorage.setItem(
        'favourites',
        favourites
          ? favourites + props.selectedSong.id + ','
          : props.selectedSong.id.toString() + ','
      );
    }

    setIsFavourite(!isFavourite);
  };

  return (
    <main className="song-display">
      <Link to={'/project2/'} className="back-button">
        {'<-'}
      </Link>
      <div className="song-display-info-and-lyrics">
        <section className="song-display-info">
          <h1 className="song-display-title">{props.selectedSong.title}</h1>
          <h2 className="song-display-artist">
            {props.selectedSong.artist} ({props.selectedSong.year})
          </h2>
          <p>Tag: {props.selectedSong.tag.toUpperCase()}</p>
          <p>Views: {props.selectedSong.views}</p>
          <Link
            to={`/project2/song/${props.selectedSong.id}/reviews`}
            className="reviews-button"
          >
            Show Reviews
          </Link>
        </section>
        <section tabIndex={0} className="song-display-lyrics">
          <h3>Lyrics</h3>
          <div>{lyrics}</div>
        </section>
        <button
          className="favourite-button-song-display"
          onClick={(evt) => toggleHeart(evt)}
        >
          <img
            className="favourite-heart-song-display"
            src={isFavourite ? heartFilled : heart}
            alt="star"
          />
        </button>
      </div>
    </main>
  );
}
