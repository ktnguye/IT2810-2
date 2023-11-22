import Home from '../../pages/Home.tsx'
import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { MockedProvider } from '@apollo/client/testing';

describe('Home test', () => {
    const initialState = { sidebar: { tag: 'RAP' } };
    const mockHomeStore = configureStore();
    let store;
    test('render Home component', () => {
        store = mockHomeStore(initialState);
        render(
            <MockedProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <Home />
                    </Provider>
                </BrowserRouter>
            </MockedProvider>
        );
    });

    test('snapshot test', () => {
        store = mockHomeStore(initialState);
        const result = render(
            <MockedProvider>
                <BrowserRouter>
                    <Provider store={store}>
                        <Home />
                    </Provider>
                </BrowserRouter>
            </MockedProvider>
        );
        expect(result).toMatchSnapshot();
    });
});

