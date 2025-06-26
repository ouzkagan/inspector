import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from './PageLayout';

const Guides: React.FC = () => {
  return (
    <PageLayout title="Guides & Articles">
      <p className="mb-6 text-center text-lg text-muted-foreground">
        Explore our collection of guides and articles to help you understand and work with the Model Context Protocol and its tools.
      </p>
      <ul className="list-disc list-inside space-y-3 text-lg">
        <li><Link to="/articles/mcp-inspector-tools-guide" className="text-blue-500 hover:underline">A Developer's Guide to MCP Inspector Tools</Link></li>
        <li><Link to="/articles/about-this-site" className="text-blue-500 hover:underline">About This Site: The Online MCP Inspector</Link></li>
        <li><Link to="/articles/what-is-mcp" className="text-blue-500 hover:underline">What is the Model Context Protocol?</Link></li>
        <li><Link to="/articles/how-to-use-inspector" className="text-blue-500 hover:underline">How to Use the MCP Inspector</Link></li>
        <li><Link to="/articles/debugging-errors" className="text-blue-500 hover:underline">Debugging Common MCP Server Errors</Link></li>
      </ul>
    </PageLayout>
  );
};

export default Guides;