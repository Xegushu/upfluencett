import React from 'react'
import './loader.css'

interface LoaderProps {
  isLoading?: boolean
}

const Loader: React.FC<LoaderProps> = ({ isLoading = true }) => {
  return (
    isLoading && (
        <div className="loader">
          <div className="bounce"></div>
        </div>
    )
  )
}

export default Loader
