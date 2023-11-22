import './Song.css';
import { Link } from 'react-router-dom';
import { SongInterface } from '../../types/interfaces';
import heart from '../../assets/heart.svg';
import heartFilled from '../../assets/heart_filled.svg';
import { useState } from 'react';

export default function Song(props: {
  song: SongInterface;
  color: string;
  isShowingFavourites?: boolean;
}) {
  const [isFavourite, setIsFavourite] = useState<boolean>(
    localStorage.getItem('favourites')?.includes(props.song.id.toString()) ||
      false
  );

  const toggleHeart = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    // get all favorites from local storage
    const favourites = localStorage.getItem('favourites');

    if (isFavourite) {
      // if song is already a favorite, remove it
      localStorage.setItem(
        'favourites',
        favourites ? favourites.replace(props.song.id.toString() + ',', '') : ''
      );
    } else {
      // if song is not a favorite, add it
      localStorage.setItem(
        'favourites',
        favourites
          ? favourites + props.song.id + ','
          : props.song.id.toString() + ','
      );
    }

    setIsFavourite(!isFavourite);
  };

  return (
    <>
      {/* sort favourites in frontend for when you unfavourite an element while showing favourites */}
      {props.isShowingFavourites && !isFavourite ? null : (
        <Link
          to={`/project2/song/${props.song.id}`}
          className="song-card"
          style={{ backgroundColor: props.color }}
        >
          <div className="song-cover-fade"></div>
          <button
            className="favourite-button"
            onClick={(evt) => toggleHeart(evt)}
          >
            <img
              className="favourite-heart"
              src={isFavourite ? heartFilled : heart}
              alt="star"
            />
          </button>
          <div className="song-info">
            <h2 className="song-title">{props.song.title}</h2>
            <h3 className="song-artist">{props.song.artist}</h3>
            <p className="song-tags">{props.song.tag}</p>
          </div>
        </Link>
      )}
    </>
  );
}
