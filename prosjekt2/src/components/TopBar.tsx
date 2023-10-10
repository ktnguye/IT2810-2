import { useState } from 'react';
import Select from 'react-select';
import ValueType from 'react-select';
import '../css/TopBar.css';
import SearchBar from './SearchBar';

interface OptionType {
  value: string;
  label: string;
}

export default function TopBar(props: {
  setGlobalSearchTerm: (searchTerm: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState(0);

  const setTerm = (newSearchTerm: string) => {
    props.setGlobalSearchTerm(newSearchTerm);
    setSearchTerm(newSearchTerm);
  };

  const options: OptionType[] = [
    { value: '1', label: 'Name: A-Z' },
    { value: '2', label: 'Name: Z-A' },
    { value: '3', label: 'Rating: High-Low' },
    { value: '4', label: 'Rating: Low-High' },
  ];

  const handleChange = (selectedOption: ValueType<OptionType>) => {
    setOrder(parseInt(selectedOption.value));
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <div className="top-bar">
      <SearchBar search={setTerm} />
      <Select
        className="order-button"
        options={options}
        onChange={handleChange}
      />
    </div>
  );
}
