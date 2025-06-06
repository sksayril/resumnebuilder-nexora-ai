declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

// RAZORPAY_KEY_ID=rzp_test_BDT2TegS4Ax6Vp
// RAZORPAY_KEY_SECRET=GMuyqoLdWIg6FtGAr0Eya552

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const makePayment = (amount: number, userData: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    initializeRazorpay().then((res) => {
      if (!res) {
        reject(new Error('Razorpay SDK failed to load'));
        return;
      }

      const options: RazorpayOptions = {
        key: 'rzp_test_BDT2TegS4Ax6Vp',
        amount: amount * 100,
        currency: 'INR',
        name: 'Resume Builder',
        description: 'Premium Resume Download',
        order_id: 'order_' + Math.random().toString(36).substring(7),
        handler: function (response: any) {
          resolve(response);
        },
        prefill: {
          name: userData.name || '',
          email: userData.email || '',
          contact: userData.phone || '',
        },
        theme: {
          color: '#10B981',
        },
        modal: {
          ondismiss: function() {
            reject(new Error('Payment cancelled'));
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    });
  });
}; 