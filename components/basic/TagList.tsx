import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react'
import tw, { styled } from 'twin.macro'
import { Button } from './Button'
import Input from './Input'

interface TagProps {
  title: string
  tagList: Set<string>
  setTagList: (newRepresentNameList: Set<string>) => void
}
export default function TagList(props: TagProps) {
  const { tagList, setTagList } = props
  const [inputValue, setInputValue] = useState('')
  console.log(tagList)
  const removeTags = useCallback(
    (tagToRemove: string, tags: Set<string>) => {
      setTagList(new Set([...tags].filter((tag) => tag !== tagToRemove)))
    },
    [setTagList],
  )

  const addTags = useCallback(
    (tags: Set<string>, inputVal: string) => {
      setTagList(new Set(tags.add(inputVal)))
      setInputValue('')
    },
    [setTagList],
  )
  const addTagEvent = useCallback(
    (
      event: KeyboardEvent<HTMLInputElement>,
      tags: Set<string>,
      inputVal: string,
    ) => {
      if (event.key === 'Enter' && inputVal !== '' && !tags.has(inputVal)) {
        addTags(tags, inputVal)
      }
    },
    [addTags],
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value)
    },
    [],
  )
  return (
    <>
      <TagsInput>
        <div className="flex">
          <Input
            className="tag-input"
            type="text"
            onKeyUp={(e) => {
              {
                e.stopPropagation()
                addTagEvent(e, tagList, inputValue)
              }
            }}
            value={inputValue}
            onChange={handleInputChange}
            label={props.title}
          />
          <Button
            onClick={() => addTags(tagList, inputValue)}
            className={tw`w-1/4 h-1/6`}
          >
            추가
          </Button>
        </div>
        <TagsList>
          {[...tagList].map((tag, index) => (
            <TagItem key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <TagCloseIcon
                className="tag-close-icon"
                onClick={() => removeTags(tag, tagList)}
              >
                x
              </TagCloseIcon>
            </TagItem>
          ))}
        </TagsList>
      </TagsInput>
    </>
  )
}

export const TTagsInput = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
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
      border-radius: 2px;
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
export const TagsInput = styled.div(() => [
  `
  ${tw`flex flex-wrap items-start min-h-[48px] p-[8px] rounded-[6px]`}
  border: 1px solid rgb(1, 186, 138);
`,
])

export const TagsList = styled.ul(() => [tw`flex flex-wrap p-0 m-[8px_0_0_0]`])

export const TagItem = styled.li(() => [
  tw`flex items-center justify-center text-[rgb(1,186,138)] p-[0_8px] text-[14px] list-none rounded-[2px] m-[0_8px_8px_0] bg-[rgb(242,243,244)] [border-radius: 15px]`,
])

export const TagCloseIcon = styled.span(() => [
  tw`block w-[16px] h-[16px] leading-[16px] text-center text-[14px] ml-[8px] text-[rgb(1,186,138)] rounded-full bg-white cursor-pointer`,
])

// export const tagInput = styled.input(()=>[
//   tw`border-none h-[46px] text-[14px] p-[4px_0_0_0] focus { outline: transparent; }`

// ])
