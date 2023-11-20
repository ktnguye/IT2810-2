import Select, { SingleValue } from 'react-select';
import './TopBar.css';
import SearchBar from './SearchBar';
import { OptionInterface } from '../../types/interfaces';

export default function TopBar(props: {
  setGlobalSearchTerm: (searchTerm: string) => void;
  setOrder: (order: number) => void;
}) {
  const search = (term: string) => {
    props.setGlobalSearchTerm(term);
  };

  const options: OptionInterface[] = [
    { value: '0', label: 'Views: Most first' },
    { value: '1', label: 'Views: Least first' },
    { value: '2', label: 'Name: A-Z' },
    { value: '3', label: 'Name: Z-A' },
  ];

  const handleChange = (selectedOption: SingleValue<OptionInterface>) => {
    if (selectedOption == null) {
      return;
    }
    props.setOrder(parseInt(selectedOption.value));
  };

  return (
    <div className="top-bar">
      <SearchBar search={search} />
      <Select
        className="order-button"
        options={options}
        defaultValue={options[0]}
        onChange={(option) => handleChange(option)}
      />
    </div>
  );
}
