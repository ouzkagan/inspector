import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy for Online MCP Inspector</h1>
      <p className="mb-4">
        This Privacy Policy outlines how Online MCP Inspector collects, uses, maintains, and discloses information collected from users (each, a "User") of the <a href="https://onlinemcpinspector.com" className="text-blue-500 hover:underline">onlinemcpinspector.com</a> website ("Site"). This policy applies to the Site and all products and services offered by Online MCP Inspector.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Personal Identification Information</h2>
      <p className="mb-4">
        We do not collect any personal identification information from our Users. The Online MCP Inspector is designed to be a privacy-first tool. All data entered into the inspector for testing and debugging MCP servers is processed locally within your web browser and is not transmitted to, stored on, or processed by our servers. This means your sensitive protocol data remains entirely on your device.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Non-Personal Identification Information</h2>
      <p className="mb-4">
        We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer, and technical information about Users' means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Web Browser Cookies</h2>
      <p className="mb-4">
        Our Site may use "cookies" to enhance User experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent. If you do so, note that some parts of the Site may not function properly.
      </p>
      <p className="mb-4">
        Specifically, we use cookies for:
      </p>
      <ul className="list-disc list-inside mb-4 pl-4">
        <li className="mb-2"><strong>Essential Site Functionality:</strong> To ensure the proper operation of the inspector tool and its features.</li>
        <li className="mb-2"><strong>Google AdSense:</strong> As a third-party vendor, Google uses cookies to serve ads on our Site. Google's use of the DART cookie enables it to serve ads to Users based on their visit to our Site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network Privacy Policy at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://policies.google.com/technologies/ads</a>.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-4">How We Use Collected Information</h2>
      <p className="mb-4">
        Online MCP Inspector does not directly collect or store personal information. Any non-personal information collected is used solely to understand how our Users as a group use the services and resources provided on our Site. This helps us improve our Site and enhance the user experience.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Third-Party Websites</h2>
      <p className="mb-4">
        Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website's own terms and policies.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Advertising</h2>
      <p className="mb-4">
        Ads appearing on our site may be delivered to Users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile non personal identification information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This privacy policy does not cover the use of cookies by any advertisers.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Changes to This Privacy Policy</h2>
      <p className="mb-4">
        Online MCP Inspector has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Your Acceptance of These Terms</h2>
      <p className="mb-4">
        By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">Contacting Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
      </p>
      <p className="mb-4 text-lg font-semibold">
        <a href="mailto:contact@onlinemcpinspector.com" className="text-blue-500 hover:underline">contact@onlinemcpinspector.com</a>
      </p>

      <p className="text-sm text-muted-foreground mt-8">This document was last updated on June 26, 2025.</p>
    </div>
  );
};

export default PrivacyPolicy;