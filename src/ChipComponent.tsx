// src/ChipComponent.tsx

import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';
import './ChipComponent.css';

interface Chip {
  id: number;
  label: string;
}

const ChipComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: string[] = ["Aadit Palicha", "Kashif Iqbal", "Kaivalya V.", "Gaurav Thakur", "Abhishek Yadav"];

  useEffect(() => {
    setFilteredItems(items.filter(item => !chips.find(chip => chip.label === item)));
  }, [chips, items]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setFilteredItems(items.filter(item => item.toLowerCase().includes(value.toLowerCase())));
  };

  const handleItemSelect = (item: string) => {
    const newChips = [...chips, { id: Date.now(), label: item }];
    setChips(newChips);
    setInputValue('');
    setFilteredItems(items.filter(i => !newChips.find(chip => chip.label === i)));
  };

  const handleChipRemove = (chipId: number) => {
    const updatedChips = chips.filter(chip => chip.id !== chipId);
    setChips(updatedChips);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      e.preventDefault();
      const lastChip = chips[chips.length - 1];
      handleChipRemove(lastChip.id);
    }
  };

  return (
    <div className="chip-container">
      <div className="chips">
        {chips.map(chip => (
          <div key={chip.id} className="chip">
            {chip.label} <span onClick={() => handleChipRemove(chip.id)}>X</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type to search..."
        />
        {inputValue !== '' && (
          <div className="autocomplete">
            {filteredItems.map(item => (
              <div key={item} className="item" onClick={() => handleItemSelect(item)}>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChipComponent;
