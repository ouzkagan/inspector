import {
  ClientRequest,
  CompatibilityCallToolResult,
  CompatibilityCallToolResultSchema,
  CreateMessageResult,
  EmptyResultSchema,
  GetPromptResultSchema,
  ListPromptsResultSchema,
  ListResourcesResultSchema,
  ListResourceTemplatesResultSchema,
  ListToolsResultSchema,
  ReadResourceResultSchema,
  Resource,
  ResourceTemplate,
  Root,
  ServerNotification,
  Tool,
  LoggingLevel,
} from "@modelcontextprotocol/sdk/types.js";
import { OAuthTokensSchema } from "@modelcontextprotocol/sdk/shared/auth.js";
import { SESSION_KEYS, getServerSpecificKey } from "./lib/constants";
import { AuthDebuggerState, EMPTY_DEBUGGER_STATE } from "./lib/auth-types";
import { OAuthStateMachine } from "./lib/oauth-state-machine";
import { cacheToolOutputSchemas } from "./utils/schemaUtils";
// SEO and Analytics imports
import SEOHead from "./components/SEOHead";
import { GoogleAds } from "./components/Analytics";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import { AdSenseAd } from "./components/AdSense";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useConnection } from "./lib/hooks/useConnection";
import {
  useDraggablePane,
  useDraggableSidebar,
} from "./lib/hooks/useDraggablePane";
import { StdErrNotification } from "./lib/notificationTypes";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Files,
  FolderTree,
  Hammer,
  Hash,
  Info,
  Key,
  Menu,
  MessageSquare,
  MoreHorizontal,
  X,
} from "lucide-react";

import { z } from "zod";
import "./App.css";
import AuthDebugger from "./components/AuthDebugger";
import ConsoleTab from "./components/ConsoleTab";
import HistoryAndNotifications from "./components/History";
import PingTab from "./components/PingTab";
import PromptsTab, { Prompt } from "./components/PromptsTab";
import ResourcesTab from "./components/ResourcesTab";
import RootsTab from "./components/RootsTab";
import SamplingTab, { PendingRequest } from "./components/SamplingTab";
import Sidebar from "./components/Sidebar";
import ToolsTab from "./components/ToolsTab";
import { InspectorConfig } from "./lib/configurationTypes";
import {
  getMCPProxyAddress,
  getMCPProxyAuthToken,
  getInitialSseUrl,
  getInitialTransportType,
  getInitialCommand,
  getInitialArgs,
  initializeInspectorConfig,
  saveInspectorConfig,
} from "./utils/configUtils";

const CONFIG_LOCAL_STORAGE_KEY = "inspectorConfig_v1";

const App = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [resourceTemplates, setResourceTemplates] = useState<
    ResourceTemplate[]
  >([]);
  const [resourceContent, setResourceContent] = useState<string>("");
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [promptContent, setPromptContent] = useState<string>("");
  const [tools, setTools] = useState<Tool[]>([]);
  const [toolResult, setToolResult] =
    useState<CompatibilityCallToolResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string | null>>({
    resources: null,
    prompts: null,
    tools: null,
  });
  const [command, setCommand] = useState<string>(getInitialCommand);
  const [args, setArgs] = useState<string>(getInitialArgs);

  const [sseUrl, setSseUrl] = useState<string>(getInitialSseUrl);
  const [transportType, setTransportType] = useState<
    "stdio" | "sse" | "streamable-http"
  >(getInitialTransportType);
  const [logLevel, setLogLevel] = useState<LoggingLevel>("debug");
  const [notifications, setNotifications] = useState<ServerNotification[]>([]);
  const [stdErrNotifications, setStdErrNotifications] = useState<
    StdErrNotification[]
  >([]);
  const [roots, setRoots] = useState<Root[]>([]);
  const [env, setEnv] = useState<Record<string, string>>({});

  const [config, setConfig] = useState<InspectorConfig>(() =>
    initializeInspectorConfig(CONFIG_LOCAL_STORAGE_KEY),
  );
  const [bearerToken, setBearerToken] = useState<string>(() => {
    return localStorage.getItem("lastBearerToken") || "";
  });

  const [headerName, setHeaderName] = useState<string>(() => {
    return localStorage.getItem("lastHeaderName") || "";
  });

  const [pendingSampleRequests, setPendingSampleRequests] = useState<
    Array<
      PendingRequest & {
        resolve: (result: CreateMessageResult) => void;
        reject: (error: Error) => void;
      }
    >
  >([]);
  const [isAuthDebuggerVisible, setIsAuthDebuggerVisible] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);

  // Auth debugger state
  const [authState, setAuthState] =
    useState<AuthDebuggerState>(EMPTY_DEBUGGER_STATE);

  // Helper function to update specific auth state properties
  const updateAuthState = (updates: Partial<AuthDebuggerState>) => {
    setAuthState((prev) => ({ ...prev, ...updates }));
  };
  const nextRequestId = useRef(0);
  const rootsRef = useRef<Root[]>([]);

  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const [resourceSubscriptions, setResourceSubscriptions] = useState<
    Set<string>
  >(new Set<string>());

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [nextResourceCursor, setNextResourceCursor] = useState<
    string | undefined
  >();
  const [nextResourceTemplateCursor, setNextResourceTemplateCursor] = useState<
    string | undefined
  >();
  const [nextPromptCursor, setNextPromptCursor] = useState<
    string | undefined
  >();
  const [nextToolCursor, setNextToolCursor] = useState<string | undefined>();
  const progressTokenRef = useRef(0);

  const { height: historyPaneHeight, handleDragStart } = useDraggablePane(300);
  const {
    width: sidebarWidth,
    isDragging: isSidebarDragging,
    handleDragStart: handleSidebarDragStart,
  } = useDraggableSidebar(320);

  const {
    connectionStatus,
    serverCapabilities,
    mcpClient,
    requestHistory,
    makeRequest,
    sendNotification,
    handleCompletion,
    completionsSupported,
    connect: connectMcpServer,
    disconnect: disconnectMcpServer,
  } = useConnection({
    transportType,
    command,
    args,
    sseUrl,
    env,
    bearerToken,
    headerName,
    config,
    onNotification: (notification) => {
      setNotifications((prev) => [...prev, notification as ServerNotification]);
    },
    onStdErrNotification: (notification) => {
      setStdErrNotifications((prev) => [
        ...prev,
        notification as StdErrNotification,
      ]);
    },
    onPendingRequest: (request, resolve, reject) => {
      setPendingSampleRequests((prev) => [
        ...prev,
        { id: nextRequestId.current++, request, resolve, reject },
      ]);
    },
    getRoots: () => rootsRef.current,
  });

  useEffect(() => {
    localStorage.setItem("lastCommand", command);
  }, [command]);

  useEffect(() => {
    localStorage.setItem("lastArgs", args);
  }, [args]);

  useEffect(() => {
    localStorage.setItem("lastSseUrl", sseUrl);
  }, [sseUrl]);

  useEffect(() => {
    localStorage.setItem("lastTransportType", transportType);
  }, [transportType]);

  useEffect(() => {
    localStorage.setItem("lastBearerToken", bearerToken);
  }, [bearerToken]);

  useEffect(() => {
    localStorage.setItem("lastHeaderName", headerName);
  }, [headerName]);

  useEffect(() => {
    saveInspectorConfig(CONFIG_LOCAL_STORAGE_KEY, config);
  }, [config]);

  // Auto-connect to previously saved serverURL after OAuth callback
  const onOAuthConnect = useCallback(
    (serverUrl: string) => {
      setSseUrl(serverUrl);
      setIsAuthDebuggerVisible(false);
      void connectMcpServer();
    },
    [connectMcpServer],
  );

  // Update OAuth debug state during debug callback
  const onOAuthDebugConnect = useCallback(
    async ({
      authorizationCode,
      errorMsg,
      restoredState,
    }: {
      authorizationCode?: string;
      errorMsg?: string;
      restoredState?: AuthDebuggerState;
    }) => {
      setIsAuthDebuggerVisible(true);

      if (errorMsg) {
        updateAuthState({
          latestError: new Error(errorMsg),
        });
        return;
      }

      if (restoredState && authorizationCode) {
        // Restore the previous auth state and continue the OAuth flow
        let currentState: AuthDebuggerState = {
          ...restoredState,
          authorizationCode,
          oauthStep: "token_request",
          isInitiatingAuth: true,
          statusMessage: null,
          latestError: null,
        };

        try {
          // Create a new state machine instance to continue the flow
          const stateMachine = new OAuthStateMachine(sseUrl, (updates) => {
            currentState = { ...currentState, ...updates };
          });

          // Continue stepping through the OAuth flow from where we left off
          while (
            currentState.oauthStep !== "complete" &&
            currentState.oauthStep !== "authorization_code"
          ) {
            await stateMachine.executeStep(currentState);
          }

          if (currentState.oauthStep === "complete") {
            // After the flow completes or reaches a user-input step, update the app state
            updateAuthState({
              ...currentState,
              statusMessage: {
                type: "success",
                message: "Authentication completed successfully",
              },
              isInitiatingAuth: false,
            });
          }
        } catch (error) {
          console.error("OAuth continuation error:", error);
          updateAuthState({
            latestError:
              error instanceof Error ? error : new Error(String(error)),
            statusMessage: {
              type: "error",
              message: `Failed to complete OAuth flow: ${error instanceof Error ? error.message : String(error)}`,
            },
            isInitiatingAuth: false,
          });
        }
      } else if (authorizationCode) {
        // Fallback to the original behavior if no state was restored
        updateAuthState({
          authorizationCode,
          oauthStep: "token_request",
        });
      }
    },
    [sseUrl],
  );

  // Load OAuth tokens when sseUrl changes
  useEffect(() => {
    const loadOAuthTokens = async () => {
      try {
        if (sseUrl) {
          const key = getServerSpecificKey(SESSION_KEYS.TOKENS, sseUrl);
          const tokens = sessionStorage.getItem(key);
          if (tokens) {
            const parsedTokens = await OAuthTokensSchema.parseAsync(
              JSON.parse(tokens),
            );
            updateAuthState({
              oauthTokens: parsedTokens,
              oauthStep: "complete",
            });
          }
        }
      } catch (error) {
        console.error("Error loading OAuth tokens:", error);
      }
    };

    loadOAuthTokens();
  }, [sseUrl]);

  useEffect(() => {
    const headers: HeadersInit = {};
    const { token: proxyAuthToken, header: proxyAuthTokenHeader } =
      getMCPProxyAuthToken(config);
    if (proxyAuthToken) {
      headers[proxyAuthTokenHeader] = `Bearer ${proxyAuthToken}`;
    }

    fetch(`${getMCPProxyAddress(config)}/config`, { headers })
      .then((response) => response.json())
      .then((data) => {
        setEnv(data.defaultEnvironment);
        if (data.defaultCommand) {
          setCommand(data.defaultCommand);
        }
        if (data.defaultArgs) {
          setArgs(data.defaultArgs);
        }
      })
      .catch((error) =>
        console.error("Error fetching default environment:", error),
      );
  }, [config]);

  useEffect(() => {
    rootsRef.current = roots;
  }, [roots]);

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = "resources";
    }
  }, []);

  const handleApproveSampling = (id: number, result: CreateMessageResult) => {
    setPendingSampleRequests((prev) => {
      const request = prev.find((r) => r.id === id);
      request?.resolve(result);
      return prev.filter((r) => r.id !== id);
    });
  };

  const handleRejectSampling = (id: number) => {
    setPendingSampleRequests((prev) => {
      const request = prev.find((r) => r.id === id);
      request?.reject(new Error("Sampling request rejected"));
      return prev.filter((r) => r.id !== id);
    });
  };

  const clearError = (tabKey: keyof typeof errors) => {
    setErrors((prev) => ({ ...prev, [tabKey]: null }));
  };

  const sendMCPRequest = async <T extends z.ZodType>(
    request: ClientRequest,
    schema: T,
    tabKey?: keyof typeof errors,
  ) => {
    try {
      const response = await makeRequest(request, schema);
      if (tabKey !== undefined) {
        clearError(tabKey);
      }
      return response;
    } catch (e) {
      const errorString = (e as Error).message ?? String(e);
      if (tabKey !== undefined) {
        setErrors((prev) => ({
          ...prev,
          [tabKey]: errorString,
        }));
      }
      throw e;
    }
  };

  const listResources = async () => {
    const response = await sendMCPRequest(
      {
        method: "resources/list" as const,
        params: nextResourceCursor ? { cursor: nextResourceCursor } : {},
      },
      ListResourcesResultSchema,
      "resources",
    );
    setResources(resources.concat(response.resources ?? []));
    setNextResourceCursor(response.nextCursor);
  };

  const listResourceTemplates = async () => {
    const response = await sendMCPRequest(
      {
        method: "resources/templates/list" as const,
        params: nextResourceTemplateCursor
          ? { cursor: nextResourceTemplateCursor }
          : {},
      },
      ListResourceTemplatesResultSchema,
      "resources",
    );
    setResourceTemplates(
      resourceTemplates.concat(response.resourceTemplates ?? []),
    );
    setNextResourceTemplateCursor(response.nextCursor);
  };

  const readResource = async (uri: string) => {
    const response = await sendMCPRequest(
      {
        method: "resources/read" as const,
        params: { uri },
      },
      ReadResourceResultSchema,
      "resources",
    );
    setResourceContent(JSON.stringify(response, null, 2));
  };

  const subscribeToResource = async (uri: string) => {
    if (!resourceSubscriptions.has(uri)) {
      await sendMCPRequest(
        {
          method: "resources/subscribe" as const,
          params: { uri },
        },
        z.object({}),
        "resources",
      );
      const clone = new Set(resourceSubscriptions);
      clone.add(uri);
      setResourceSubscriptions(clone);
    }
  };

  const unsubscribeFromResource = async (uri: string) => {
    if (resourceSubscriptions.has(uri)) {
      await sendMCPRequest(
        {
          method: "resources/unsubscribe" as const,
          params: { uri },
        },
        z.object({}),
        "resources",
      );
      const clone = new Set(resourceSubscriptions);
      clone.delete(uri);
      setResourceSubscriptions(clone);
    }
  };

  const listPrompts = async () => {
    const response = await sendMCPRequest(
      {
        method: "prompts/list" as const,
        params: nextPromptCursor ? { cursor: nextPromptCursor } : {},
      },
      ListPromptsResultSchema,
      "prompts",
    );
    setPrompts(response.prompts);
    setNextPromptCursor(response.nextCursor);
  };

  const getPrompt = async (name: string, args: Record<string, string> = {}) => {
    const response = await sendMCPRequest(
      {
        method: "prompts/get" as const,
        params: { name, arguments: args },
      },
      GetPromptResultSchema,
      "prompts",
    );
    setPromptContent(JSON.stringify(response, null, 2));
  };

  const listTools = async () => {
    const response = await sendMCPRequest(
      {
        method: "tools/list" as const,
        params: nextToolCursor ? { cursor: nextToolCursor } : {},
      },
      ListToolsResultSchema,
      "tools",
    );
    setTools(response.tools);
    setNextToolCursor(response.nextCursor);
    // Cache output schemas for validation
    cacheToolOutputSchemas(response.tools);
  };

  const callTool = async (name: string, params: Record<string, unknown>) => {
    try {
      const response = await sendMCPRequest(
        {
          method: "tools/call" as const,
          params: {
            name,
            arguments: params,
            _meta: {
              progressToken: progressTokenRef.current++,
            },
          },
        },
        CompatibilityCallToolResultSchema,
        "tools",
      );
      setToolResult(response);
    } catch (e) {
      const toolResult: CompatibilityCallToolResult = {
        content: [
          {
            type: "text",
            text: (e as Error).message ?? String(e),
          },
        ],
        isError: true,
      };
      setToolResult(toolResult);
    }
  };

  const handleRootsChange = async () => {
    await sendNotification({ method: "notifications/roots/list_changed" });
  };

  const sendLogLevelRequest = async (level: LoggingLevel) => {
    await sendMCPRequest(
      {
        method: "logging/setLevel" as const,
        params: { level },
      },
      z.object({}),
    );
    setLogLevel(level);
  };

  const clearStdErrNotifications = () => {
    setStdErrNotifications([]);
  };

  // Helper component for rendering the AuthDebugger
  const AuthDebuggerWrapper = () => (
    <TabsContent value="auth">
      <AuthDebugger
        serverUrl={sseUrl}
        onBack={() => setIsAuthDebuggerVisible(false)}
        authState={authState}
        updateAuthState={updateAuthState}
      />
    </TabsContent>
  );

  // Helper function to render OAuth callback components
  if (window.location.pathname === "/oauth/callback") {
    const OAuthCallback = React.lazy(
      () => import("./components/OAuthCallback"),
    );
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <OAuthCallback onConnect={onOAuthConnect} />
      </Suspense>
    );
  }

  if (window.location.pathname === "/oauth/callback/debug") {
    const OAuthDebugCallback = React.lazy(
      () => import("./components/OAuthDebugCallback"),
    );
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <OAuthDebugCallback onConnect={onOAuthDebugConnect} />
      </Suspense>
    );
  }

  return (
    <div className="app-container w-full h-screen">
      {/* SEO and Performance Components */}
      <SEOHead />
      <PerformanceOptimizer />

      {/* Google AdSense Script */}
      <GoogleAds adClientId="ca-pub-5649332072305685" />

      <div className="flex h-screen bg-background w-full max-w-none lg:flex">
        {/* Mobile overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <div
          style={{
            width: window.innerWidth >= 1024 ? sidebarWidth : "100%",
            minWidth: window.innerWidth >= 1024 ? 250 : "auto",
            maxWidth: window.innerWidth >= 1024 ? 800 : "none",
            transition: isSidebarDragging ? "none" : "width 0.15s",
          }}
          className={`bg-card border-r border-border flex flex-col h-full relative p-4 
            ${!isMobileSidebarOpen ? "hidden lg:flex" : "flex"} 
            fixed lg:relative z-50 lg:z-auto w-full lg:w-auto`}
        >
          {/* Mobile close button inside sidebar */}
          <div className="lg:hidden flex justify-end mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Sidebar
            connectionStatus={connectionStatus}
            transportType={transportType}
            setTransportType={setTransportType}
            command={command}
            setCommand={setCommand}
            args={args}
            setArgs={setArgs}
            sseUrl={sseUrl}
            setSseUrl={setSseUrl}
            env={env}
            setEnv={setEnv}
            config={config}
            setConfig={setConfig}
            bearerToken={bearerToken}
            setBearerToken={setBearerToken}
            headerName={headerName}
            setHeaderName={setHeaderName}
            onConnect={connectMcpServer}
            onDisconnect={disconnectMcpServer}
            stdErrNotifications={stdErrNotifications}
            logLevel={logLevel}
            sendLogLevelRequest={sendLogLevelRequest}
            loggingSupported={!!serverCapabilities?.logging || false}
            clearStdErrNotifications={clearStdErrNotifications}
          />

          {/* Information Links - Always visible */}
          <div className="p-4 border-t border-border space-y-2">
            <h3 className="text-sm font-semibold mb-2">Information</h3>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("/about", "_blank")}
                className="w-full justify-start text-xs"
              >
                <Info className="h-3 w-3 mr-2" />
                About
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("/guides", "_blank")}
                className="w-full justify-start text-xs"
              >
                <MoreHorizontal className="h-3 w-3 mr-2" />
                Guides
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("/contact", "_blank")}
                className="w-full justify-start text-xs"
              >
                <MessageSquare className="h-3 w-3 mr-2" />
                Contact
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open("/privacy", "_blank")}
                className="w-full justify-start text-xs"
              >
                <Key className="h-3 w-3 mr-2" />
                Privacy
              </Button>
            </div>
          </div>

          <div
            onMouseDown={handleSidebarDragStart}
            style={{
              cursor: "col-resize",
              position: "absolute",
              top: 0,
              right: 0,
              width: 6,
              height: "100%",
              zIndex: 10,
              background: isSidebarDragging
                ? "rgba(0,0,0,0.08)"
                : "transparent",
            }}
            className="hidden lg:block"
            aria-label="Resize sidebar"
            data-testid="sidebar-drag-handle"
          />
        </div>
        <div
          className={`flex-1 flex flex-col overflow-hidden ${!isMobileSidebarOpen ? "flex" : "hidden lg:flex"}`}
        >
          {/* Mobile header with toggle and navigation */}
          <div className="lg:hidden flex items-center justify-between p-3 border-b border-border bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-2"
            >
              {isMobileSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Navigation Tabs */}
            {!isMobileSidebarOpen && mcpClient && (
              <div className="flex gap-1 flex-1 justify-center">
                <Button
                  variant={
                    window.location.hash === "#resources" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => (window.location.hash = "resources")}
                  disabled={!serverCapabilities?.resources}
                  className="p-2"
                >
                  <Files className="h-4 w-4" />
                </Button>
                <Button
                  variant={
                    window.location.hash === "#prompts" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => (window.location.hash = "prompts")}
                  disabled={!serverCapabilities?.prompts}
                  className="p-2"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant={
                    window.location.hash === "#tools" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => (window.location.hash = "tools")}
                  disabled={!serverCapabilities?.tools}
                  className="p-2"
                >
                  <Hammer className="h-4 w-4" />
                </Button>
                <Button
                  variant={
                    window.location.hash === "#ping" ? "default" : "ghost"
                  }
                  size="sm"
                  onClick={() => (window.location.hash = "ping")}
                  className="p-2"
                >
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            )}

            {isMobileSidebarOpen && (
              <h1 className="text-lg font-semibold">MCP Inspector</h1>
            )}
            <div className="w-10"></div>
          </div>

          <div className="flex-1 overflow-auto p-2 lg:p-2">
            {mcpClient ? (
              <Tabs
                defaultValue={
                  Object.keys(serverCapabilities ?? {}).includes(
                    window.location.hash.slice(1),
                  )
                    ? window.location.hash.slice(1)
                    : serverCapabilities?.resources
                      ? "resources"
                      : serverCapabilities?.prompts
                        ? "prompts"
                        : serverCapabilities?.tools
                          ? "tools"
                          : "ping"
                }
                className="w-full h-full"
                onValueChange={(value) => (window.location.hash = value)}
              >
                <TabsList className="mb-2 py-2 px-1 text-sm lg:text-lg w-full flex-wrap lg:flex-nowrap gap-1">
                  <TabsTrigger
                    value="resources"
                    disabled={!serverCapabilities?.resources}
                    className="text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <Files className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Resources</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="prompts"
                    disabled={!serverCapabilities?.prompts}
                    className="text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <MessageSquare className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Prompts</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="tools"
                    disabled={!serverCapabilities?.tools}
                    className="text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <Hammer className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Tools</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="ping"
                    className="text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <Bell className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Ping</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="sampling"
                    className="relative text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <Hash className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Sampling</span>
                    {pendingSampleRequests.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {pendingSampleRequests.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="roots"
                    className="text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <FolderTree className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Roots</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="auth"
                    className="text-xs lg:text-sm px-2 lg:px-3"
                  >
                    <Key className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2" />
                    <span className="hidden sm:inline">Auth</span>
                  </TabsTrigger>
                </TabsList>

                <div className="w-full h-full">
                  {!serverCapabilities?.resources &&
                  !serverCapabilities?.prompts &&
                  !serverCapabilities?.tools ? (
                    <>
                      <div className="flex items-center justify-center p-4">
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                          The connected server does not support any MCP
                          capabilities
                        </p>
                      </div>
                      <PingTab
                        onPingClick={() => {
                          void sendMCPRequest(
                            {
                              method: "ping" as const,
                            },
                            EmptyResultSchema,
                          );
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <ResourcesTab
                        resources={resources}
                        resourceTemplates={resourceTemplates}
                        listResources={() => {
                          clearError("resources");
                          listResources();
                        }}
                        clearResources={() => {
                          setResources([]);
                          setNextResourceCursor(undefined);
                        }}
                        listResourceTemplates={() => {
                          clearError("resources");
                          listResourceTemplates();
                        }}
                        clearResourceTemplates={() => {
                          setResourceTemplates([]);
                          setNextResourceTemplateCursor(undefined);
                        }}
                        readResource={(uri) => {
                          clearError("resources");
                          readResource(uri);
                        }}
                        selectedResource={selectedResource}
                        setSelectedResource={(resource) => {
                          clearError("resources");
                          setSelectedResource(resource);
                        }}
                        resourceSubscriptionsSupported={
                          serverCapabilities?.resources?.subscribe || false
                        }
                        resourceSubscriptions={resourceSubscriptions}
                        subscribeToResource={(uri) => {
                          clearError("resources");
                          subscribeToResource(uri);
                        }}
                        unsubscribeFromResource={(uri) => {
                          clearError("resources");
                          unsubscribeFromResource(uri);
                        }}
                        handleCompletion={handleCompletion}
                        completionsSupported={completionsSupported}
                        resourceContent={resourceContent}
                        nextCursor={nextResourceCursor}
                        nextTemplateCursor={nextResourceTemplateCursor}
                        error={errors.resources}
                      />
                      <PromptsTab
                        prompts={prompts}
                        listPrompts={() => {
                          clearError("prompts");
                          listPrompts();
                        }}
                        clearPrompts={() => {
                          setPrompts([]);
                          setNextPromptCursor(undefined);
                        }}
                        getPrompt={(name, args) => {
                          clearError("prompts");
                          getPrompt(name, args);
                        }}
                        selectedPrompt={selectedPrompt}
                        setSelectedPrompt={(prompt) => {
                          clearError("prompts");
                          setSelectedPrompt(prompt);
                          setPromptContent("");
                        }}
                        handleCompletion={handleCompletion}
                        completionsSupported={completionsSupported}
                        promptContent={promptContent}
                        nextCursor={nextPromptCursor}
                        error={errors.prompts}
                      />
                      <ToolsTab
                        tools={tools}
                        listTools={() => {
                          clearError("tools");
                          listTools();
                        }}
                        clearTools={() => {
                          setTools([]);
                          setNextToolCursor(undefined);
                          // Clear cached output schemas
                          cacheToolOutputSchemas([]);
                        }}
                        callTool={async (name, params) => {
                          clearError("tools");
                          setToolResult(null);
                          await callTool(name, params);
                        }}
                        selectedTool={selectedTool}
                        setSelectedTool={(tool) => {
                          clearError("tools");
                          setSelectedTool(tool);
                          setToolResult(null);
                        }}
                        toolResult={toolResult}
                        nextCursor={nextToolCursor}
                        error={errors.tools}
                      />
                      <ConsoleTab />
                      <PingTab
                        onPingClick={() => {
                          void sendMCPRequest(
                            {
                              method: "ping" as const,
                            },
                            EmptyResultSchema,
                          );
                        }}
                      />
                      <SamplingTab
                        pendingRequests={pendingSampleRequests}
                        onApprove={handleApproveSampling}
                        onReject={handleRejectSampling}
                      />
                      <RootsTab
                        roots={roots}
                        setRoots={setRoots}
                        onRootsChange={handleRootsChange}
                      />
                      <AuthDebuggerWrapper />
                    </>
                  )}
                </div>
              </Tabs>
            ) : isAuthDebuggerVisible ? (
              <Tabs
                defaultValue={"auth"}
                className="w-full h-full"
                onValueChange={(value) => (window.location.hash = value)}
              >
                <AuthDebuggerWrapper />
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <p className="text-lg text-gray-500 dark:text-gray-400">
                  Connect to an MCP server to start inspecting
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    Need to configure authentication?
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAuthDebuggerVisible(true)}
                  >
                    Open Auth Settings
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div
            className="relative border-t border-border hidden lg:block"
            style={{
              height: `${historyPaneHeight}px`,
            }}
          >
            <div
              className="absolute w-full h-4 -top-2 cursor-row-resize flex items-center justify-center hover:bg-accent/50 dark:hover:bg-input/40"
              onMouseDown={handleDragStart}
            >
              <div className="w-8 h-1 rounded-full bg-border" />
            </div>
            <div className="h-full overflow-auto flex flex-col">
              <HistoryAndNotifications
                requestHistory={requestHistory}
                serverNotifications={notifications}
              />

              {/* Footer Ad Zone - Remove padding */}
              <div className="border-t border-border bg-background">
                <AdSenseAd
                  adSlot="6618506909"
                  adFormat="horizontal"
                  style={{ maxHeight: "60px" }}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Move footer outside main layout and reduce padding */}
      <footer className="flex justify-center p-2 border-t border-border bg-background">
        <a
          href="/about"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          About
        </a>
        <a
          href="/contact"
          className="ml-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Contact
        </a>
        <a
          href="/privacy"
          className="ml-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Privacy Policy
        </a>
        <a
          href="/guides"
          className="ml-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Guides
        </a>
      </footer>
    </div>
  );
};

export default App;
