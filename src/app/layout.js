// app/layout.js

import './globals.css';
import { Orbitron } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import { Toaster } from 'react-hot-toast';

// Load Google Font
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-orbitron',
});

// Metadata including favicon
export const metadata = {
  title: 'Plutox Portfolio',
  description: 'Web3, AI, and UX Portfolio by Plutox',
  icons: {
    icon: '/android-icon-36x36.png', // Make sure this file is in your /public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${orbitron.variable}`}>
      <body className="bg-[#0a0a23] text-white font-sans relative">
        {/* Global Sidebar for all pages */}
        <Sidebar />

        {/* Main content with left padding for sidebar */}
        <main className="lg:ml-16">
          {children}
        </main>

        {/* Toast notifications */}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
