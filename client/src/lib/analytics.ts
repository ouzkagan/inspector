// Analytics utility functions for tracking user interactions

export interface TrackingParameters {
  label?: string;
  value?: number;
  [key: string]: unknown;
}

// Usage tracking for tool interactions
export const trackEvent = (
  eventName: string,
  parameters?: TrackingParameters,
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      event_category: "MCP Inspector",
      event_label: parameters?.label || "",
      value: parameters?.value || 0,
      ...parameters,
    });
  }
};

// Track tool usage
export const trackToolUsage = (toolName: string, method: string) => {
  trackEvent("tool_usage", {
    tool_name: toolName,
    method: method,
    event_label: `${toolName} - ${method}`,
  });
};

// Track server connections
export const trackServerConnection = (transport: string, success: boolean) => {
  trackEvent("server_connection", {
    transport_type: transport,
    success: success,
    event_label: `${transport} - ${success ? "success" : "failure"}`,
  });
};

// Track page views for SPA
export const trackPageView = (page: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "GA_MEASUREMENT_ID", {
      page_title: title || document.title,
      page_location: window.location.href,
      page_path: page,
    });
  }
};

// Track search queries
export const trackSearch = (
  searchTerm: string,
  category: "tools" | "resources" | "prompts",
) => {
  trackEvent("search", {
    search_term: searchTerm,
    category: category,
    event_label: `${category} - ${searchTerm}`,
  });
};

// Track errors
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent("error", {
    error_type: errorType,
    error_message: errorMessage,
    event_label: `${errorType} - ${errorMessage}`,
  });
};
