
import React from 'react';
import { Link } from 'react-router-dom';

const Guides: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Guides</h2>
      <ul className="list-disc list-inside">
        <li><Link to="/articles/what-is-mcp" className="text-blue-500">What is the Model Context Protocol?</Link></li>
        <li><Link to="/articles/how-to-use-inspector" className="text-blue-500">How to Use the MCP Inspector</Link></li>
        <li><Link to="/articles/debugging-errors" className="text-blue-500">Debugging Common MCP Server Errors</Link></li>
      </ul>
    </div>
  );
};

export default Guides;
