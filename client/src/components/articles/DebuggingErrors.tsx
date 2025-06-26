
import React from 'react';

const DebuggingErrors: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Debugging Common MCP Server Errors</h2>
      <p>
        When working with MCP servers, you may encounter a few common errors. Here are some tips for debugging them:
      </p>
      <ul className="list-disc list-inside mt-4">
        <li className="mb-2"><strong>Connection errors:</strong> If you're having trouble connecting to your server, double-check the server address and port. If you're using stdio, make sure the command to start your server is correct.</li>
        <li className="mb-2"><strong>Invalid responses:</strong> If you're getting invalid responses from the server, use the inspector to examine the raw JSON responses. This can help you identify any issues with the server's implementation.</li>
        <li className="mb-2"><strong>Tool errors:</strong> If a tool call is failing, check the tool's documentation to ensure you're providing the correct parameters. The inspector will show you the exact error message from the server.</li>
      </ul>
    </div>
  );
};

export default DebuggingErrors;
