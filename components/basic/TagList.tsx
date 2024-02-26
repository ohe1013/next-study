import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import tw, { styled } from 'twin.macro'
import { Button } from './Button'
import Input from './Input'

interface TagProps {
  title: string
  type?: 'link' | 'string'
  tagList: Set<string>
  setTagList: (newRepresentNameList: Set<string>) => void
  buttonLabel: string
}
export default function TagList(props: TagProps) {
  const { tagList, setTagList, buttonLabel, type = 'string' } = props
  const [inputValue, setInputValue] = useState('')
  const removeTags = useCallback(
    (tagToRemove: string, tags: Set<string>) => {
      setTagList(new Set([...tags].filter((tag) => tag !== tagToRemove)))
    },
    [setTagList],
  )

  const addTags = useCallback(
    (tags: Set<string>, inputVal: string) => {
      if (inputVal === '') return
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
            buttonStyle={'addone'}
          >
            {buttonLabel}
          </Button>
        </div>
        <TagsList>
          {[...tagList].map((tag, index) => (
            <TagItem key={index} className="tag">
              <a
                className="tag-title"
                target="_blank"
                href={tag}
                rel="noopener noreferrer"
              >
                {type === 'link' ? '링크' + (index + 1) : tag}
              </a>
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
const primary_color = 'blue-500'
export const TagsInput = styled.div(() => [
  `
  ${tw`flex flex-wrap items-start min-h-[48px] p-[8px] rounded-[6px] [border: 1px solid] border-${primary_color}`}
`,
])

export const TagsList = styled.ul(() => [tw`flex flex-wrap p-0 gap-2`])

export const TagItem = styled.li(() => [
  tw`flex items-center justify-center text-white
  p-2 text-sm  list-none rounded-[2px] 
  m-[2px_8px_2px_0] bg-primary [border-radius: 15px]`,
])

export const TagCloseIcon = styled.span(() => [
  tw`block w-[16px] h-[16px] leading-[14px] text-center text-[14px] ml-[8px] text-primary rounded-full bg-white cursor-pointer`,
])
