"use client";
import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import YamlOutput from "@/components/YamlOutput";


export default function Home() {
  const [yaml, setYaml] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (prompt: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setYaml(data.yaml);
    } catch (error) {
      console.error("Error generating YAML:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--color-bg)'}}>
      {/* Header */}
      <header className="bg-white border-b" style={{borderColor: 'var(--color-border)'}}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: 'var(--color-primary)'}}>
              </div>
              <div>
                <h1 className="text-3xl font-bold" style={{color: 'var(--color-text)'}}>
                  Flow Generator
                </h1>
                <h1 className="text-sm" style={{color: 'var(--color-muted)'}}>Generate Digital ACE flows by AI</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Input Section */}
          <div>
            <div className="bg-white rounded-lg border p-8" style={{borderColor: 'var(--color-border)', boxShadow: 'var(--shadow)'}}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-3 flex items-center space-x-2" style={{color: 'var(--color-text)'}}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: 'var(--color-primary)'}}>
                  </div>
                  <span>Describe Your Flow</span>
                </h2>
                <p className="text-sm leading-relaxed" style={{color: 'var(--color-muted)'}}>
                  Tell us what you want your API flow to do, and we'll generate the YAML configuration for you.
                </p>
              </div>
              <ChatInput onSubmit={handleGenerate} loading={loading} />
            </div>
          </div>

          {/* Output Section */}
          <div>
            <div className="bg-white rounded-lg border p-8" style={{borderColor: 'var(--color-border)', boxShadow: 'var(--shadow)'}}>
              <YamlOutput yaml={yaml} loading={loading} />
            </div>
          </div>

         
        </div>
      </main>
    </div>
  );
}
