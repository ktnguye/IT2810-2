import SearchBar from '../../../components/TopBar/SearchBar'
import { describe, test, vi, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

describe('Searchbar test', () => {
    test('render SearchBar component with correct placeholder', () => {
        render(<SearchBar search={vi.fn()} />);
        const searchInput = screen.getByPlaceholderText('Search for song')
        expect(searchInput).toBeInTheDocument();
    });

    test('updates value when user types', async () => {
        const mockSearch = vi.fn();
        render(<SearchBar search={mockSearch} />);
        const searchBarInput = screen.getByPlaceholderText('Search for song');

        await userEvent.type(searchBarInput, 'Rap God');

        expect(searchBarInput).toHaveValue('Rap God');
        expect(searchBarInput).not.toHaveValue('wronginput');
        await waitFor(() => expect(mockSearch).toHaveBeenCalledWith('Rap God'));
    });

    test('snapshot test', () => {
        const result = render(<SearchBar search={vi.fn()} />);
        expect(result).toMatchSnapshot();
    });

})