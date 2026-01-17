'use client';

import Link from 'next/link';
import React from 'react';

export default function Home() {
  const cards = [
    {
      title: 'Knowledge Network',
      description: 'Visualize the complex web of literary and philosophical connections in 3D.',
      href: '/network',
      color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', // Blue
    },
    {
      title: 'Chronological Timeline',
      description: 'Explore the history of literature through an interactive timeline.',
      href: '/timeline',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', // Violet
    },
    {
      title: 'Library Editor',
      description: 'Manage books, authors, and relationships. (Requires Google Sheets)',
      href: '/network/edit',
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Emerald
    }
  ];

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      background: 'radial-gradient(circle at 50% 0%, #1e293b 0%, #0f1115 70%)'
    }}>
      <div className="fade-in" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{
          fontSize: '4rem',
          fontWeight: '800',
          marginBottom: '1rem',
          background: 'linear-gradient(to right, #fff, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.1
        }}>
          Book Network
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Mapping the intellectual landscape of literature and philosophy.
        </p>
      </div>

      <div className="fade-in" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        width: '100%',
        animationDelay: '0.2s'
      }}>
        {cards.map((card) => (
          <Link href={card.href} key={card.title} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '16px',
              padding: '2rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              border: '1px solid rgba(255,255,255,0.05)',
              cursor: 'pointer'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              }}
            >
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#fff'
                }}>
                  {card.title}
                </h2>
                <p style={{
                  color: 'var(--text-secondary)',
                  marginBottom: '2rem',
                  lineHeight: 1.5
                }}>
                  {card.description}
                </p>
              </div>
              <div style={{
                height: '4px',
                width: '40px',
                borderRadius: '2px',
                background: card.color
              }} />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
