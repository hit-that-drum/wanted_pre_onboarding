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
    margin: 10px 10px 10px 10px;
  }
`

const TagsInput = styled.div`
  margin: 5rem auto;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 480px;
  padding: 0 8px;
  border: 1px solid rgb(214, 216, 218);
  border-radius: 6px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      padding: 0 8px;
      font-size: 14px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: #4000c7;
        > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: #4000c7;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
      }
    }
  }

  > input {    
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding: 4px 0 0 0;
    :focus {
    outline: transparent;
  }
  }

  &:focus-within {
    border: 1px solid #4000c7;
  }

`;

const Tag = () => {
  const initialTags = ['CodeStates', 'JJang'];

  const [tags, setTags] = useState(initialTags);
  const removeTags = (indexToRemove) => {
    setTags(tags.filter(tag => indexToRemove !== tags.indexOf(tag)))
  };

  const addTags = (event) => {
    const filtered = tags.filter((el) => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
    }

  return (
    <OuterContainer>
      <div>Tag</div>
            <TagsInput>
        <ul id='tags'>
          {tags.map((tag, index) => (
            <li key={index} className='tag'>
              <span className='tag-title'>{tag}</span>
              <span className='tag-close-icon' onClick={() => removeTags(index)}>
                &times;
              </span>
            </li>
          ))}
        </ul>
        <input
          className='tag-input'
          type='text'
          onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)}
          placeholder='Press enter to add tags'
        />
      </TagsInput>
    </OuterContainer>
  );
};

export default Tag;