
import React from "react";
import { Link } from "react-router-dom";

const DebuggingErrors: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Debugging Common MCP Server Errors</h1>
      <p className="text-sm text-muted-foreground mb-6">Published on June 26, 2025</p>

      <p className="mb-4">Developing and integrating with MCP servers can sometimes lead to unexpected issues. The MCP Inspector is your primary tool for diagnosing these problems. Here are some common errors you might encounter and how to debug them effectively.</p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Connection Errors</h2>
      <p className="mb-4">One of the first hurdles can be establishing a connection to your MCP server. If the inspector can't connect, check the following:</p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Server Not Running:</strong> Ensure your MCP server process is actually active.</li>
        <li className="mb-2"><strong>Incorrect Address/Port:</strong> Double-check the `sseUrl` or `command` in the inspector's sidebar. A common error message might be: <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">Error: connect ECONNREFUSED 127.0.0.1:XXXX</code>. This means the inspector tried to connect but nothing was listening at that address and port.</li>
        <li className="mb-2"><strong>Firewall Issues:</strong> Your firewall might be blocking the connection.</li>
        <li className="mb-2"><strong>Incorrect Transport Type:</strong> Make sure the selected transport type (STDIO, SSE, Streamable HTTP) matches how your server is configured to communicate.</li>
      </ul>
      <p className="mb-4"><strong>Debugging Tip:</strong> Check your server's console output for any startup errors. For `stdio` connections, ensure the command you provide in the inspector is exactly what you'd use to run your server from the terminal.</p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Invalid Responses / Protocol Errors</h2>
      <p className="mb-4">Your server might be running, but the inspector reports errors when trying to list resources, prompts, or tools, or when calling them. This often indicates a problem with the server's MCP implementation or the data it's sending.</p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Malformed JSON:</strong> The server might be sending invalid JSON. The inspector expects valid JSON responses for MCP messages.</li>
        <li className="mb-2"><strong>Incorrect Schema:</strong> The server's response might be valid JSON but doesn't conform to the expected MCP schema for the method called.</li>
        <li className="mb-2"><strong>Unexpected Data Types:</strong> For example, a tool might return a string when the schema expects an integer.</li>
      </ul>
      <p className="mb-4"><strong>Debugging Tip:</strong> Use the inspector's <strong>History</strong> tab to view the raw request and response payloads. This allows you to see exactly what your server is sending back. Compare it against the <a href="https://modelcontextprotocol.io/docs/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MCP specification</a> to identify discrepancies.</p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Tool Execution Errors</h2>
      <p className="mb-4">When you call a tool, you might receive an error message in the tool result pane. These errors typically originate from your MCP server's implementation of the tool.</p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Missing/Invalid Parameters:</strong> You might be calling the tool with incorrect or missing arguments. The inspector will often highlight these if the server provides good error messages.</li>
        <li className="mb-2"><strong>Internal Server Logic Errors:</strong> The tool's underlying code on your server might have a bug, leading to an unhandled exception.</li>
        <li className="mb-2"><strong>External Service Failure:</strong> If your tool relies on an external API, that service might be down or returning an error.</li>
      </ul>
      <p className="mb-4"><strong>Debugging Tip:</strong> The inspector will display the error message returned by your server. Pay close attention to this message. If it's generic, you'll need to examine your server's logs for more detailed stack traces or error information. Ensure your tool implementations handle edge cases and validate input.</p>

      <h2 className="text-2xl font-bold mt-6 mb-4">General Debugging Strategies with the Inspector</h2>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Monitor Notifications:</strong> The inspector's notification pane (bottom right) often displays server-side logs and warnings, which can provide clues.</li>
        <li className="mb-2"><strong>Check Server Logs:</strong> Always have your MCP server's console or log files open. The most detailed error information will often be found there.</li>
        <li className="mb-2"><strong>Simplify and Isolate:</strong> If you're debugging a complex interaction, try to isolate the problem. Can you call a simpler tool? Can you list resources successfully?</li>
      </ul>

      <p className="mb-4">By systematically checking these areas and leveraging the inspector's features, you can efficiently identify and resolve issues in your MCP server implementations. For a general overview of how to use the inspector, see our <Link to="/articles/how-to-use-inspector" className="text-blue-500 hover:underline">How to Use the MCP Inspector</Link> guide.</p>
    </div>
  );
};

export default DebuggingErrors;
