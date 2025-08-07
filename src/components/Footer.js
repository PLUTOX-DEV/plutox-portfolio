'use client';
import React from 'react';
import {
  FaGithub,
  FaTwitter,
  FaEnvelope,
} from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white py-6 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-zinc-700">
      <div className="text-sm text-zinc-400">&copy; {year} Plutox. All rights reserved.</div>

      <div className="flex gap-6 text-zinc-400">
        <a
          href="https://github.com/PLUTOX-DEV"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-purple-400 transition"
        >
          <FaGithub size={20} />
        </a>

        <a
          href="https://x.com/Plutoxofweb3"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:text-purple-400 transition"
        >
          <FaTwitter size={20} />
        </a>

        <a
          href="okeniyihakeem18@gmail.com"
          aria-label="Email"
          className="hover:text-purple-400 transition"
        >
          <FaEnvelope size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
