"use client";

import React, { ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

/**
 * Error boundary component for catching React component errors
 * Logs errors for debugging and provides recovery mechanisms
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
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      retryCount: 0,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging
    console.error("ErrorBoundary caught:", error);
    console.error("Error Info:", errorInfo.componentStack);
    
    // Call optional error handler
    this.props.onError?.(error);

    // Report to monitoring service if available
    if (typeof window !== "undefined" && window.navigator) {
      // Could send to Sentry, LogRocket, etc.
    }
  }

  handleRetry = () => {
    const newRetryCount = this.state.retryCount + 1;
    
    // Limit retries to prevent infinite loops
    if (newRetryCount > 3) {
      console.error("Max retries exceeded");
      return;
    }

    this.setState((prev) => ({
      hasError: false,
      error: null,
      retryCount: newRetryCount,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!, this.handleRetry) || (
          <div className="h-screen bg-[#0b0e11] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              {/* Error Card */}
              <div className="rounded-lg border border-red-500/30 bg-red-500/8 backdrop-blur p-6">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <AlertTriangle
                    className="text-red-400"
                    size={48}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title & Message */}
                <h2 className="text-lg font-semibold text-white text-center mb-2">
                  Something went wrong
                </h2>
                <p className="text-sm text-white/60 text-center mb-4">
                  An error occurred while rendering this component. Please try again.
                </p>

                {/* Error Details (Dev Only) */}
                {process.env.NODE_ENV === "development" && (
                  <details className="mb-4 p-3 rounded bg-white/5 border border-white/10">
                    <summary className="text-xs text-white/50 font-mono cursor-pointer hover:text-white/70 mb-2">
                      Error Details
                    </summary>
                    <pre className="text-xs text-red-400 overflow-auto max-h-32 font-mono">
                      {this.state.error?.message}
                      {"\n"}
                      {this.state.error?.stack}
                    </pre>
                  </details>
                )}

                {/* Retry Count */}
                {this.state.retryCount > 0 && (
                  <p className="text-xs text-white/40 text-center mb-4">
                    Retry attempt: {this.state.retryCount}/3
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-3 flex-col sm:flex-row">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => window.location.reload()}
                    className="gap-2"
                  >
                    <RefreshCw size={16} />
                    Reload Page
                  </Button>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={this.handleRetry}
                    disabled={this.state.retryCount >= 3}
                    className="gap-2"
                  >
                    <RefreshCw size={16} />
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

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
