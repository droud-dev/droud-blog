import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Droud blog',
  description: 'Droudtastic writing stuff',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 dark:bg-slate-950">{children}</body>
    </html>
  );
}