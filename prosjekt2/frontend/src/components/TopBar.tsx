import Select, { SingleValue } from 'react-select';
import '../css/TopBar.css';
import SearchBar from './SearchBar';
import { OptionInterface } from '../types/interfaces';

export default function TopBar(props: {
  setGlobalSearchTerm: (searchTerm: string) => void;
  setOrder: (order: number) => void;
}) {
  const search = (term: string) => {
    props.setGlobalSearchTerm(term);
  };

  const options: OptionInterface[] = [
    { value: '0', label: 'Name: A-Z' },
    { value: '1', label: 'Name: Z-A' },
    { value: '2', label: 'Year: Newest First' },
    { value: '3', label: 'Year: Oldest First' },
  ];

  /**Does nothing now, but will be used to order songs */
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
        placeholder="Order by"
        onChange={(option) => handleChange(option)}
      />
    </div>
  );
}
