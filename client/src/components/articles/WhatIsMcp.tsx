
import React from 'react';

const WhatIsMcp: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">What is the Model Context Protocol?</h2>
      <p>
        The Model Context Protocol (MCP) is a specification for how AI models and development tools can communicate with each other.
        It provides a standardized way for tools to provide context to models, and for models to request actions from tools.
      </p>
      <p className="mt-4">
        This allows for a rich ecosystem of AI-powered applications where models can interact with a variety of tools in a consistent way.
        For example, a coding assistant could use MCP to interact with a user's code editor, a debugger, and a terminal, all through a single, unified protocol.
      </p>
    </div>
  );
};

export default WhatIsMcp;
