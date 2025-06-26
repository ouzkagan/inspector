import React from "react";
import PageLayout from '../PageLayout';

const MuppetKitSpotlight: React.FC = () => {
  return (
    <PageLayout title="Muppet Kit: A New Collection of MCP Tools">
      <p className="mb-4">The MCP ecosystem continues to flourish with new and innovative tools from the developer community. <strong>Muppet Kit</strong> is another noteworthy project, offering a suite of tools designed for testing and debugging MCP servers.</p>

      <p className="mb-4">Inspired by the official MCP Inspector, Muppet Kit aims to provide a comprehensive toolkit for developers, deployable with a single command or via Cloudflare.</p>

      <h2 className="text-2xl font-bold mt-6 mb-4">A Multi-Tool Inspector</h2>
      <p className="mb-4">Muppet Kit is more than just an inspector; it's a collection of specialized tools, each targeting a different aspect of the development and testing workflow:</p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Explorer:</strong> Explore an MCP server's capabilities with AI-powered assistance.</li>
        <li className="mb-2"><strong>Playground:</b> Test your server with various LLMs and configurations.</li>
        <li className="mb-2"><strong>MCP Scan:</strong> A dedicated tool for scanning your MCP server for vulnerabilities and security issues.</li>
        <li className="mb-2"><strong>Tracing:</strong> Trace requests and responses between client and server, with support for tunneling to remote clients.</li>
        <li className="mb-2"><strong>History:</strong> A session-based history of all requests and responses.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-4">Configuration and Extensibility</h2>
      <p className="mb-4">Muppet Kit allows for project-specific configuration via a `muppet.config.js` file, where developers can define models (e.g., from OpenAI) and set up tunneling services like ngrok.</p>

      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm mb-4">
        <code>
          import &#123; defineInspectorConfig &#125; from "muppet-kit";<br />
          import &#123; ngrok &#125; from "muppet-kit/tunnel";<br />
          import &#123; openai &#125; from "@ai-sdk/openai";<br />
          <br />
          export default defineInspectorConfig(&#123;<br />
          &nbsp;&nbsp;models: [openai("gpt-4.1-nano")],<br />
          &nbsp;&nbsp;tunneling: ngrok(),<br />
          &#125;);
        </code>
      </pre>

      <h2 className="text-2xl font-bold mt-6 mb-4">A Growing Community Effort</h2>
      <p className="mb-4">Like other community tools, Muppet Kit demonstrates the collaborative spirit of the MCP ecosystem. By building on the ideas of the original inspector and adding new capabilities like security scanning and a dedicated playground, it provides developers with more powerful and specialized tools for building robust MCP applications.</p>
    </PageLayout>
  );
};

export default MuppetKitSpotlight;