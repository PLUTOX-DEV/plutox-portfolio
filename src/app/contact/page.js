'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { sendContactEmail } from '@/utils/contact';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      return;
    }

    setStatus('sending');

    try {
      await sendContactEmail(form);
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setForm({ name: '', email: '', message: '' });
      }, 2000);
    } catch (error) {
      console.error('❌ Contact error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="min-h-screen px-6 sm:px-12 md:px-24 py-20 text-white relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl font-bold text-purple-400 mb-2">Contact Me</h2>
        <p className="text-zinc-300 max-w-xl mx-auto">
          Let's build something futuristic together.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence>
          {status !== 'success' ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className={`space-y-6 glass-card p-6 rounded-xl border border-purple-500/30 shadow-lg ${
                status === 'error' ? 'animate-shake' : ''
              }`}
            >
              {['name', 'email', 'message'].map((field, i) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <label className="text-sm text-purple-300 capitalize">{field}</label>
                  {field !== 'message' ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={form[field]}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      placeholder={field === 'name' ? 'Your Name' : 'you@example.com'}
                      className="w-full bg-zinc-900 border border-purple-600 focus:ring-2 focus:ring-purple-500/70 rounded-lg px-4 py-3 outline-none placeholder:text-purple-300 text-sm transition-all duration-300"
                    />
                  ) : (
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full bg-zinc-900 border border-purple-600 focus:ring-2 focus:ring-purple-500/70 rounded-lg px-4 py-3 outline-none placeholder:text-purple-300 text-sm transition-all duration-300"
                    />
                  )}
                </motion.div>
              ))}

              {/* Submit Button */}
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={status === 'sending'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full relative overflow-hidden flex items-center justify-center gap-2 py-3 px-6 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ${
                  status === 'sending'
                    ? 'bg-purple-700 animate-glow'
                    : 'bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800'
                }`}
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                      <FiSend className="text-lg" />
                    </motion.div>
                    Sending...
                  </>
                ) : status === 'error' ? (
                  <>
                    <FiAlertCircle className="text-red-400" />
                    Please fill all fields
                  </>
                ) : (
                  <>
                    <FiSend className="text-lg" />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center py-12 rounded-xl bg-gradient-to-br from-purple-900/40 to-purple-600/10 border border-purple-500/30"
            >
              <FiCheckCircle className="text-4xl text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-300">Message Sent!</h3>
              <p className="text-zinc-400 mt-2">I'll get back to you soon. 🚀</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-glow {
          animation: pulse-glow 1.2s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0px #a855f7;
          }
          50% {
            box-shadow: 0 0 12px #a855f7;
          }
          100% {
            box-shadow: 0 0 0px #a855f7;
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-6px);
          }
          50% {
            transform: translateX(6px);
          }
          75% {
            transform: translateX(-4px);
          }
        }
      `}</style>
    </section>
  );
}
