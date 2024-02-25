import { PropsWithChildren, useId } from 'react'
import tw, { TwStyle, styled } from 'twin.macro'

type Button = {
  buttonType?: 'primary' | 'danger' | 'light' | 'dark'
  buttonStyle?: 'fill' | 'outline' | 'addone' | 'weak' | 'flat'
  display?: 'inline' | 'block' | 'full'
  size?: 'big' | 'medium' | 'small'

  className?: string | TwStyle
  onClick?: React.MouseEventHandler<HTMLElement>
  disabled?: boolean
}

type Props = PropsWithChildren<Button>

export function Button(props: Props) {
  const {
    buttonType = 'primary',
    buttonStyle = 'fill',
    display = 'inline',
    disabled,
    className,
    children,
    ...rest
  } = props
  const buttonId = useId()
  return (
    <ButtonField
      id={buttonId}
      buttonType={buttonType}
      disabled={disabled}
      buttonStyle={buttonStyle}
      {...rest}
      size={'big'}
      css={className}
    >
      <SpanField>{children}</SpanField>
      {/* <span css={tw`flex items-center content-center box-border`}></span> */}
    </ButtonField>
  )
}
const ButtonField = styled.button<Button>(
  ({ disabled, size, buttonType, buttonStyle, css }) => {
    return [
      // Basic button styles
      tw`inline-flex items-center justify-center relative 
    font-bold antialiased whitespace-nowrap select-none border-0
     bg-transparent transition-all overflow-hidden transform p-0 
     text-white
     hover:no-underline 
     focus:no-underline focus:outline-0
     not-disabled:cursor-pointer not-disabled:bg-none 
     after:content-[' '] after:absolute after:top-0 after:right-0 
     after:bottom-0 after:left-0 after:bg-transparent  
     `,
      size === 'big' && tw`w-full rounded-[16px]`, // Add more size-specific styles

      buttonType === 'primary' && tw`bg-primary active:bg-blue-600 `,
      buttonStyle === 'weak' && tw`bg-blue-50 text-primary active:bg-blue-100`,
      buttonStyle === 'addone' &&
        tw`
      w-20 h-12 my-auto 
     `,
      disabled && tw`opacity-25 cursor-not-allowed`,
      css && css,
    ]
  },
)

const SpanField = styled.span(() => [
  tw`flex items-center justify-center box-border`,
  tw`max-h-14 h-14 [min-width: 96px] p-4 `,
])

// export default Example;
