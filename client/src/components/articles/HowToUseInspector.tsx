
import React from 'react';

const HowToUseInspector: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">How to Use the MCP Inspector</h2>
      <p>
        The MCP Inspector is a powerful tool for testing and debugging MCP servers. Here's a quick guide to get you started:
      </p>
      <ol className="list-decimal list-inside mt-4">
        <li className="mb-2"><strong>Connect to a server:</strong> Use the sidebar to connect to your MCP server. You can connect to a local server using stdio, or a remote server using SSE.</li>
        <li className="mb-2"><strong>Explore resources:</strong> Once connected, you can use the "Resources" tab to browse the resources provided by the server.</li>
        <li className="mb-2"><strong>Interact with prompts:</strong> The "Prompts" tab allows you to send prompts to the model and view the responses.</li>
        <li className="mb-2"><strong>Call tools:</strong> The "Tools" tab lets you call the tools provided by the server and see the results.</li>
      </ol>
    </div>
  );
};

export default HowToUseInspector;
