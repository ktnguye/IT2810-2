import { SongDisplay } from './SongDisplay';
import { SongInterface } from '../types/interfaces';
import { Link, useParams } from 'react-router-dom';
import ReviewsList from './ReviewsList';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SONG } from '../graphql/queries';

interface DataProps {
  song: SongInterface;
}

export default function SongSelected(props: { isShowingReviews?: boolean }) {
  const [selectedSong, setSelectedSong] = useState<SongInterface>({
    id: 0,
    title: '',
    artist: '',
    year: 0,
    lyrics: '',
    views: 0,
    tag: '',
  });

  const lyrics = selectedSong.lyrics.split('\n').map((line, index) => {
    return <p key={index}>{line}</p>;
  });

  const { id } = useParams<{ id: string }>();

  const { data } = useQuery<DataProps>(GET_SONG, {
    variables: { id: parseInt(id || '') },
  });

  useEffect(() => {
    if (data && data.song) {
      setSelectedSong(data.song);
    }
  }, [data]);

  return (
    <>
      {props.isShowingReviews ? (
        <ReviewsList song={selectedSong} />
      ) : (
        <SongDisplay selectedSong={selectedSong} lyrics={lyrics} />
      )}
    </>
  );
}
