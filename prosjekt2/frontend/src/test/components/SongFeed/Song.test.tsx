import Song from '../../../components/SongFeed/Song.tsx';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SongInterface } from '../../../types/interfaces.tsx';
import { BrowserRouter } from 'react-router-dom';

describe('Song test', () => {
  test('render Song component', () => {
    const mockSong: SongInterface = {
      title: 'Rap God',
      artist: 'Eminem',
      tag: 'RAP',
      year: 2013,
      views: 231000,
      lyrics: 'Rap God Rap God Rap God',
      id: 1,
    };
    render(
      <BrowserRouter>
        <Song song={mockSong} color="red" />
      </BrowserRouter>
    );

    const songTitle = screen.getByText('Rap God');
    const songArtist = screen.getByText('Eminem');
    const songTag = screen.getByText('RAP');

    expect(songTitle).toBeInTheDocument();
    expect(songArtist).toBeInTheDocument();
    expect(songTag).toBeInTheDocument();
  });

  test('snapshot test', () => {
    const mockSong: SongInterface = {
      title: 'Rap God',
      artist: 'Eminem',
      tag: 'RAP',
      year: 2013,
      views: 231000,
      lyrics: 'Rap God Rap God Rap God',
      id: 1,
    };
    const result = render(
      <BrowserRouter>
        <Song song={mockSong} color="red" />
      </BrowserRouter>
    );
    expect(result).toMatchSnapshot();
  });
});
