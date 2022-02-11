import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const OuterContainer = styled.div`
  border: solid 5px lightgray;
  border-radius: 10px;
  width: 700px;
  height: 300px;
  margin: 100px 25% 100px 25%;
  div:nth-child(1) {
    font-weight: 800;
    font-size: 25px;
    font-family: 'Merriweather', serif;
    margin: 10px 10px 0px 10px;
  }
`

const deselectedOptions = [
  'antique',
  'vintage',
  'refurbished',
  'rustic',
  '중고A급',
];

const boxShadow = '0 4px 6px rgb(32 33 36 / 28%)';
const activeBorderRadius = '1rem 1rem 0 0';
const inactiveBorderRadius = '1rem 1rem 1rem 1rem';

const InputContainer = styled.div`
  margin-top: 8rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border: 1px solid rgb(223, 225, 229);
  border-radius: ${(props) =>
    props.hasText ? activeBorderRadius : inactiveBorderRadius};
  z-index: 3;
  box-shadow: ${(props) => (props.hasText ? boxShadow : 0)};

  &:focus-within {
    box-shadow: ${boxShadow};
  }

  > input {
    flex: 1 0 0;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 16px;
  }

  > div.delete-button {
    cursor: pointer;
  }
`;

const DropDownContainer = styled.ul`
  background-color: #ffffff;
  display: block;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 10px;
  margin-inline-end: 10px;
  padding-inline-start: 10px;
  margin-top: -1px;
  padding: 0.5rem 0;
  border: 1px solid rgb(223, 225, 229);
  border-radius: 0 0 1rem 1rem;
  box-shadow: ${boxShadow};
  z-index: 3;

  > li {
    padding: 0 1rem;

    &:hover {
      background-color: #eee;
    }

    &.selected {
      background-color: #ebe5f9;
    }
  }
`;

const AutoComplete = () => {
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);
  const [selected, setSelected] = useState(-1);

  useEffect(() => {
    if (inputValue === '') {
      setHasText(false);
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value.includes('\\')) return;

    value ? setHasText(true) : setHasText(false);

    setInputValue(value);

    const filterRegex = new RegExp(value, 'i');
    const resultOptions = deselectedOptions.filter((option) =>
      option.match(filterRegex)
    );
    setOptions(resultOptions);
  };

  const handleDropDownClick = (clickedOption) => {
    setInputValue(clickedOption);
    const resultOptions = deselectedOptions.filter(
      (option) => option === clickedOption
    );
    setOptions(resultOptions);
  };

  const handleDeleteButtonClick = () => {
    setInputValue('');
  };

  const handleKeyUp = (event) => {
    if (event.getModifierState("Fn") || event.getModifierState("Hyper") || event.getModifierState("OS") || event.getModifierState("Super") || event.getModifierState("Win")) return; if (event.getModifierState("Control") + event.getModifierState("Alt") + event.getModifierState("Meta") > 1) return;
    if (hasText) {
      if (event.code === 'ArrowDown' && options.length - 1 > selected) {
        setSelected(selected + 1);
      }
      if (event.code === 'ArrowUp' && selected >= 0) {
        setSelected(selected - 1);
      }
      if (event.code === 'Enter' && selected >= 0) {
        handleDropDownClick(options[selected]);
        setSelected(-1);
      }
    }
  };

  return (
    <OuterContainer>
      <div>AutoComplete</div>
      <div className='autocomplete-wrapper' onKeyUp={handleKeyUp}>
        <InputContainer hasText={hasText}>
          <input
            type='text'
            className='autocomplete-input'
            onChange={handleInputChange}
            value={inputValue}
          />
          <div className='delete-button' onClick={handleDeleteButtonClick}>
            &times;
          </div>
        </InputContainer>
        {hasText ? (
          <DropDown
            options={options}
            handleDropDownClick={handleDropDownClick}
            selected={selected}
          />
        ) : null}
      </div>
    </OuterContainer>
  );
};

export default AutoComplete;

export const DropDown = ({ options, handleDropDownClick, selected }) => {
  return (
    <div>
      <DropDownContainer>
      {options.map((option, idx) => (
        <li
          key={idx}
          onClick={() => handleDropDownClick(option)}
          className={selected === idx ? 'selected' : ''}
        >
          {option}
        </li>
      ))}
    </DropDownContainer>
    </div>
  );
};