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

  useEffect(() => {
    console.log(data);
    if (data) {
      setSongs(data.songs);
    }
  }, [data]);

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
          {/**Changes the way a song is displayed when chosen, when using media smaller than 500px */}
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
