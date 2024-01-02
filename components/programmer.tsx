import React, { memo } from 'react'

import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import programmer from '../public/char/programming.json'
const Programmer = memo(() => {
  return (
    <Lottie
      loop
      animationData={programmer}
      play
      style={{ width: 500, height: 500 }}
    />
  )
})
Programmer.displayName = 'Programmer'

export default Programmer
