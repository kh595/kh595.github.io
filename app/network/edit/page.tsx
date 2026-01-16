'use client';

import React from 'react';
import Link from 'next/link';

export default function EditDashboard() {
    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '40px' }}>Network Data Editor</h1>

            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <Link href="/network/edit/nodes" style={{
                    display: 'block',
                    padding: '40px',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '24px',
                    flex: 1
                }}>
                    Edit Nodes (Books)
                </Link>

                <Link href="/network/edit/links" style={{
                    display: 'block',
                    padding: '40px',
                    backgroundColor: '#ff4081',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontSize: '24px',
                    flex: 1
                }}>
                    Edit Links (Connections)
                </Link>
            </div>
        </div>
    );
}
