
import React from 'react';
import { Link } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="w-full bg-card border-b border-border p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary hover:text-primary-foreground transition-colors">
          MCP Inspector
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors">
                Guides
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
