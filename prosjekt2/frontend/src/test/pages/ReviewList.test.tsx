import ReviewsList from '../../pages/ReviewsList.tsx';
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SongInterface } from '../../types/interfaces.tsx';
import { MockedProvider } from '@apollo/client/testing';

describe('ReviewList test', () => {
  const mockSong: SongInterface = {
    title: 'Rap God',
    artist: 'Eminem',
    tag: 'RAP',
    year: 2013,
    views: 231000,
    lyrics: 'Rap God Rap God Rap God',
    id: 1,
  };

  test('render ReviewList component', () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <ReviewsList song={mockSong} />
        </BrowserRouter>
      </MockedProvider>
    );
    expect(screen.getByText('Rap God')).toBeInTheDocument();
    expect(screen.getByText('Eminem (2013)')).toBeInTheDocument();

    expect(screen.getByText('Reviews')).toBeInTheDocument();
    expect(screen.getByText('Write Review')).toBeInTheDocument();
  });

  test('snapshot test', () => {
    const result = render(
      <MockedProvider>
        <BrowserRouter>
          <ReviewsList song={mockSong} />
        </BrowserRouter>
      </MockedProvider>
    );
    expect(result).toMatchSnapshot();
  });
});
