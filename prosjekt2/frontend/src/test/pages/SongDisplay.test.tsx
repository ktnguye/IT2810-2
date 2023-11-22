import { SongDisplay } from '../../pages/SongDisplay.tsx'
import { SongInterface } from '../../types/interfaces.tsx';
import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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

        expect(screen.getByText('Work')).toBeInTheDocument();
        expect(screen.getByText('Rihanna (2016)')).toBeInTheDocument();
        expect(screen.getByText('Work work work work work work')).toBeInTheDocument();
        expect(screen.getByText('Tag: POP')).toBeInTheDocument();
        expect(screen.getByText('Views: 231000')).toBeInTheDocument();

        const showReviews = screen.getByText('Show Reviews');
        expect(showReviews).toBeInTheDocument();
        expect(showReviews.getAttribute('href')).toBe('/project2/song/1/reviews');
    });

    test('click on favourite button', async () => {
        render(<BrowserRouter>
            <SongDisplay selectedSong={mockSong} />
        </BrowserRouter>)
        const favouriteButton = screen.getByAltText('star')
        expect(favouriteButton).toBeInTheDocument();
        await userEvent.click(favouriteButton)
        expect(favouriteButton).toHaveAttribute('src', '/project2/src/assets/heart_filled.svg');
        await userEvent.click(favouriteButton)
        expect(favouriteButton).toHaveAttribute('src', '/project2/src/assets/heart.svg');
    });

    test('snapshot test', () => {
        const result = render(<BrowserRouter>
            <SongDisplay selectedSong={mockSong} />
        </BrowserRouter>)
        expect(result).toMatchSnapshot();
    });

});