import React from 'react'

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-300">
      <div className="bg-white block m-auto p-4 rounded-md shadow-md">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-r-4 "></div>
        <p className="mt-2 text-center text-gray-700">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingModal
