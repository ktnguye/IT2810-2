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

let oldOrder = 0;
let oldIndex = 0;
let oldSearchTerm = '';
let oldTag = '';
let oldIsShowingFavourites = false;

export default function Home() {
  const [index, setIndex] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [order, setOrder] = useState<number>(0);

  const tag = useSelector((state: RootState) => state.sidebar.tag);
  const [tags, setTags] = useState<string[]>([]);

  const isShowingFavourites = useSelector(
    (state: RootState) => state.sidebar.showFavorites
  );

  const favourites = localStorage.getItem('favourites');
  // remove last character of array (comma) and split into number array
  const favouritesArray = favourites
    ? favourites
        .slice(0, -1)
        .split(',')
        .map((id) => parseInt(id))
    : [];

  const [possibleTags, setPossibleTags] = useState<string[]>([]);
  const hasUpdatedPossibleTags = useRef<boolean>(false);

  const { data } = useQuery<DataProps>(GET_SONGS_BY_TITLE, {
    variables: {
      searchTerm: searchTerm,
      index: index,
      order: order,
      tag: tag,
      isShowingFavourites: isShowingFavourites,
      favourites: favouritesArray,
    },
  });

  useEffect(() => {
    if (isShowingFavourites) {
      setIndex(0);
    }
  }, [isShowingFavourites]);

  const [songs, setSongs] = useState<SongInterface[]>([]);

  useEffect(() => {
    if (data) {
      if (data.tags) {
        if (!hasUpdatedPossibleTags.current) {
          setPossibleTags(data.tags.map((tag) => tag.toUpperCase()));
          hasUpdatedPossibleTags.current = true;
        }
        setTags(data.tags.map((tag) => tag.toUpperCase()));
      }

      // if we changed the order, search term or tag
      if (
        oldOrder != order ||
        oldSearchTerm != searchTerm ||
        oldTag != tag ||
        oldIsShowingFavourites != isShowingFavourites
      ) {
        setSongs(data.songsByTitle);
        oldOrder = order;
        oldSearchTerm = searchTerm;
        oldTag = tag;
        oldIsShowingFavourites = isShowingFavourites;
      } else if (oldIndex < index) {
        // if we incremented the index
        setSongs([...songs, ...data.songsByTitle]);
      } else {
        // if we didn't change the order, index, search term or tag
        // we are either loading the page for the first time where we have no songs
        // so we set the songs to the data
        if (songs.length == 0) {
          setSongs(data.songsByTitle);
        }
        // or we have manipulated the data in some way
        // if we have unfavourited a song and we are showing favourites
        // we need to remove the song from the list
        else if (isShowingFavourites) {
          setSongs(data.songsByTitle);
        }
        oldIndex = index;
        // which means we can still show the same songs
      }
      if (data && data.songsByTitle.length < 12) {
        setReachedEnd(true);
      } else {
        setReachedEnd(false);
      }
    }
  }, [data]);

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
      <main className="home-page-content">
        <TopBar setGlobalSearchTerm={activateSearch} setOrder={setNewOrder} />
        <SongFeed
          songs={songs}
          loadMore={loadMore}
          reachedEnd={reachedEnd}
          isShowingFavourites={isShowingFavourites}
        />
      </main>
    </div>
  );
}
