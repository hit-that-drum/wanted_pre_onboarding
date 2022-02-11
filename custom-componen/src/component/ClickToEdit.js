import React from 'react';
import { useEffect, useState, useRef } from 'react';
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
    margin: 10px 10px 10px 10px;
  }
`

const InputBox = styled.div`
  text-align: center;
  display: inline-block;
  width: 150px;
  height: 30px;
  border: 1px #bbb solid;
  margin-left: 1rem;
`;

const InputEdit = styled.input`
  text-align: center;
  display: inline-block;
  width: 150px;
  height: 30px;
`;

const InputView = styled.div`
  text-align: center;
  align-items: center;
  margin-top: 2rem;

  div.view {
    margin-top: 3rem;
    font-size: 1.25rem;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
`;

export const MyInput = ({ value, handleValueChange }) => {
  const inputEl = useRef(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    if (isEditMode) {
      inputEl.current.focus();
    }
  }, [isEditMode]);

  const handleClick = () => {
    setEditMode(!isEditMode);
  };

  const handleBlur = () => {
    setEditMode(false);
    handleValueChange(newValue);
  };

  const handleInputChange = (e) => {
    setNewValue(e.target.value);
  };

  return (
    <InputBox>
      {isEditMode ? (
        <InputEdit
          type='text'
          value={newValue}
          ref={inputEl}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
      ) : (
        <span onClick={handleClick}>{newValue}</span>
      )}
    </InputBox>
  );
};

const defaultsetting = {
  name: '김코딩',
  age: 20
};


const ClickToEdit = () => {
  const [name, setName] = useState(defaultsetting.name);
  const [age, setAge] = useState(defaultsetting.age);

  return (
    <OuterContainer>
      <div>ClickToEdit</div>
      <InputView>
        <label>이름</label>
        <MyInput value={name} handleValueChange={(newValue) => setName(newValue)} />
      </InputView>
      <InputView>
        <label>나이</label>
        <MyInput value={age} handleValueChange={(newValue) => setAge(newValue)} />
      </InputView>
      <InputView>
        <div className='view'>이름 {name} 나이 {age}</div>
      </InputView>
    </OuterContainer>
  );
};

export default ClickToEdit;