import { SongDisplay } from '../../pages/SongDisplay.tsx'
import { SongInterface } from '../../types/interfaces.tsx';
import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';

describe('SongDisplay test', () => {
    const mockSong: SongInterface = {
        title: "Work",
        artist: "Rihanna",
        tag: "POP",
        year: 2016,
        views: 231000,
        lyrics: "Work work work work work work",
        id: 1,
    }
    test('render SongDisplay component with correct details', () => {
        render(<BrowserRouter>
            <SongDisplay selectedSong={mockSong} />
        </BrowserRouter>)

        expect(screen.getByText('Work'));
        expect(screen.getByText('Rihanna (2016)'));
        expect(screen.getByText('Work work work work work work'));
        expect(screen.getByText('Tag: POP')).toBeInTheDocument();
        expect(screen.getByText('Views: 231000')).toBeInTheDocument();

        const showReviews = screen.getByText('Show Reviews');
        expect(showReviews).toBeInTheDocument();
        expect(showReviews.getAttribute('href')).toBe('/project2/song/1/reviews');
    });
});