"use client";

import { useState } from "react";
import { buildTabsHTML, type Tab } from "@/lib/tabsGenerator";

export default function HomePage() {
  const [title, setTitle] = useState("My Tabs Demo");
  const [tabs, setTabs] = useState<Tab[]>([
    { title: "Tab 1", content: "<p>Hello from Tab 1</p>" },
    { title: "Tab 2", content: "<p>Welcome to Tab 2</p>" }
  ]);
  const [output, setOutput] = useState("");

  const addTab = () => setTabs(t => [...t, { title: `Tab ${t.length + 1}`, content: "<p>New content</p>" }]);
  const removeTab = (idx: number) => setTabs(t => t.filter((_, i) => i !== idx));

  const generate = () => {
    const html = buildTabsHTML(title, tabs);
    setOutput(html);
  };

  const copyOut = async () => {
    await navigator.clipboard.writeText(output);
    alert("Copied! Paste into a file named Hello.html and open in your browser.");
  };

  return (
    <section aria-labelledby="h1">
      <h1 id="h1">Tabs HTML Generator</h1>
      <p className="card" style={{ marginTop: 8 }}>
        Configure your tabs below. Click <strong>Generate</strong> to produce standalone HTML5 + JS with
        inline CSS (no classes). Copy it into a file named <code>Hello.html</code> and open in your browser.
      </p>

      <div className="card" style={{ display: "grid", gap: 12, marginTop: 12 }}>
        <label>
          <span style={{ display: "block", marginBottom: 4 }}>Title</span>
          <input
            aria-label="Document title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: "100%", padding: 8, border: "1px solid var(--border)", borderRadius: 8 }}
          />
        </label>

        <div>
          <h2 style={{ margin: "8px 0" }}>Tabs</h2>
          {tabs.map((tab, idx) => (
            <fieldset key={idx} aria-label={`Tab ${idx + 1}`} className="card" style={{ marginBottom: 8 }}>
              <legend>Tab {idx + 1}</legend>
              <label>
                <span style={{ display: "block", marginBottom: 4 }}>Tab Title</span>
                <input
                  value={tab.title}
                  onChange={e => {
                    const v = e.target.value;
                    setTabs(t => t.map((tt, i) => (i === idx ? { ...tt, title: v } : tt)));
                  }}
                  style={{ width: "100%", padding: 8, border: "1px solid var(--border)", borderRadius: 8 }}
                />
              </label>
              <label>
                <span style={{ display: "block", margin: "8px 0 4px" }}>Tab Content (HTML allowed)</span>
                <textarea
                  value={tab.content}
                  onChange={e => {
                    const v = e.target.value;
                    setTabs(t => t.map((tt, i) => (i === idx ? { ...tt, content: v } : tt)));
                  }}
                  style={{ width: "100%", height: 120, padding: 8, border: "1px solid var(--border)", borderRadius: 8 }}
                />
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" onClick={() => removeTab(idx)} aria-label={`Remove Tab ${idx + 1}`} style={{ padding: "6px 10px", border: "1px solid var(--border)", borderRadius: 8 }}>Remove</button>
              </div>
            </fieldset>
          ))}
          <button type="button" onClick={addTab} style={{ padding: "8px 12px", border: "1px solid var(--border)", borderRadius: 8 }}>+ Add Tab</button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={generate} style={{ padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 10 }}>Generate</button>
          <button onClick={copyOut} disabled={!output} style={{ padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 10 }}>Copy</button>
        </div>

        <label>
          <span style={{ display: "block", marginBottom: 4 }}>Output (read-only)</span>
          <textarea className="code" readOnly value={output} aria-label="Generated HTML code" />
        </label>
      </div>
    </section>
  );
}
