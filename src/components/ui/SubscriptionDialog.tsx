import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from './button';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Crown, Users } from 'lucide-react';
import toast from 'react-hot-toast';

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubscribe?: (plan: string) => void;
}

const plans = [
  // {
  //   name: 'Free',
  //   price: '$0',
  //   features: [
  //     '1 resume template',
  //     'Basic AI suggestions',
  //     'PDF export',
  //   ],
  //   icon: <Users className="w-7 h-7 text-indigo-500" />,
  //   color: 'from-gray-700/50 to-gray-600/50',
  //   button: 'Get Started',
  // },
  {
    name: 'Pro',
    price: '₹99',
    features: [
      '10 premium templates',
      'Advanced AI suggestions',
      'All export formats',
      'ATS optimization',
    ],
    icon: <Crown className="w-10 h-10 text-yellow-400 drop-shadow-xl animate-bounce" />,
    color: 'from-black via-gray-900 to-white',
    button: 'Choose Pro',
    popular: true,
  },
  // {
  //   name: 'Enterprise',
  //   price: '$24.99',
  //   features: [
  //     'All Pro features',
  //     '20+ premium templates',
  //     'Priority support',
  //     'Multiple resume profiles',
  //   ],
  //   icon: <Crown className="w-7 h-7 text-amber-500" />,
  //   color: 'from-emerald-500/80 to-teal-500/80',
  //   button: 'Choose Enterprise',
  // },
];

const RAZORPAY_KEY_ID = 'rzp_test_EZUuxiOqrDJuQ4';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const ForwardedAnimatePresence = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof AnimatePresence>>(
  (props, ref) => <AnimatePresence {...props} />
);

ForwardedAnimatePresence.displayName = 'ForwardedAnimatePresence';

export const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({ open, onOpenChange, onSubscribe }) => {
  const [loading, setLoading] = React.useState(false);
  const [isRazorpayOpen, setIsRazorpayOpen] = React.useState(false);

  const handleProSubscribe = async () => {
    if (isRazorpayOpen) return; // Prevent multiple opens
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let userEmail = localStorage.getItem('userEmail') || '';
      if (!userEmail) {
        toast.error('Email is required for subscription.');
        setLoading(false);
        return;
      }

      // First load Razorpay script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        toast.error('Failed to load Razorpay SDK.');
        setLoading(false);
        return;
      }

      // Then create order
      const response = await fetch('https://7cvccltb-3300.inc1.devtunnels.ms/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ Email: userEmail }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create subscription');
      }

      // Close subscription dialog before opening Razorpay
      onOpenChange(false);

      // Initialize Razorpay
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Pro Subscription',
        description: 'Unlock premium features',
        order_id: data.id,
        prefill: {
          email: data.userEmail,
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('https://7cvccltb-3300.inc1.devtunnels.ms/api/verify-subscription', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                Email: data.userEmail,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyData.message || 'Subscription verification failed');
            }
            toast.success('Subscription successful!');
            onSubscribe?.('Pro');
          } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Subscription verification failed.');
          } finally {
            setIsRazorpayOpen(false);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function() {
            toast.error('Payment cancelled');
            setIsRazorpayOpen(false);
            setLoading(false);
            // Reopen subscription dialog if payment was cancelled
            onOpenChange(true);
          }
        },
        theme: {
          color: '#1e293b',
        },
      };

      // Create new Razorpay instance
      const rzp = new (window as any).Razorpay(options);
      
      // Set Razorpay as open before opening
      setIsRazorpayOpen(true);
      
      // Open Razorpay
      rzp.open();
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create subscription.');
      setLoading(false);
      setIsRazorpayOpen(false);
    }
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      setIsRazorpayOpen(false);
      setLoading(false);
    };
  }, []);

  return (
    <Dialog.Root open={open && !isRazorpayOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <ForwardedAnimatePresence>
          {open && !isRazorpayOpen && (
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
                  className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                >
                  <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-3xl w-full border border-gray-200 dark:border-gray-800">
                    <div className="text-center mb-8">
                      <Dialog.Title className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Choose Your Plan
                      </Dialog.Title>
                      <Dialog.Description className="text-gray-600 dark:text-gray-400 mt-2">
                        Unlock premium features and templates with a subscription
                      </Dialog.Description>
                    </div>
                    <div className="flex justify-center flex-col p-10">
                      {plans.map((plan, idx) => (
                        <div
                          key={plan.name}
                          className={`relative rounded-3xl p-8 bg-gradient-to-br ${plan.color} flex flex-col items-center transition-transform duration-300
                            ${plan.popular ? 'scale-110 z-20 ring-4 ring-gray-300/80 shadow-2xl shadow-black/30 animate-glow-pro border-0' : 'border border-gray-200 dark:border-gray-800 shadow-lg'}
                            ${plan.popular ? 'before:content-["\"] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/60 before:via-black/80 before:to-gray-900/60 before:blur-lg before:opacity-60 before:-z-10' : ''}`}
                        >
                          {plan.popular && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                              <Crown className="w-10 h-10 text-yellow-400 drop-shadow-xl animate-bounce" />
                            </div>
                          )}
                          <div className="mb-4">{plan.icon}</div>
                          <div className="text-3xl font-extrabold mb-2 text-white drop-shadow-lg">{plan.name}</div>
                          <div className="text-5xl font-black mb-4 text-white drop-shadow-xl">{plan.price}</div>
                          <ul className="mb-6 space-y-3 text-white text-base text-left w-full">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Check className="w-5 h-5 text-black" />
                                <span className="text-white">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <Button
                            className={`w-full py-3 mt-auto font-semibold rounded-xl transition-all duration-300
                              ${plan.popular
                                ? 'bg-gradient-to-r from-black via-gray-900 to-white text-white hover:from-gray-800 hover:to-black shadow-lg shadow-black/40 border-0 scale-105 animate-glow-pro'
                                : 'bg-white dark:bg-gray-800 text-white border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-white'}
                            `}
                            onClick={plan.popular ? handleProSubscribe : () => onSubscribe?.(plan.name)}
                            disabled={plan.popular && loading}
                          >
                            {plan.popular && loading ? 'Processing...' : plan.button}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-8 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all duration-300"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </ForwardedAnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}; 