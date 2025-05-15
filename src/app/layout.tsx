import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Droud blog',
  description: 'Droudtastic writing stuff',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}