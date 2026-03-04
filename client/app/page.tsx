'use client';
import React, { useState } from 'react';

export default function Home(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const testUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}`;
    try {
      const res = await fetch(testUrl);
      const data = await res.json();
      setResponse(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setResponse({ error: err.message });
      } else {
        setResponse({ error: 'Unexpected error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="card" style={{ padding: '1.2rem', marginBottom: '1rem' }}>
        {/*<span className="pill">Application Task Validator</span>*/}
        <h1 style={{ fontSize: '2rem', margin: '0.8rem 0 0.5rem 0' }}>Webhook API Tester</h1>
        <p className="muted" style={{ marginTop: 0 }}>
          Submit your deployed webhook URL and email to validate the response contract.
        </p>
        {/*
        <div className="mono" style={{ fontSize: '0.82rem', color: '#0f172a' }}>
          Expected payload: {`POST {"data":"example"}`} <br />
          Expected response: {`{"word":["a","e","e","l","m","p","x"]}`}
        </div>
          */}
      </section>

      <section className="card" style={{ padding: '1.2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.95rem' }}>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
              Email
            </label>
            <input
              id="email"
              className="input"
              type="email"
              placeholder="address@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="url" style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>
              API Endpoint URL
            </label>
            <input
              id="url"
              className="input mono"
              type="url"
              placeholder="https://your-domain.com/api/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />            
          </div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Validating...' : 'Validate Endpoint'}
          </button>
        </form>

        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ marginBottom: '0.5rem' }}>Validation Response</h3>
          <pre>{response ? JSON.stringify(response, null, 2) : 'No response yet.'}</pre>
        </div>
      </section>
    </main>
  );
}
