
import React from "react";
import PageLayout from '../PageLayout';

const AboutThisSite: React.FC = () => {
  return (
    <PageLayout title="About This Site: The Online MCP Inspector">
      <p className="mb-4">
        Welcome to the Online MCP Inspector, a developer tool designed for testing and debugging MCP (Model Context Protocol) servers. This project is a fork of the official <strong>@modelcontextprotocol/inspector</strong>, adapted to provide a seamless, web-first experience.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Why Use This Version?</h2>
      <p className="mb-4">Our goal is to provide the most accessible and hassle-free inspector for the MCP community. Key benefits include:</p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Zero Installation:</strong> Access the full power of the inspector from any device with a modern web browser. No need to install anything locally.</li>
        <li className="mb-2"><strong>Always Up-to-Date:</strong> As a web-based tool, you are always using the latest version without needing to manually update packages.</li>
        <li className="mb-2"><strong>Perfect for Quick Tests:</strong> Quickly check an MCP endpoint without having to spin up a local inspector instance.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-4">Core Architecture</h2>
      <p className="mb-4">The inspector operates with two primary components working in tandem:</p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Inspector Client (MCPI):</b> The interactive React-based web interface you are using right now.</li>
        <li className="mb-2"><strong>Proxy Server (MCPP):</strong> A Node.js server that bridges this web UI to any MCP server via various transport methods like stdio, SSE, or streamable-http.</li>
      </ul>

      <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Ready to get started?</h3>
        <p className="mb-3">Jump right in and start debugging your MCP server with our tool.</p>
        <a href="/" className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">Launch the MCP Inspector</a>
      </div>

    </PageLayout>
  );
};

export default AboutThisSite;
