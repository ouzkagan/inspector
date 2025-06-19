import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export function SEOHead({
  title = "Online MCP Inspector - Free Model Context Protocol Testing Tool",
  description = "Free online MCP Inspector for testing and debugging Model Context Protocol servers. No installation required - test MCP tools, resources, and prompts directly in your browser.",
  keywords = "MCP inspector online, Model Context Protocol testing, free MCP debugger, online protocol inspector, MCP server testing, AI development tools, browser MCP client",
  ogTitle,
  ogDescription,
  ogImage = "https://onlinemcpinspector.com/og-image.jpeg",
  canonicalUrl = "https://onlinemcpinspector.com",
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(
        `meta[name="${name}"]`,
      ) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.name = name;
        document.head.appendChild(element);
      }
      element.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let element = document.querySelector(
        `meta[property="${property}"]`,
      ) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("property", property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Update basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Update Open Graph tags
    updatePropertyTag("og:title", ogTitle || title);
    updatePropertyTag("og:description", ogDescription || description);
    updatePropertyTag("og:image", ogImage);
    updatePropertyTag("og:url", canonicalUrl);

    // Update Twitter tags
    updatePropertyTag("twitter:title", ogTitle || title);
    updatePropertyTag("twitter:description", ogDescription || description);
    updatePropertyTag("twitter:image", ogImage);
    updatePropertyTag("twitter:url", canonicalUrl);

    // Update canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonicalUrl,
  ]);

  return null;
}

export default SEOHead;
