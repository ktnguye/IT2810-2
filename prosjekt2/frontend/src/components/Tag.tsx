import '../css/Tag.css';

export default function Tag(props: {
  tag: string;
  isSelected: boolean;
  selectTag: (tag: string) => void;
}) {
  const selectTag = (tag: string) => {
    if (props.isSelected) {
      props.selectTag('');
    } else {
      props.selectTag(tag);
    }
  };

  return (
    <button
      className={props.isSelected ? 'selected-tag-button' : 'tag-button'}
      onClick={selectTag.bind(
        null,
        props.tag
      )} /**After a button is clicked, its css is changed */
    >
      {props.tag}
    </button>
  );
}
