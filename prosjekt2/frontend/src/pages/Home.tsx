import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import TopBar from '../components/TopBar/TopBar';
import SideBar from '../components/SideBar/SideBar';
import SongFeed from '../components/SongFeed/SongFeed';
import './Home.css';
import { SongInterface } from '../types/interfaces';
import { useQuery } from '@apollo/client';
import { GET_SONGS_BY_TITLE } from '../graphql/queries';
import { RootState } from '../store/reducers/index';

interface DataProps {
  songsByTitle: SongInterface[];
  tags: string[];
}

export default function Home() {
  const [index, setIndex] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [order, setOrder] = useState<number>(0);

  const tag = useSelector((state: RootState) => state.sidebar.tag);
  const [tags, setTags] = useState<string[]>([]);
  const [possibleTags, setPossibleTags] = useState<string[]>([]);
  const hasUpdatedPossibleTags = useRef<boolean>(false);

  let oldOrder = 0;
  let oldIndex = 0;

  // Fetches songs from the database
  const { data } = useQuery<DataProps>(GET_SONGS_BY_TITLE, {
    variables: {
      searchTerm: searchTerm,
      index: index,
      order: order,
      tag: tag,
    },
  });

  const [songs, setSongs] = useState<SongInterface[]>([]);

  // Updates the songs and tags when the data changes
  useEffect(() => {
    if (data) {
      if (data.tags) {
        if (!hasUpdatedPossibleTags.current) {
          setPossibleTags(data.tags.map((tag) => tag.toUpperCase()));
          hasUpdatedPossibleTags.current = true;
        }
        setTags(data.tags.map((tag) => tag.toUpperCase()));
      }

      if (oldIndex !== index) {
        if (oldOrder !== order) {
          setSongs([...data.songsByTitle]);
          oldOrder = order;
        }
        setSongs([...songs, ...data.songsByTitle]);
        oldIndex = index;
      } else {
        setSongs([...data.songsByTitle]);
      }
    }
    if (data && data.songsByTitle.length < 12) {
      setReachedEnd(true);
    } else {
      setReachedEnd(false);
    }
  }, [data]);

  // Updates the songs when the search term changes
  function activateSearch(Term: string) {
    setIndex(0);
    setSearchTerm(Term);
  }

  const setNewOrder = (newOrder: number) => {
    setIndex(0);
    setOrder(newOrder);
  };

  // Loads more songs when the user presses "load more"
  const loadMore = () => {
    setIndex(index + 12);
  };

  return (
    <div className="home">
      <SideBar tags={possibleTags} currentTags={tags} />
      <div className="home-page-content">
        <TopBar setGlobalSearchTerm={activateSearch} setOrder={setNewOrder} />
        <div className="home-page-song-content">
          <SongFeed songs={songs} loadMore={loadMore} reachedEnd={reachedEnd} />
        </div>
      </div>
    </div>
  );
}
