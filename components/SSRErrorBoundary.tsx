import { Component, ErrorInfo } from "react";
import { renderToString } from "react-dom/server";

interface Props {
  children: JSX.Element;
  fallback: () => JSX.Element;
  logger: (error: Error, errorInfo?: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
}

class SSRErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.logger(error, errorInfo);
  }

  render(): JSX.Element {
    const { fallback, children } = this.props;

    if (typeof window === "undefined") {
      return this.serverRender();
    } else {
      if (this.state.hasError) return fallback();
      return children;
    }
  }

  serverRender(): JSX.Element {
    const { fallback, children, logger } = this.props;
    try {
      renderToString(children);
      return children;
    } catch (e: any) {
      logger(e);
      return fallback();
    }
  }
}

export default SSRErrorBoundary;
