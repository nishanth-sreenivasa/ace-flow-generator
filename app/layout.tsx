import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ACE Flow Generator - AI-Powered YAML Configuration",
  description: "Generate ACE API flows from natural language descriptions using advanced AI. Transform your ideas into executable configurations instantly.",
  keywords: ["YAML", "API", "Flow", "Generator", "AI", "GPT", "Configuration", "Automation", "ACE"],
  authors: [{ name: "Flow Generator Team" }],
  creator: "Flow Generator",
  publisher: "Flow Generator",
  openGraph: {
    title: "ACE Flow Generator",
    description: "Generate YAML API flows from natural language descriptions using AI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ACE Flow Generator",
    description: "Generate YAML API flows from natural language descriptions using AI",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
