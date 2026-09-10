import { markEmailPaid } from './auth'

export function initiateRazorpayPayment({ email, courseId, courseTitle, amount, onSuccess, onFailure }) {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TaQjSLiHCUPnqS',
    amount: amount * 100, // Amount in paise (20 rupees = 2000 paise)
    currency: 'INR',
    name: 'Aspire Nexus',
    description: courseTitle,
    image: '/favicon.svg',
    handler: function (response) {
      // Payment successful
      const paymentDetails = {
        paymentId: response.razorpay_payment_id,
        amount: amount,
        currency: 'INR',
        timestamp: new Date().toISOString()
      }
      
      markEmailPaid(email, courseId, paymentDetails)
      
      if (onSuccess) {
        onSuccess(paymentDetails)
      }
    },
    prefill: {
      email: email,
    },
    theme: {
      color: '#667eea'
    },
    modal: {
      ondismiss: function () {
        if (onFailure) {
          onFailure('Payment cancelled by user')
        }
      }
    }
  }

  const razorpay = new window.Razorpay(options)
  razorpay.open()
}
