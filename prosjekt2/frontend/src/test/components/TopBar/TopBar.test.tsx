import TopBar from '../../../components/TopBar/TopBar';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TopBar test', () => {
  test('render TopBar component', async () => {
    const setOrderMock = vi.fn();
    render(<TopBar setGlobalSearchTerm={vi.fn()} setOrder={setOrderMock} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    const orderButton = screen.getByText('Views: Most first');
    await userEvent.click(orderButton);

    const option = screen.getByText('Name: A-Z');
    await userEvent.click(option);

    expect(setOrderMock).toHaveBeenCalledWith(2);
  });

  test('snapshot test', () => {
    const result = render(
      <TopBar setGlobalSearchTerm={vi.fn()} setOrder={vi.fn()} />
    );
    expect(result).toMatchSnapshot();
  });
});
