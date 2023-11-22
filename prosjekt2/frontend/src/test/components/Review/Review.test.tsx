import Review from '../../../components/Review/Review.tsx';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ReviewInterface } from '../../../types/interfaces.tsx';
import { MockedProvider } from '@apollo/client/testing';

describe('Review test', () => {
  const mockReview: ReviewInterface = {
    _id: 1,
    songId: 1,
    name: 'Joe Test',
    rating: 5,
    review: 'Good Song!',
    date: new Date('2022-01-01'),
  };

  test('render Review component', () => {
    render(
      <MockedProvider>
        <Review review={mockReview} />
      </MockedProvider>
    );

    expect(screen.getByText('Joe Test')).toBeInTheDocument();
    expect(screen.getByText('(5/5)')).toBeInTheDocument();
    expect(screen.getByText('Good Song!')).toBeInTheDocument();
  });

  test('snapshot test', () => {
    const result = render(
      <MockedProvider>
        <Review review={mockReview} />
      </MockedProvider>
    );
    expect(result).toMatchSnapshot();
  });
});
