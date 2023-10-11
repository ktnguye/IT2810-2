import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import '../css/TopBar.css';
import SearchBar from './SearchBar';
import { OptionInterface } from '../types/interfaces';

export default function TopBar(props: {
  setGlobalSearchTerm: (searchTerm: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState(0);

  const setTerm = (newSearchTerm: string) => {
    props.setGlobalSearchTerm(newSearchTerm);
    setSearchTerm(newSearchTerm);
  };

  const options: OptionInterface[] = [
    { value: '1', label: 'Name: A-Z' },
    { value: '2', label: 'Name: Z-A' },
    { value: '3', label: 'Rating: High-Low' },
    { value: '4', label: 'Rating: Low-High' },
  ];

  /**Does nothing now, but will be used to order songs */
  const handleChange = (selectedOption: SingleValue<OptionInterface>) => {
    if (selectedOption == null) {
      return;
    }
    setOrder(parseInt(selectedOption.value));
    console.log(`Option selected:`, selectedOption.label);
  };

  return (
    <div className="top-bar">
      <SearchBar search={setTerm} />
      <Select
        className="order-button"
        options={options}
        onChange={(option) => handleChange(option)}
      />
    </div>
  );
}
