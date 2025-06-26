
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p>
        If you have any questions, feedback, or suggestions, please feel free to reach out to us.
      </p>
      <p className="mt-4">
        You can contact us by email at: <a href="mailto:contact@onlinemcpinspector.com" className="text-blue-500">contact@onlinemcpinspector.com</a>
      </p>
    </div>
  );
};

export default Contact;
