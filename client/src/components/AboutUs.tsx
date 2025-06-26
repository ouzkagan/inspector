
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p>
        This Online MCP Inspector is a tool designed to help developers test and debug Model Context Protocol servers.
        Our mission is to provide a free, easy-to-use tool that requires no installation and runs directly in your browser.
      </p>
      <p className="mt-4">
        This project is a fork of an open-source project, and we are committed to keeping it free and accessible to everyone.
      </p>
    </div>
  );
};

export default AboutUs;
