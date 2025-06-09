import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { SignUpDialog } from './SignUpDialog';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: () => void;
}

export const LoginDialog: React.FC<LoginDialogProps> = ({ open, onOpenChange, onLogin }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('https://7cvccltb-3300.inc1.devtunnels.ms/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify({
        isPremium: data.isPremium,
        expiresAt: data.expiresAt
      }));

      toast.success(data.message || 'Login successful!');
      onLogin();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    onOpenChange(false);
    setShowSignUp(true);
  };

  return (
    <>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <AnimatePresence>
            {open && (
              <>
                <Dialog.Overlay>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100]"
                  />
                </Dialog.Overlay>
                <Dialog.Content>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                  >
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-800">
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <Dialog.Title className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back
                          </Dialog.Title>
                          <Dialog.Description className="text-gray-600 dark:text-gray-400">
                            Please sign in to continue
                          </Dialog.Description>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                              <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                                required
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="remember"
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <Label htmlFor="remember" className='text-black'>Remember me</Label>
                            </div>
                            <button
                              type="button"
                              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                            >
                              Forgot password?
                            </button>
                          </div>

                          <div className="flex gap-4 pt-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => onOpenChange(false)}
                              className="flex-1 relative overflow-hidden group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-800 text-gray-700 dark:text-gray-200 font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(156,163,175,0.3)] hover:scale-[1.02] border border-gray-200 dark:border-gray-700"
                            >
                              <span className="relative z-10">Cancel</span>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>
                            <Button
                              type="submit"
                              className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none relative overflow-hidden group"
                              disabled={isLoading}
                            >
                              <span className="relative z-10 flex items-center justify-center">
                                {isLoading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Logging in...
                                  </>
                                ) : (
                                  'Log in'
                                )}
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </Button>
                          </div>
                        </form>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                              Don't have an account?
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-2 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] group"
                          onClick={handleSignUpClick}
                        >
                          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-700 group-hover:to-purple-700 transition-all duration-300">
                            Sign up
                          </span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </Dialog.Content>
              </>
            )}
          </AnimatePresence>
        </Dialog.Portal>
      </Dialog.Root>

      <SignUpDialog
        open={showSignUp}
        onOpenChange={setShowSignUp}
        onSignUp={() => {
          setShowSignUp(false);
          onLogin();
        }}
      />
    </>
  );
}; 