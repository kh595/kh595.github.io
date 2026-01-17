import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Book Network',
  description: 'Visualizing connections in literature and philosophy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
