import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import TopBar from '../components/TopBar/TopBar';
import SideBar from '../components/SideBar/SideBar';
import SongFeed from '../components/SongFeed/SongFeed';
import './Home.css';
import { SongInterface } from '../types/interfaces';
import { useQuery } from '@apollo/client';
import { GET_SONGS_BY_TITLE, GET_TAGS } from '../graphql/queries';

interface DataProps {
  songsByTitle: SongInterface[];
}

interface TagProps {
  tags: string[];
}

export default function Home() {
  const [index, setIndex] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [order, setOrder] = useState<number>(0);

  const tag = useSelector((state: any) => state.sidebar.tag);
  const [tags, setTags] = useState<string[]>([]);
  const [possibleTags, setPossibleTags] = useState<string[]>([]);
  const hasUpdatedPossibleTags = useRef<boolean>(false);

  let oldOrder = 0;
  let oldIndex = 0;

  const { data } = useQuery<DataProps>(GET_SONGS_BY_TITLE, {
    variables: {
      title: searchTerm,
      index: index,
      order: order,
      tag: tag,
    },
  });

  const { data: tagsData } = useQuery<TagProps>(GET_TAGS, {
    variables: {
      title: searchTerm,
    },
  });

  const [songs, setSongs] = useState<SongInterface[]>([]);

  useEffect(() => {
    if (data && data != undefined) {
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

  useEffect(() => {
    if (tagsData && tagsData != undefined) {
      setTags(tagsData.tags.map((tag) => tag.toUpperCase()));
    }
  }, [tagsData]);

  useEffect(() => {
    if (tagsData && tagsData != undefined && !hasUpdatedPossibleTags.current) {
      setPossibleTags(tagsData.tags.map((tag) => tag.toUpperCase()));
      hasUpdatedPossibleTags.current = true;
    }
  }, [tagsData]);

  function activateSearch(Term: string) {
    setIndex(0);
    setSearchTerm(Term);
  }

  const setNewOrder = (newOrder: number) => {
    setIndex(0);
    setOrder(newOrder);
  };

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
