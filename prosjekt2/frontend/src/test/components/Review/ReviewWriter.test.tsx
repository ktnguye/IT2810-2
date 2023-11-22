import ReviewWriter from '../../../components/Review/ReviewWriter.tsx';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

describe('ReviewWriter test', () => {
  test('render ReviewWriter component', async () => {
    render(
      <MockedProvider>
        <ReviewWriter songId={0} />
      </MockedProvider>
    );
    expect(screen.getByText('Write a review')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('inputs for ReviewWriter component', async () => {
    render(
      <MockedProvider>
        <ReviewWriter songId={1} />
      </MockedProvider>
    );
    const nameInput = screen.getByLabelText('Name');
    await userEvent.type(nameInput, 'Test Name');
    expect(nameInput).toHaveValue('Test Name');

    const ratingStar4 = screen.getAllByAltText('star')[4];
    await userEvent.click(ratingStar4);
    expect(ratingStar4).toContainHTML('star_filled.svg');

    const ratingStar1 = screen.getAllByAltText('star')[0];
    await userEvent.click(ratingStar1);
    expect(ratingStar1).toContainHTML('star_filled.svg');
    expect(ratingStar4).toContainHTML('star.svg');

    const reviewInput = screen.getByLabelText('Review');
    await userEvent.type(reviewInput, 'This is a test review');
    expect(reviewInput).toHaveValue('This is a test review');
  });

  test('snapshot test', () => {
    const result = render(
      <MockedProvider>
        <ReviewWriter songId={1} />
      </MockedProvider>
    );
    expect(result).toMatchSnapshot();
  });
});
