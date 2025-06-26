
import React from "react";

const McpInspectorToolsGuide: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">A Developer's Guide to MCP Inspector Tools</h1>
      <p className="text-sm text-muted-foreground mb-6">Published on June 26, 2025</p>

      <p className="mb-4">The Model Context Protocol (MCP) is transforming how AI models interact with developer tools. As the ecosystem matures, a variety of powerful inspectors have emerged to help developers test and debug their MCP servers. This guide highlights the top MCP inspector tools available today.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">1. The Online MCP Inspector (This Site)</h2>
      <div className="border-l-4 border-blue-500 pl-4 mb-6">
        <p className="font-semibold">A hassle-free, web-based inspector perfect for quick tests and developers who prefer a no-install solution.</p>
      </div>
      <p className="mb-4">The Online MCP Inspector provides a stable, accessible version of the official tool directly in your browser. It's an excellent choice for getting started quickly or for situations where you can't install software locally.</p>
      <h3 className="text-lg font-bold mt-4 mb-2">Key Features:</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li><strong>Zero Installation:</strong> Access the inspector from any device with a web browser.</li>
        <li><strong>Familiar UI:</strong> Based on the official inspector, providing a consistent and familiar user experience.</li>
        <li><strong>Core Functionality:</strong> Supports all essential MCP features, including Tools, Resources, and Prompts.</li>
      </ul>
      <a href="/" className="text-blue-500 font-semibold hover:underline">Launch the Online MCP Inspector →</a>

      <h2 className="text-2xl font-bold mt-8 mb-4">2. MCPJam Inspector</h2>
      <div className="border-l-4 border-green-500 pl-4 mb-6">
        <p className="font-semibold">A feature-rich, community-driven inspector with enhanced debugging and real LLM integration.</p>
      </div>
      <p className="mb-4">For developers seeking more advanced features, the MCPJam Inspector is a leading community alternative. It's designed for a faster development cycle and includes several quality-of-life improvements.</p>
      <h3 className="text-lg font-bold mt-4 mb-2">Key Features:</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li><strong>LLM Tool Interaction:</strong> Test your server against a real LLM directly within the tool.</li>
        <li><strong>Enhanced Debugging:</strong> Improved logging and UI to streamline the debugging process.</li>
        <li><strong>Docker Support:</strong> Easily run the inspector in a containerized environment.</li>
      </ul>
      <a href="https://github.com/MCPJam/inspector" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold hover:underline">Visit the MCPJam Inspector GitHub →</a>

      <h2 className="text-2xl font-bold mt-8 mb-4">3. Muppet Kit</h2>
      <div className="border-l-4 border-purple-500 pl-4 mb-6">
        <p className="font-semibold">A comprehensive suite of tools for advanced testing, including security scanning and performance tracing.</p>
      </div>
      <p className="mb-4">Muppet Kit expands on the idea of an inspector by offering a collection of specialized tools. It's ideal for developers who need to perform in-depth analysis of their MCP servers.</p>
      <h3 className="text-lg font-bold mt-4 mb-2">Key Features:</h3>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li><strong>MCP Scan:</strong> Scan your server for common vulnerabilities and security issues.</li>
        <li><strong>Playground:</strong> Test your server with different LLMs and configurations.</li>
        <li><strong>Tracing:</strong> Trace requests and responses, with support for tunneling to remote clients.</li>
      </ul>
      <a href="https://github.com/muppet-dev/kit" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold hover:underline">Visit the Muppet Kit GitHub →</a>

    </div>
  );
};

export default McpInspectorToolsGuide;
