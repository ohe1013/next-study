import { css } from '@emotion/react'
import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react'
import tw, { styled } from 'twin.macro'

interface TextFieldLineContainerBaseProps {
  className?: string

  label: string

  hasError?: boolean

  disabled?: boolean

  hasValue?: boolean

  labelHtmlFor?: string

  focused?: boolean
}

type Props<Element extends keyof JSX.IntrinsicElements = 'div'> =
  TextFieldLineContainerBaseProps & {
    value?: string | number | string[]
  } & Omit<
      JSX.IntrinsicElements[Element],
      keyof TextFieldLineContainerBaseProps
    >

function InputContainer(props: Props) {
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
    <InputContainerField className={className} {...rest}>
      {children}
      <LabelContainer focused={focused} hasValue={hasValue}>
        <label htmlFor={labelHtmlFor} aria-hidden>
          {label}
        </label>
      </LabelContainer>
      {/* <Text>{String(value)?.length !== 0 ? value : label}</Text> */}
      {/* <BottomLine /> */}
    </InputContainerField>
  )
}

export interface InputProps
  extends TextFieldLineContainerBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'onClick'> {}

export default function Input({
  className,
  label,
  hasError,
  style,
  autoComplete = 'off',
  focused,
  onChange,
  ...inputProps
}: InputProps) {
  const value = inputProps.value
  const inputRef = useRef<HTMLInputElement>(null)

  const [hasFocus, setHasFocus] = useState(false)
  const hasValue = value !== ''
  const id = useId()
  const handleClick = useCallback(() => inputRef.current?.focus(), [])
  return (
    <InputContainer
      className={className}
      label={label}
      hasError={hasError}
      disabled={inputProps.disabled}
      hasValue={hasValue}
      onClick={handleClick}
      labelHtmlFor={id}
      focused={hasFocus}
      value={value as any}
    >
      <input
        {...inputProps}
        ref={inputRef}
        onChange={(e) => {
          onChange?.(e)
        }}
        value={value}
        autoComplete={autoComplete}
        css={text_input}
        placeholder={undefined}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        id={id}
      />
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
const InputContainerField = styled.div<Omit<Props, 'label'>>(
  ({ hasValue, className, focused }) => [
    tw`cursor-text flex [align-items: flex-end] justify-center
  relative [padding: 20px 0 4px] whitespace-nowrap overflow-hidden
  text-2xl 
  disabled:cursor-default
  `,
    className && tw`${className}`,
  ],
)

const LabelContainer = styled.div<{ hasValue?: boolean; focused?: boolean }>(
  ({ hasValue, focused }: { hasValue: boolean; focused: boolean }) => {
    return [
      tw`absolute top-6 left-0 pointer-events-none whitespace-nowrap
  -translate-y-6  text-gray-800 
  dark:text-white
  text-sm
  `,
      !hasValue &&
        !focused &&
        css`
    top: calc((0.409 * 22px) / 2 + 22px);
    top: calc(
      (var(--toss-line-height-22, 22px) - var(--toss-font-size-22, 22px)) / 2 +
        var(--toss-font-size-22, 22px)
    );
    transform: translateY(0);
    font-size: 22px;
    font-size: var(--toss-font-size-22, 22px);
    font-weight: 500;
    color: $grey500;

    line-height: calc(13px * 2.2);
    line-height: calc(var(--toss-font-size-13) * 2.2);
  }`,
    ]
  },
)

const text_input = tw`
  w-full max-w-full bg-transparent  appearance-none
  p-0 [font-size: inherit] font-medium [line-height: inherit] 
  text-gray-800 caret-blue-400 outline-none  border-b-2  border-gray-200 
  focus:border-b-2 focus:border-blue-400
  dark:text-white

  `

const InputField = styled.input(() => [text_input])

const Text = styled.div(() => [
  text_input,
  tw`w-full [text-align: left]`,
  tw`h-0.5 opacity-0 overflow-hidden [width: unset]`,
])

const BottomLine = styled.span(() => [
  tw`absolute left-0 right-0 bottom-0 [height:2px] [border-radius: 1px]
  bg-gray-100
  `,
])
