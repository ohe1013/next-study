import React from 'react'

import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import programmer from '../public/char/programming.json'

export default function Programmer() {
  return (
    <Lottie
      loop
      animationData={programmer}
      play
      style={{ width: 500, height: 500 }}
    />
  )
}
