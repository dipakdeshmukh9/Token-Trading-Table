// app/components/ErrorBoundary.tsx
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!, this.handleRetry) || (
          <div className="flex min-h-screen items-center justify-center bg-[#0b0e11]">
            <div className="max-w-md rounded-lg border border-white/10 bg-white/5 p-6 text-center">
              <h2 className="mb-4 text-xl font-semibold text-white">
                Something went wrong
              </h2>
              <p className="mb-4 text-sm text-white/60">
                {this.state.error?.message || 'An unexpected error occurred'}
              </p>
              <button
                onClick={this.handleRetry}
                className="rounded-lg bg-[#22c55e] px-4 py-2 text-sm font-medium text-white hover:bg-[#22c55e]/90"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}