import SongSelected from '../../pages/SongSelected.tsx';
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';

describe('SongSelected test', () => {
  test('render SongSelected component', () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <SongSelected />
        </BrowserRouter>
      </MockedProvider>
    );
  });

  test('snapshot test', () => {
    const result = render(
      <MockedProvider>
        <BrowserRouter>
          <SongSelected />
        </BrowserRouter>
      </MockedProvider>
    );
    expect(result).toMatchSnapshot();
  });
});
