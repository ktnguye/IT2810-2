import Tag from '../../../components/SideBar/Tag';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Tag test', () => {
  test('render unselected and active Tag component', async () => {
    const selectTagMock = vi.fn();
    render(
      <Tag
        tag={'RAP'}
        isSelected={false}
        selectTag={selectTagMock}
        isActive={true}
      />
    );

    const rapTag = screen.getByText('RAP');
    expect(rapTag).toBeInTheDocument();
    expect(rapTag).toHaveClass('tag-button');

    await userEvent.click(rapTag);
    expect(selectTagMock).toHaveBeenCalledTimes(1);
  });

  test('render selected and active Tag component', async () => {
    const selectTagMock = vi.fn();
    render(
      <Tag
        tag={'RAP'}
        isSelected={true}
        selectTag={selectTagMock}
        isActive={true}
      />
    );

    const rapTag = screen.getByText('RAP');
    await userEvent.click(rapTag);
    expect(rapTag).toHaveClass('selected-tag-button');
    expect(selectTagMock).toHaveBeenCalledTimes(1);
  });

  test('render unselected and inactive Tag component', async () => {
    const selectTagMock = vi.fn();
    render(
      <Tag
        tag={'RAP'}
        isSelected={false}
        selectTag={selectTagMock}
        isActive={false}
      />
    );

    const rapTag = screen.getByText('RAP');
    await userEvent.click(rapTag);
    expect(selectTagMock).toHaveBeenCalledTimes(0);
  });

  test('snapshot test', () => {
    const result = render(
      <Tag tag={'RAP'} isSelected={false} selectTag={vi.fn()} isActive={true} />
    );
    expect(result).toMatchSnapshot();
  });
});
