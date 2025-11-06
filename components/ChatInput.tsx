"use client";
import { useState } from "react";
import Button from "./Button";

interface Props {
  onSubmit: (prompt: string) => void;
  loading?: boolean;
}

export default function ChatInput({ onSubmit, loading }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSubmit(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative">
        <textarea
          className="w-full p-4 rounded-lg resize-none focus:outline-none"
          style={{
            border: `1px solid var(--color-border)`,
            backgroundColor: 'var(--color-step-bg)',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-family)',
            fontSize: '0.9rem',
            width: '300%',
            height: '128px',
            maxWidth: '100%'
          }}
          placeholder="Describe your flow in detail...

Examples:
• Fetch user data from Salesforce CRM and send a weekly email report
• Process payment through Stripe and update product inventory
• Validate contact form data and store it in PostgreSQL database"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px var(--color-primary)'}
          onBlur={(e) => e.target.style.boxShadow = 'none'}
        />
        <div className="absolute bottom-3 right-3 flex items-center space-x-2">
          <div className="text-xs" style={{color: 'var(--color-muted)'}}>
            {input.length}/500
          </div>
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={loading || !input.trim()}
        variant="primary"
        size="lg"
        loading={loading}
        className="w-full"
      >
        {loading ? "Generating Flow..." : "Generate YAML Flow"}
      </Button>
    
    </form>
  );
}
