
import React from "react";
import { Link } from "react-router-dom";

const HowToUseInspector: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">How to Use the MCP Inspector: A Testing Tool for MCP Servers</h1>
      <p className="text-sm text-muted-foreground mb-6">Published on June 26, 2025</p>

      <p className="mb-4">The MCP Inspector is an indispensable tool for developers working with the Model Context Protocol. It provides a visual interface to test, debug, and understand the capabilities of your MCP servers. This guide will walk you through the essential steps to get started.</p>

      <h2 className="text-2xl font-bold mt-6 mb-4">1. Launching Your MCP Server</h2>
      <p className="mb-4">Before you can use the inspector, you need to have an MCP server running. If you're developing a server, you'll typically launch it from your command line. For example:</p>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm mb-4">
        <code>
          # Example: Launching a Python MCP server<br />
          python my_mcp_server.py<br />
          <br />
          # Example: Launching a Node.js MCP server<br />
          node build/index.js
        </code>
      </pre>
      <p className="mb-4">Ensure your server is accessible at a known address and port (e.g., `http://localhost:3000` for SSE, or a local process for stdio).</p>

      <h2 className="text-2xl font-bold mt-6 mb-4">2. Connecting to Your MCP Server</h2>
      <p className="mb-4">Open the <Link to="/" className="text-blue-500 hover:underline">Online MCP Inspector</Link> in your browser. On the left sidebar, you'll find the connection settings.</p>
      <p className="mb-4">[**Screenshot Placeholder:** Image of the inspector's sidebar with connection settings highlighted]</p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Transport Type:</strong> Select how your inspector will communicate with your MCP server.</li>
        <li className="mb-2"><strong>Command/SSE URL:</strong> Depending on your transport type, enter the command to run your server (for `stdio`) or the URL of your server's SSE endpoint (for `sse` or `streamable-http`).</li>
        <li className="mb-2"><strong>Connect:</strong> Click the "Connect" button to establish a connection.</li>
      </ul>

      <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-800 dark:text-blue-200">
        <h3 className="font-bold text-lg mb-2">Pro Tip: Understanding Transport Types</h3>
        <ul className="list-disc list-inside pl-4">
          <li className="mb-1"><strong>STDIO (Standard Input/Output):</strong> Ideal for local development. The inspector directly runs your server as a child process and communicates via its standard input and output streams.</li>
          <li className="mb-1"><strong>SSE (Server-Sent Events) / Streamable HTTP:</strong> Used for remote servers or when your server exposes an HTTP endpoint for MCP communication. You provide a URL to connect to.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-6 mb-4">3. Exploring Server Capabilities (Resources, Prompts, Tools)</h2>
      <p className="mb-4">Once connected, the main area of the inspector will display tabs corresponding to your server's capabilities. The MCP Inspector allows you to interact with Resources, Prompts, and Tools.</p>

      <h3 className="text-xl font-bold mt-4 mb-2">Resources Tab</h3>
      <p className="mb-4">Browse and read the resources exposed by your MCP server. This is useful for understanding the data and information your model can access.</p>
      <p className="mb-4">[**Screenshot Placeholder:** Image of the Resources tab with a list of resources and content displayed]</p>

      <h3 className="text-xl font-bold mt-4 mb-2">Prompts Tab</h3>
      <p className="mb-4">Interact with the prompts defined by your server. You can provide input and see how the server processes and responds to different prompts.</p>
      <p className="mb-4">[**Screenshot Placeholder:** Image of the Prompts tab with an example prompt interaction]</p>

      <h3 className="text-xl font-bold mt-4 mb-2">Tools Tab</h3>
      <p className="mb-4">Call the tools exposed by your MCP server. This is crucial for testing the functionality that your AI model will leverage.</p>
      <p className="mb-4">[**Screenshot Placeholder:** Image of the Tools tab with a tool selected, parameters entered, and result displayed]</p>
      <p className="mb-4">Enter the required parameters for a tool and click "Call Tool" to see the response. The inspector will display the output, including any errors.</p>

      <h2 className="text-2xl font-bold mt-6 mb-4">4. Debugging and Monitoring</h2>
      <p className="mb-4">The bottom pane of the inspector provides a real-time view of your interactions and server notifications. This is invaluable for debugging:</p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Request History:</strong> Review all requests sent to and responses received from your server.</li>
        <li className="mb-2"><strong>Server Notifications:</strong> See any logs or messages sent by your MCP server.</li>
      </ul>
      <p className="mb-4">For more detailed troubleshooting, refer to our guide on <Link to="/articles/debugging-errors" className="text-blue-500 hover:underline">Debugging Common MCP Server Errors</Link>.</p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Conclusion</h2>
      <p className="mb-4">The MCP Inspector simplifies the process of developing and testing MCP servers. By providing a clear, interactive interface, it helps you ensure your server is behaving as expected. Happy inspecting!</p>
    </div>
  );
};

export default HowToUseInspector;
