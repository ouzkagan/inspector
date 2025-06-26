import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">About Us: Online MCP Inspector</h1>
      <p className="mb-4">
        Welcome to the Online MCP Inspector, a dedicated platform designed to empower developers in testing and debugging Model Context Protocol (MCP) servers. Our mission is to provide a free, intuitive, and highly accessible tool that requires no installation, running seamlessly directly within your web browser.
      </p>
      <p className="mb-4">
        This project is a proud fork of the open-source <a href="https://github.com/modelcontextprotocol/inspector" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Model Context Protocol Inspector</a>. We are committed to upholding the open-source spirit by continuously improving this tool and ensuring it remains free and accessible to the global developer community.
      </p>
      <h2 className="text-2xl font-bold mt-6 mb-4">Our Vision</h2>
      <p className="mb-4">
        In the rapidly evolving landscape of AI and protocol development, we envision a world where testing and debugging complex interactions between AI models and tools is straightforward and efficient. The Online MCP Inspector aims to be the go-to resource for developers, from beginners exploring MCP to seasoned professionals fine-tuning their server implementations.
      </p>
      <h2 className="text-2xl font-bold mt-6 mb-4">What We Offer</h2>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Browser-Based Convenience:</strong> Test your MCP servers from any device, anywhere, without the hassle of local setups.</li>
        <li className="mb-2"><strong>Comprehensive Debugging:</strong> Gain insights into your server's behavior, inspect requests and responses, and troubleshoot issues effectively.</li>
        <li className="mb-2"><strong>Community-Driven:</strong> As an open-source project, we encourage contributions and feedback from the community to shape the future of the inspector.</li>
      </ul>
      <p className="mb-4">
        We are a dedicated team of developers passionate about the Model Context Protocol and committed to providing high-quality tools that simplify the development process. Your feedback and support are invaluable as we continue to evolve and enhance the Online MCP Inspector.
      </p>
    </div>
  );
};

export default AboutUs;