import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as Label from '@radix-ui/react-label';
import * as Toast from '@radix-ui/react-toast';
import { motion } from 'framer-motion';

export function Login() {
  const { login, error } = useAuth();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      console.error('Login failed:', err);
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-nunito">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950" />
      
      {/* Subtle animated orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-slate-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50 relative z-10"
      >
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-slate-600 dark:from-blue-400 dark:to-slate-400 bg-clip-text text-transparent tracking-tight font-nunito"
          >
            Welcome back
          </motion.h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 font-nunito">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Toast.Provider>
            {error && (
              <Toast.Root
                className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-3 rounded-xl text-base shadow-lg border border-red-200 dark:border-red-800"
                open={open}
                onOpenChange={setOpen}
              >
                <Toast.Title className="font-semibold">{error}</Toast.Title>
                <Toast.Close className="absolute top-2 right-2 text-red-400 hover:text-red-600 dark:hover:text-red-300" />
              </Toast.Root>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label.Root
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Email address
                </Label.Root>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none relative block w-full pl-12 px-4 py-3 text-base border border-slate-300 dark:border-slate-700 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label.Root
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Password
                </Label.Root>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none relative block w-full pl-12 pr-12 px-4 py-3 text-base border border-slate-300 dark:border-slate-700 placeholder-slate-500 dark:placeholder-slate-400 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <Label.Root
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-700 dark:text-slate-300"
                >
                  Remember me
                </Label.Root>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                'Sign in'
              )}
            </motion.button>
          </Toast.Provider>
        </form>
      </motion.div>
    </div>
  );
} 