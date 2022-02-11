import React from 'react';
import { useState } from 'react';
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
    margin: 10px 10px 10px 0px;
  }
`

const ToggleContainer = styled.div`
  position: relative;
  margin-top: 5rem;
  left: 45%;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: #8b8b8b;
    transition: all 0.5s ease;
    &.toggle--checked {
      background-color: blue;
    }
  }
  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: #ffffff;
    transition: all 0.5s ease;
    &.toggle--checked {
      left: 27px;
      }
  }
`;

const State = styled.div`
  text-align: center;
  margin-top: 15px;
  font-weight: 500;
`;

const Toggle = () => {
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn(!isOn);
  };

  return (
    <OuterContainer>
      <div>Toggle</div>
        <ToggleContainer onClick = {toggleHandler}>
          <div className = {`toggle-container ${isOn ? 'toggle--checked' : ''}`} />
          <div className = {`toggle-circle ${isOn ? 'toggle--checked' : ''}`}/>
        </ToggleContainer>
        {isOn ? <State>Toggle Switch ON</State> : <State>Toggle Switch OFF</State>}
    </OuterContainer>
  );
};

export default Toggle;