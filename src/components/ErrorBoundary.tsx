"use client";

import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('UI Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[40vh] flex items-center justify-center p-8 text-center">
          <div>
            <h2 className="heading-3 mb-3">Bir şeyler ters gitti</h2>
            <p className="body-text text-gray-600">Sayfayı yenilemeyi deneyin.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}


