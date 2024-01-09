import { css } from '@emotion/react'
import { PropsWithChildren, useId } from 'react'
import tw, { styled } from 'twin.macro'

type Button = {
  type?: 'primary' | 'danger' | 'light' | 'dark'
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
    type = 'primary',
    style = 'fill',
    display = 'inline',
    disabled,
    className,
    children,
    ...rest
  } = props
  const buttonId = useId()
  return (
    <StyleButton id={buttonId} type={type} size={'big'}>
      <span css={tw`flex items-center content-center box-border`}>
        {children}
      </span>
    </StyleButton>
  )

  {
    /* return <button css={tw``} id={buttonId}></button> */
  }
}

// import tw, { styled } from 'twin.macro';

// // Define your color variables here, e.g., $blue500 becomes blue500
const blue500 = 'blue-500' // Replace with actual Tailwind color

// // For mixins like hover-active, we'll use JavaScript to handle the logic
// const hoverActive = ({ hover, active }) => `
//   ${hover && tw`hover:(...yourStyles)`}
//   ${active && tw`active:(...yourStyles)`}
// `

const StyleButton = styled.button<Button>(({ disabled, size, type }) => {
  return [
    // Basic button styles
    tw`inline-flex items-center justify-center relative 
    font-bold antialiased whitespace-nowrap select-none border-0
     bg-transparent transition-all overflow-hidden transform p-0 
     hover:no-underline 
     focus:no-underline focus:outline-0
     not-disabled:cursor-pointer not-disabled:bg-none 
     after:content-[' '] after:absolute after:top-0 after:right-0 
     after:bottom-0 after:left-0 after:bg-transparent 

     `,

    // Size styles
    size === 'big' && tw`w-full rounded-[16px]`, // Add more size-specific styles

    // Type styles
    type === 'primary' && tw`bg-blue-500`, // Add more type-specific styles

    // Disabled state
    disabled && tw`opacity-25 cursor-not-allowed`,

    // Custom hover and active states
    // hoverActive({
    //   hover: !disabled,
    //   active: !disabled,
    //   // Add styles for hover and active states
    // }),

    // Other button specific styles
    // ...
  ]
})

// export default Example;
