import '../../css/Tag.css';
import { useEffect } from 'react';

export default function Tag(props: {
  tag: string;
  isSelected: boolean;
  selectTag: (tag: string) => void;
  isActive: boolean;
}) {
  const { isActive, isSelected, selectTag } = props;

  const selectChosenTag = (tag: string) => {
    if (isSelected) {
      selectTag('');
    } else {
      selectTag(tag);
    }
  };

  useEffect(() => {
    if (!isActive && isSelected) {
      selectTag('');
    }
  }, [isActive, isSelected, selectTag]);

  return (
    <button
      className={
        !isActive
          ? 'inactive-tag-button'
          : isSelected
          ? 'selected-tag-button'
          : 'tag-button'
      }
      onClick={selectChosenTag.bind(null, props.tag)}
      disabled={!isActive}
    >
      {props.tag}
    </button>
  );
}
