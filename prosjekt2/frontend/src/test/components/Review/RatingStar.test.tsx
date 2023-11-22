import RatingStar from '../../../components/Review/RatingStar.tsx'
import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('RatingStar test', () => {
    test('render RatingStar component', () => {
        const mockSetRating = vi.fn();
        render(<RatingStar setRating={mockSetRating} rating={1} isFilled={false} />)
        expect(screen.getByAltText('star')).toBeInTheDocument();
    });

    test('correct star is shown', async () => {
        const mockSetRating = vi.fn();
        render(<RatingStar setRating={mockSetRating} rating={1} isFilled={true} />)

        const starIcon = screen.getByAltText('star');
        expect(starIcon.getAttribute("src")).toContain("star_filled.svg");
    });

    test('snapshot test', () => {
        const result = render(<RatingStar setRating={vi.fn()} rating={1} isFilled={false} />)
        expect(result).toMatchSnapshot();
    });
});