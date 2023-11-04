import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SongFeed from '../components/SongFeed';
import SongDisplay from '../components/SongDisplay';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import { SongInterface } from '../types/interfaces';
import { useQuery } from '@apollo/client';
import { GET_SONGS, GET_SONGS_BY_TITLE } from '../graphql/queries';

export default function Home(props: { song?: SongInterface }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState<SongInterface[]>([]);
  const [selectedSong, setSelectedSong] = useState<SongInterface>(() => {
    return (
      props.song || {
        id: '',
        title: '',
        artist: '',
        album: '',
        year: 0,
        length: 0,
        rating: 0,
        cover: '',
        genres: [],
      }
    );
  });

  const {
    error: errorAll,
    loading: loadingAll,
    data: dataAll,
  } = useQuery(GET_SONGS);

  const {
    error: errorByTitle,
    loading: loadingByTitle,
    data: dataByTitle,
  } = useQuery(GET_SONGS_BY_TITLE, {
    variables: { title: searchTerm },
  });

  useEffect(() => {
    console.log('dataAll', dataAll);
    if (dataAll) {
      setSongs(dataAll.songs);
    }
  }, []);

  function activateSearch(Term: string) {
    console.log('Term', Term);
    setSearchTerm(Term);
  }

  useEffect(() => {
    console.log(searchTerm);
    console.log('dataByTitle', dataByTitle);
    console.log('dataByTitle.songsByTitle', dataByTitle?.songsByTitle);
    if (dataByTitle) {
      console.log('updating view');
      setSongs(dataByTitle.songsByTitle);
    }
  }, [searchTerm]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      let songWithId = songs.find((song) => song.id === id);

      if (songWithId) {
        setSelectedSong(songWithId);
      }
    }
  }, [id, songs]);

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
        <TopBar setGlobalSearchTerm={activateSearch} />
        <div className="home-page-song-content">
          {/**Changes the way a song is displayed when chosen, when using media smaller than 500px */}
          {windowWidth <= 500 ? (
            props.song && id ? (
              <SongDisplay song={selectedSong} />
            ) : (
              <SongFeed songs={songs} />
            )
          ) : props.song && id ? (
            <>
              <SongFeed songs={songs} />
              <SongDisplay song={selectedSong} />
            </>
          ) : (
            <SongFeed songs={songs} />
          )}
        </div>
      </div>
    </div>
  );
}
