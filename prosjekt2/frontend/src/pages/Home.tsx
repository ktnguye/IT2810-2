import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SongFeed from '../components/SongFeed';
import SongDisplay from '../components/SongDisplay';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import { SongInterface } from '../types/interfaces';
import { useQuery } from '@apollo/client';
import { GET_SONGS } from '../graphql/queries';

export default function Home(props: { song?: SongInterface }) {
  const { error, loading, data } = useQuery(GET_SONGS);

  const [songs, setSongs] = useState<SongInterface[]>([]);

  const [selectedSong, setSelectedSong] = useState<SongInterface>(
    props.song || {
      id: '',
      title: '',
      artist: '',
      cover: '',
      genres: [],
      year: 0,
      album: '',
      length: 0,
      rating: 0,
    }
  );

  useEffect(() => {
    console.log(data);
    if (data) {
      setSongs(data.songs);
    }
  }, [data]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      let songWithId = songs.find((song) => song.id === id);

      if (songWithId) {
        setSelectedSong(songWithId);
      }
    }
  }, [id, songs]);

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
          {/**Changes the way a song is displayed when chosen, when using media smaller than 500px */}
          {props.song && id ? (
            <SongDisplay song={selectedSong} />
          ) : (
            <SongFeed songs={songs} />
          )}
        </div>
      </div>
    </div>
  );
}
