import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userData: {
    email: string;
    isPremium: boolean;
    daysUntilExpiry: number;
  } | null;
}

export const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ open, onOpenChange, userData }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Close dialog
    onOpenChange(false);
    
    // Redirect to landing page and refresh
    navigate('/');
    window.location.reload();
  };

  return (
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
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="fixed right-4 top-20 z-[101] w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                      <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {userData?.email || 'User'}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {userData?.isPremium ? (
                          <>
                            <Crown className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Premium Member
                            </span>
                          </>
                        ) : (
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Free Member
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {userData?.isPremium && (
                    <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                      <div className="text-sm text-indigo-600 dark:text-indigo-400">
                        Subscription Status
                      </div>
                      <div className="mt-1 text-lg font-semibold text-indigo-900 dark:text-indigo-300">
                        {userData.daysUntilExpiry} days remaining
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}; 