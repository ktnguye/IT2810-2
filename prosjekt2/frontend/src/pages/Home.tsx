import { useState, useEffect, useRef } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SongFeed from '../components/SongFeed';
import SongDisplay from '../components/SongDisplay';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import { SongInterface } from '../types/interfaces';
import { useQuery } from '@apollo/client';
import { GET_SONGS_BY_TITLE, GET_TAGS } from '../graphql/queries';

interface DataProps {
  songsByTitle: SongInterface[];
}

interface TagProps {
  tags: string[];
}

export default function Home(props: { song?: SongInterface }) {
  const [index, setIndex] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [order, setOrder] = useState<number>(0);

  const [tag, setTag] = useState<string>('');
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

  const { id } = useParams();

  useEffect(() => {
    if (id) {
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
      <SideBar tags={possibleTags} setTag={setNewTag} currentTags={tags} />
      <div className="home-page-content">
        <TopBar setGlobalSearchTerm={activateSearch} setOrder={setNewOrder} />
        <div className="home-page-song-content">
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
