import { PropsWithChildren, useId } from 'react'
import tw, { styled } from 'twin.macro'

type Button = {
  buttonType?: 'primary' | 'danger' | 'light' | 'dark'
  style?: 'fill' | 'outline' | 'weak' | 'flat'
  display?: 'inline' | 'block' | 'full'
  size?: 'big' | 'medium' | 'small'

  className?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  disabled?: boolean
}

type Props = PropsWithChildren<Button>

export function Button(props: Props) {
  const {
    buttonType = 'primary',
    style = 'fill',
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
      {...rest}
      size={'big'}
    >
      <SpanField>{children}</SpanField>
      <span css={tw`flex items-center content-center box-border`}></span>
    </ButtonField>
  )
}

const ButtonField = styled.button<Button>(({ disabled, size, buttonType }) => {
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

    buttonType === 'primary' && tw`bg-blue-500`, // Add more type-specific styles

    disabled && tw`opacity-25 cursor-not-allowed`,
  ]
})

const SpanField = styled.span(() => [
  tw`flex items-center content-center box-border`,
  tw`max-h-14 h-14 [min-width: 96px] p-4`,
])

// export default Example;
