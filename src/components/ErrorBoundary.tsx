import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button, Result } from 'antd'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle="Sorry, an error occurred while rendering this page."
          extra={[
            <Button 
              type="primary" 
              key="retry"
              onClick={() => this.setState({ hasError: false })}
              onKeyDown={(e) => e.key === 'Enter' && this.setState({ hasError: false })}
              className="bg-blue-500"
              tabIndex={0}
              aria-label="Try again to load the application"
            >
              Try Again
            </Button>
          ]}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
