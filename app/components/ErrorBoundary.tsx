"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: (error: Error, reset: () => void) => React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!, this.handleRetry) ?? (
          <div className="p-4 text-red-500">
            <h2>Something went wrong.</h2>
            <button
              onClick={this.handleRetry}
              className="mt-2 rounded bg-black px-3 py-1 text-white"
            >
              Retry
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
