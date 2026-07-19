import { Component, ReactNode } from 'react'

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <pre className="max-w-full overflow-auto whitespace-pre-wrap p-6 text-xs text-red-400">
          {this.state.error.message}
          {'\n'}
          {this.state.error.stack}
        </pre>
      )
    }
    return this.props.children
  }
}
