"use client";

import React, { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component for catching React component errors
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error);
    this.props.onError?.(error);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!, this.handleRetry) || (
          <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg border border-red-500/20 bg-red-500/5">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div className="text-center">
              <h3 className="text-sm font-semibold text-red-400 mb-1">
                Something went wrong
              </h3>
              <p className="text-xs text-red-400/70 mb-4">
                {this.state.error?.message || "An error occurred"}
              </p>
            </div>
            <Button size="sm" variant="danger" onClick={this.handleRetry}>
              Try Again
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
