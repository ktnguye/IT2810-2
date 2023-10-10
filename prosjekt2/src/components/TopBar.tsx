import { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import '../css/TopBar.css';
import SearchBar from './SearchBar';

export default function TopBar(props: {
  setGlobalSearchTerm: (searchTerm: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState(0);

  const setTerm = (newSearchTerm: string) => {
    props.setGlobalSearchTerm(newSearchTerm);
    setSearchTerm(newSearchTerm);
  };

  type OptionType = {
    value: string;
    label: string;
  };

  const options: OptionType[] = [
    { value: '0', label: 'Default' },
    { value: '1', label: 'Name: A-Z' },
    { value: '2', label: 'Name: Z-A' },
    { value: '3', label: 'Rating: High-Low' },
    { value: '4', label: 'Rating: Low-High' },
  ];

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
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
