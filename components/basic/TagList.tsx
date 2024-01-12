import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { styled } from 'twin.macro'

export default function TagList() {
  const initialTags = ['CodeStates', 'kimcoding']

  const [tags, setTags] = useState(initialTags)
  const removeTags = (indexToRemove) => {
    // 태그를 삭제하는 메소드
    const filter = tags.filter((el, index) => index !== indexToRemove)
    setTags(filter)
  }

  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    const inputVal = event.target.value
    if (event.key === 'Enter' && inputVal !== '' && !tags.includes(inputVal)) {
      setTags([...tags, inputVal])
      event.target.value = ''
    }
  }

  return (
    <>
      <TagsInput>
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <input
          className="tag-input"
          type="text"
          //키보드의 Enter 키에 의해 addTags 메소드가 실행
          onKeyUp={(e) => {
            {
              e.stopPropagation()
              addTags(e)
            }
          }}
          placeholder="Press enter to add tags_FEJIGU"
        />
      </TagsInput>
    </>
  )
}

export const TagsInput = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 480px;
  padding: 0 8px;
  border: 1px solid rgb(1, 186, 138);
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
      color: rgb(1, 186, 138);
      padding: 0 8px;
      font-size: 14px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: rgb(242, 243, 244);
      border-radius: 15px;

      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: rgb(1, 186, 138);
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
    border: 1px solid rgb(1, 186, 138);
  }
`
