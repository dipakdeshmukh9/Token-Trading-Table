"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!, this.reset) || (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-3">
            <h2 className="text-lg font-semibold text-red-500">
              Something went wrong
            </h2>
            <button
              onClick={this.reset}
              className="rounded bg-blue-600 px-4 py-2 text-white"
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
