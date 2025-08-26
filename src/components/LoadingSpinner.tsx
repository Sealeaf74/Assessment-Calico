import { Spin } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large'
  tip?: string
  fullScreen?: boolean
}

export const LoadingSpinner = ({ 
  size = 'default', 
  tip = 'Loading...', 
  fullScreen = false 
}: LoadingSpinnerProps) => {
  const containerClass = fullScreen 
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50' 
    : 'flex justify-center items-center min-h-[200px]'

  return (
    <div className={containerClass}>
      <Spin 
        size={size}
        tip={tip}
        indicator={
          <FontAwesomeIcon 
            icon={faSpinner} 
            className="text-blue-500 text-2xl animate-spin" 
          />
        }
      />
    </div>
  )
}
