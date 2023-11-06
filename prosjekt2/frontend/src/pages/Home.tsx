import { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SongFeed from '../components/SongFeed';
import SongDisplay from '../components/SongDisplay';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import { SongInterface } from '../types/interfaces';
import { useQuery } from '@apollo/client';
import { GET_SONGS_BY_TITLE } from '../graphql/queries';

interface DataProps {
  songsByTitle: SongInterface[];
}

export default function Home(props: { song?: SongInterface }) {
  const [index, setIndex] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [order, setOrder] = useState<number>(0);
  const [tag, setTag] = useState<string>('');
  const oldOrderRef = useRef(order);
  const oldIndexRef = useRef(index);

  const { data } = useQuery<DataProps>(GET_SONGS_BY_TITLE, {
    variables: {
      title: searchTerm,
      index: index,
      order: order,
      tag: tag,
    },
  });

  const [songs, setSongs] = useState<SongInterface[]>([]);
  const [selectedSong, setSelectedSong] = useState<SongInterface>(() => {
    return (
      props.song || {
        title: '',
        artist: '',
        tag: '',
        year: 0,
        views: 0,
        lyrics: '',
        id: 0,
      }
    );
  });

  useEffect(() => {
    if (data) {
      if (oldIndexRef.current !== index) {
        if (oldOrderRef.current !== order) {
          setSongs([...data.songsByTitle]);
          oldOrderRef.current = order;
        }
        setSongs([...songs, ...data.songsByTitle]);
        oldIndexRef.current = index;
      } else {
        console.log(data);
        setSongs([...data.songsByTitle]);
      }
    }
    if (data && data.songsByTitle.length < 12) {
      setReachedEnd(true);
    } else {
      setReachedEnd(false);
    }
  }, [data]);

  function activateSearch(Term: string) {
    setIndex(0);
    setSearchTerm(Term);
  }

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log(id);
      console.log(songs[0]);
      const songWithId = songs.find((song) => song.id === parseInt(id));

      if (songWithId) {
        setSelectedSong(songWithId);
      }
    }
  }, [id, songs]);

  const setNewOrder = (newOrder: number) => {
    setIndex(0);
    setOrder(newOrder);
  };

  const setNewTag = (newTag: string) => {
    setIndex(0);
    setTag(newTag);
  };

  const loadMore = () => {
    setIndex(index + 12);
  };

  return (
    <div className="home">
      <SideBar setTag={setNewTag} />
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
