'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Auto-redirect if already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin-auth');
    if (isAuthenticated) {
      router.replace('/admin');
    }
  }, [router]);

  // Real login with backend
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem('admin-auth', 'true');
        setError('');
        router.push('/admin');
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please check your server.');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <Image
        src="/dev.jpg"
        alt="Admin Background"
        fill
        className="object-cover opacity-20"
        priority
      />

      {/* Glassmorphic Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md p-8 glass-card rounded-2xl border border-neon-purple shadow-neon"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className="text-3xl font-bold text-center neon-text glitch mb-8"
            data-text="Admin Login"
          >
            Admin Login
          </h1>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label className="text-sm text-neon-blue">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full mt-1 px-4 py-2 bg-black/40 text-white border border-neon-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple transition-all"
              />
            </div>

            <div>
              <label className="text-sm text-neon-blue">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 bg-black/40 text-white border border-neon-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple transition-all"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full bg-neon-purple text-white font-bold py-2 px-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/30"
              type="submit"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Not real?{' '}
            <Link href="/" className="underline hover:text-neon-purple">
              Go back
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
