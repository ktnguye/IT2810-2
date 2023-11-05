import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SongFeed from '../components/SongFeed';
import SongDisplay from '../components/SongDisplay';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import { SongInterface } from '../types/interfaces';
import { useQuery } from '@apollo/client';
import { GET_SONGS_BY_TITLE } from '../graphql/queries';

export default function Home(props: { song?: SongInterface }) {
  const [index, setIndex] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [order, setOrder] = useState<number>(0);

  let oldIndex = 0;
  let oldOrder = 0;

  const { error, loading, data } = useQuery(GET_SONGS_BY_TITLE, {
    variables: { title: searchTerm, index: index, order: order },
  });

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
        genres: [],
      }
    );
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      if (oldIndex !== index) {
        if (oldOrder !== order) {
          setSongs([...data.songsByTitle]);
        }
        setSongs([...songs, ...data.songsByTitle]);
      } else {
        setSongs([...data.songsByTitle]);
      }
    }
    oldIndex = index;
    oldOrder = order;
    setReachedEnd(data && data.songsByTitle.length < 12);
  }, [data]);

  function activateSearch(Term: string) {
    setIndex(0);
    setSearchTerm(Term);
  }

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      let songWithId = songs.find((song) => song.id === id);

      if (songWithId) {
        setSelectedSong(songWithId);
      }
    }
  }, [id, songs]);

  const setNewOrder = (newOrder: number) => {
    setIndex(0);
    setOrder(newOrder);
  };

  const loadMore = () => {
    setIndex(index + 12);
  };

  return (
    <div className="home">
      <SideBar />
      <div className="home-page-content">
        <TopBar setGlobalSearchTerm={activateSearch} setOrder={setNewOrder} />
        <div className="home-page-song-content">
          {/**Changes the way a song is displayed when chosen, when using media smaller than 500px */}
          {props.song && id ? (
            <SongDisplay song={selectedSong} />
          ) : (
            <SongFeed
              songs={songs}
              loadMore={loadMore}
              reachedEnd={reachedEnd}
            />
          )}
        </div>
      </div>
    </div>
  );
}
