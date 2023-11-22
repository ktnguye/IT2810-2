import SongFeed from '../../../components/SongFeed/SongFeed'
import { describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SongInterface } from '../../../types/interfaces';
import { BrowserRouter } from 'react-router-dom';

describe('SongFeed test', () => {
    const mockSongs: SongInterface[] = [
        {
            title: "HUMBLE.",
            artist: "Kendrick Lamar",
            tag: "RAP",
            year: 2017,
            views: 231000,
            lyrics: "Be humble",
            id: 1,
        },
        {
            title: "Gods Plan",
            artist: "Drake",
            tag: "RAP",
            year: 2018,
            views: 231000,
            lyrics: "Gods plan gods plan",
            id: 2,
        },
    ];
    test('render SongFeed component', () => {
        render(<BrowserRouter> <SongFeed songs={mockSongs} loadMore={vi.fn()} reachedEnd={false} isShowingFavourites={false} /> </BrowserRouter>)

        const songTitle1 = screen.getByText('HUMBLE.');
        const songArtist1 = screen.getByText('Kendrick Lamar');
        const songTitle2 = screen.getByText('Gods Plan');
        const songArtist2 = screen.getByText('Drake');

        expect(songTitle1).toBeInTheDocument();
        expect(songArtist1).toBeInTheDocument();
        expect(songTitle2).toBeInTheDocument();
        expect(songArtist2).toBeInTheDocument();

        const loadMore = screen.getByText('Load more');
        expect(loadMore).toBeInTheDocument();
    });

    test('render SongFeed component with no songs', () => {
        render(<BrowserRouter> <SongFeed songs={[]} loadMore={vi.fn()} reachedEnd={false} isShowingFavourites={false} /> </BrowserRouter>)
        const noSongsMessage = screen.getByText('No results');
        expect(noSongsMessage).toBeInTheDocument();
    });

    test('snapshot test', () => {
        const result = render(<BrowserRouter> <SongFeed songs={mockSongs} loadMore={vi.fn()} reachedEnd={false} isShowingFavourites={false} /> </BrowserRouter>)
        expect(result).toMatchSnapshot();
    });
});