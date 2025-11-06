"use client";
import { useState } from "react";
import Button from "./Button";

interface Props {
  yaml: string;
  loading?: boolean;
}

export default function YamlOutput({ yaml, loading }: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(yaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadYaml = () => {
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow-config.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simple YAML syntax highlighting
  const highlightYaml = (text: string) => {
    return text
      .replace(/^(\s*)([\w-]+)(\s*:\s*)/gm, '$1<span class="text-blue-400 font-medium">$2</span>$3')
      .replace(/:\s*([^\n\r]+)/g, ': <span class="text-green-400">$1</span>')
      .replace(/^(\s*-\s*)/gm, '<span class="text-yellow-400">$1</span>')
      .replace(/(#[^\n\r]*)/g, '<span class="text-gray-500 italic">$1</span>');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold" style={{color: 'var(--color-text)'}}>Generated YAML</h2>
          {yaml && (
            <div className="flex items-center space-x-1 text-sm px-2 py-1 rounded-full" style={{color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)'}}>
              <span>Ready</span>
            </div>
          )}
        </div>
        
        {yaml && (
          <div className="flex items-center space-x-2">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="w-full"
              style={{
                borderColor: 'var(--color-border)',
                color: copied ? 'var(--color-primary)' : 'var(--color-text)'
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
            
            <Button
              onClick={downloadYaml}
              variant="secondary"
              size="sm"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)'
              }}
            >
              Download
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 relative">
        {loading ? (
          <div className="h-full border-2 border-dashed rounded-lg p-6 flex items-center justify-center" style={{borderColor: 'var(--color-border)', backgroundColor: 'var(--color-step-bg)'}}>
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-t-transparent rounded-full mx-auto mb-4" style={{borderColor: 'var(--color-primary)', animation: 'spin 1s linear infinite'}}></div>
              <p className="text-lg" style={{color: 'var(--color-text)'}}>Generating your ACE flow...</p>
              <p className="text-sm mt-2" style={{color: 'var(--color-muted)'}}>This may take a few moments</p>
            </div>
          </div>
        ) : yaml ? (
          <pre className="h-full p-6 rounded-lg overflow-auto whitespace-pre-wrap font-mono text-sm leading-relaxed border" style={{backgroundColor: '#2d2d2d', color: '#f8f8f2', borderColor: 'var(--color-border)'}}>
            <div dangerouslySetInnerHTML={{ __html: highlightYaml(yaml) }} />
          </pre>
        ) : (
          <div className="h-full border-2 border-dashed rounded-lg flex items-center justify-center" style={{borderColor: 'var(--color-border)', backgroundColor: 'var(--color-step-bg)'}}>
            <div className="text-center" style={{color: 'var(--color-muted)'}}>
              <h3 className="text-lg font-medium mb-2" style={{color: 'var(--color-text)'}}>No ACE Flow Generated Yet</h3>
              <p className="text-sm max-w-sm">
                Describe your ACE flow in the input area to generate a flow configuration.
              </p>
            </div>
          </div>
        )}
        
        {/* File info */}
        {yaml && (
          <div className="absolute bottom-4 left-6 text-xs px-2 py-1 rounded" style={{color: 'var(--color-muted)', backgroundColor: 'rgba(0,0,0,0.8)'}}>
            {yaml.split('\n').length} lines • {new Blob([yaml]).size} bytes
          </div>
        )}
      </div>
    </div>
  );
}
