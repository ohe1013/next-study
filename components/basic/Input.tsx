import { ChangeEvent } from 'react'
import tw, { styled } from 'twin.macro'

interface TextFieldLineContainerBaseProps {
  className?: string

  label: string
  hasError?: boolean

  disabled?: boolean

  hasValue?: boolean

  labelHtmlFor?: string

  onChange?: (e: ChangeEvent<HTMLInputElement>) => void

  focused?: boolean
}

export type Props<Element extends keyof JSX.IntrinsicElements = 'div'> =
  TextFieldLineContainerBaseProps & {
    value?: string | number | string[]
  } & Omit<
      JSX.IntrinsicElements[Element],
      keyof TextFieldLineContainerBaseProps
    >

export default function Input(props: Props) {
  const {
    className,
    label,
    hasError,
    disabled,
    style,
    hasValue,
    children,
    labelHtmlFor,
    value = '',
    focused,
    ...rest
  } = props
  return (
    <InputContainer className={className} {...rest}>
      <InputField
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        value={props.value}
      ></InputField>
      <LabelContainer>
        <label htmlFor={labelHtmlFor} aria-hidden>
          {label}
        </label>
      </LabelContainer>
      <Text>{String(value)?.length !== 0 ? value : label}</Text>
      <BottomLine />
    </InputContainer>
  )
}
interface InputContainer {
  className?: string

  hasError?: boolean

  disabled?: boolean

  hasValue?: boolean

  focused?: boolean
}
const InputContainer = styled.div<Omit<Props, 'label'>>(
  ({ hasValue, className, focused }) => [
    tw`cursor-text flex [align-items: flex-end] justify-center
  relative [padding: 20px 0 4px] whitespace-nowrap overflow-hidden
  text-2xl 
  disabled:cursor-default
  `,
    className && tw`${className}`,
  ],
)

const LabelContainer = styled.div(() => [
  tw`absolute top-6 left-0 pointer-events-none whitespace-nowrap
  -translate-y-6  text-gray-800
  dark:text-white
  text-sm
  `,
])

const text_input = tw`
  w-full max-w-full bg-transparent  appearance-none
  p-0 [font-size: inherit] font-medium [line-height: inherit] 
  text-gray-800 caret-blue-400 outline-none  border-b-2  border-gray-200 
  focus:border-b-2 focus:border-blue-400
  `

const InputField = styled.input(() => [text_input])

const Text = styled.div(() => [
  text_input,
  tw`h-0.5 opacity-0 overflow-hidden `,
])

const BottomLine = styled.span(() => [
  tw`absolute left-0 right-0 bottom-0 h-1 [border-radius: 1px]
  bg-gray-100
  `,
])
