import '../css/Tag.css';
import { useEffect } from 'react';

export default function Tag(props: {
  tag: string;
  isSelected: boolean;
  selectTag: (tag: string) => void;
  isActive: boolean;
}) {
  const selectTag = (tag: string) => {
    if (props.isSelected) {
      props.selectTag('');
    } else {
      props.selectTag(tag);
    }
  };

  useEffect(() => {
    if (!props.isActive) {
      props.selectTag('');
    }
  }, [props.isActive]);

  return (
    <button
      className={
        !props.isActive
          ? 'inactive-tag-button'
          : props.isSelected
          ? 'selected-tag-button'
          : 'tag-button'
      }
      onClick={selectTag.bind(null, props.tag)}
      disabled={!props.isActive}
    >
      {props.tag}
    </button>
  );
}
