import React from "react";
import PageLayout from "./PageLayout";

const Contact: React.FC = () => {
  return (
    <PageLayout title="Contact Us">
      <p className="mb-4">
        We value your feedback, questions, and suggestions. Your input helps us
        improve the Online MCP Inspector and better serve the developer
        community. Please feel free to reach out to us through the following
        channels:
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Email Support</h2>
      <p className="mb-4">
        For general inquiries, technical support, or partnership opportunities,
        you can send us an email at:
      </p>
      <p className="mb-4 text-lg font-semibold">
        <a
          href="mailto:contact@onlinemcpinspector.com"
          className="text-blue-500 hover:underline"
        >
          contact@onlinemcpinspector.com
        </a>
      </p>
      <p className="mb-4">
        Alternatively, you can send us a message directly using our contact
        form:
      </p>
      <p className="mb-4">
        <a
          href="https://form.jotform.com/251951851681059"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Open Contact Form
        </a>
      </p>
      <p className="mb-4">
        We strive to respond to all emails within 24-48 business hours.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Community & Feedback</h2>
      <p className="mb-4">
        Join our community to discuss features, report bugs, or share your
        experiences with the Online MCP Inspector. While we don't have a
        dedicated forum or Discord channel yet, we encourage you to engage with
        the open-source project on GitHub:
      </p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2">
          <strong>GitHub Issues:</strong> For bug reports or feature requests,
          please open an issue on our{" "}
          <a
            href="https://github.com/your-repo/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub repository
          </a>
          .
        </li>
        <li className="mb-2">
          <strong>GitHub Discussions:</strong> For broader discussions or
          questions, check out our{" "}
          <a
            href="https://github.com/your-repo/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            GitHub Discussions
          </a>{" "}
          section.
        </li>
      </ul>

      <p className="mb-4">
        Your contributions and engagement are highly appreciated and help us
        make the Online MCP Inspector even better!
      </p>
    </PageLayout>
  );
};

export default Contact;
