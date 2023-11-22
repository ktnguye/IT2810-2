import SideBar from '../../../components/SideBar/SideBar'
import { describe, expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter } from 'react-router-dom'

describe('SideBar test', () => {
    const initialState = { output: 10 };
    const mockStore = configureStore();
    let store;

    test('render SideBar component and handles tag selection', () => {
        store = mockStore(initialState);
        const mockTags = ['RAP', 'POP', 'ROCK'];
        const mockCurrentTags = ['RAP', 'POP'];
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <SideBar tags={mockTags} currentTags={mockCurrentTags} />
                </Provider>
            </BrowserRouter>
        );

        expect(screen.getByAltText('songify logo')).toBeInTheDocument();
        mockTags.forEach(tag => { expect(screen.getByText(tag)).toBeInTheDocument() });
        expect(screen.getByText('ROCK')).toHaveClass('inactive-tag-button');
        expect(screen.getByText('RAP')).toHaveClass('tag-button');

        fireEvent.click(screen.getByText('RAP'));
        expect(store.getActions()).toEqual([{ type: 'SET_TAG', payload: 'RAP' }]);
        expect(screen.getByText('RAP')).toHaveClass('selected-tag-button');
    });

    test('snapshot test', () => {
        const mockTags = ['RAP', 'POP', 'ROCK'];
        const mockCurrentTags = ['RAP', 'POP'];
        store = mockStore(initialState);
        const result = render(
            <BrowserRouter>
                <Provider store={store}>
                    <SideBar tags={mockTags} currentTags={mockCurrentTags} />
                </Provider>
            </BrowserRouter>
        );
        expect(result).toMatchSnapshot();
    });
});