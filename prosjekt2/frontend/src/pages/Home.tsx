import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import SongFeed from '../components/SongFeed';
import SongDisplay from '../components/SongDisplay';
import { useParams } from 'react-router-dom';
import '../css/Home.css';
import { SongInterface } from '../types/interfaces';
import { useQuery } from '@apollo/client';
import { GET_NEXT_SONGS } from '../graphql/queries';

export default function Home(props: { song?: SongInterface }) {
  const [index, setIndex] = useState<number>(0);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);

  const { error, loading, data } = useQuery(GET_NEXT_SONGS, {
    variables: { index: index },
  });

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
    if (data && data.next12songs) {
      setSongs([...songs, ...data.next12songs]);
    }

    setReachedEnd(data && data.next12songs.length < 12);
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
            <SongFeed
              songs={songs}
              setIndex={setIndex}
              reachedEnd={reachedEnd}
            />
          )}
        </div>
      </div>
    </div>
  );
}
