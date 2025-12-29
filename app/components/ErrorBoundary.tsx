'use client';

import React from 'react';

type Props = {
  children: React.ReactNode;
  fallback?: (error: Error, retry: () => void) => React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!, this.handleRetry) ?? (
          <div className="p-4 text-red-500">
            Something went wrong
          </div>
        )
      );
    }

    return this.props.children;
  }
}
