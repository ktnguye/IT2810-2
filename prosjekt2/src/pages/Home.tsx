import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SongFeed from '../components/SongFeed';
import SongDisplay from '../components/SongDisplay';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import { SongInterface } from '../types/interfaces';

const songs: SongInterface[] = [
  {
    id: 0,
    title: 'Hot Line Bling',
    artist: 'Drake',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Views',
    length: 4.27,
    rating: 4.5,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg',
  },
  {
    id: 2,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
  {
    id: 3,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
  {
    id: 4,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
  {
    id: 5,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
  {
    id: 6,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
  {
    id: 7,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
  {
    id: 8,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
  {
    id: 9,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
  {
    id: 10,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
  {
    id: 11,
    title: 'The Hills',
    artist: 'The Weeknd',
    genres: ['Rap', 'Pop'],
    year: 2015,
    album: 'Beauty Behind the Madness',
    length: 4.02,
    rating: 4,
    cover:
      'https://upload.wikimedia.org/wikipedia/en/a/af/The_Weeknd_-_The_Hills.jpg',
  },
];

export default function Home(props: { song?: SongInterface }) {
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState('');
  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="home">
      <SideBar />
      <div className="home-page-content">
        <TopBar setGlobalSearchTerm={updateSearchTerm} />
        <div className="home-page-song-content">
          {windowWidth <= 500 ? (
            props.song && id ? (
              <SongDisplay song={songs[parseInt(id)]} />
            ) : (
              <SongFeed songs={songs} />
            )
          ) : props.song && id ? (
            <>
              <SongFeed songs={songs} />
              <SongDisplay song={songs[parseInt(id)]} />
            </>
          ) : (
            <SongFeed songs={songs} />
          )}
        </div>
      </div>
    </div>
  );
}
