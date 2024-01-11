import { ComponentProps } from 'react'
import { Button } from './Button'
import tw from 'twin.macro'
import { css } from '@emotion/react'

export const BottomCTA = (props: ComponentProps<typeof Button>) => {
  return (
    <>
      <div css={tw`h-20`}>
        <div css={tw`fixed left-0 bottom-0 w-full`}>
          <div
            css={[
              css`
                padding: 0 20px 18px;
              `,
            ]}
          >
            <Button {...props} />
          </div>
        </div>
      </div>
    </>
  )
}
