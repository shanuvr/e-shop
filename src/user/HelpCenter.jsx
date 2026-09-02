import { InfoLayout, InfoSection, FaqItem } from '../components/InfoLayout';

const FAQ_GROUPS = [
  {
    title: 'Orders & Payments',
    items: [
      {
        q: 'How do I place an order on E-SHOP?',
        a: 'Browse the marketplace, choose your products and add them to your cart. Proceed to checkout, select a delivery address and payment method, then confirm your order. You will receive an email and SMS confirmation instantly.'
      },
      {
        q: 'Which payment methods are supported?',
        a: 'We accept UPI, all major credit and debit cards (Visa, Mastercard, RuPay), net banking, and cash on delivery for eligible orders and pincodes.'
      },
      {
        q: 'How can I track the status of my order?',
        a: 'Open the Order Tracking page and enter your order ID, or visit My Account > Orders. You will see live status updates from confirmation to delivery.'
      },
      {
        q: 'What should I do if my payment was deducted but the order did not go through?',
        a: 'Payment reversals are usually automatic within 3-5 business days. If it takes longer, contact our support team with your transaction reference and we will resolve it promptly.'
      }
    ]
  },
  {
    title: 'Delivery & Shipping',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Within Thrissur town we offer same-day or next-day delivery. Ordering before 5 PM at a local pin code usually qualifies for same-day delivery. Orders from other sellers may take 2-4 business days.'
      },
      {
        q: 'Is delivery free?',
        a: 'Delivery is free for all orders above ₹499. Orders below this value attract a small delivery fee that is shown at checkout before you confirm.'
      },
      {
        q: 'Can I change my delivery address after ordering?',
        a: 'Yes, you can update the delivery address as long as the order has not been marked as shipped. Contact support or edit it in My Account > Addresses.'
      }
    ]
  },
  {
    title: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'You can raise a return request within 7 days of delivery. Products must be unused, in original packaging, with all tags and accessories intact. See the Returns & Exchange page for details.'
      },
      {
        q: 'How are refunds processed?',
        a: 'Once the returned item is verified, refunds are issued to the original payment method within 3-5 business days. Cash-on-delivery orders are refunded as store credit or to your bank account.'
      },
      {
        q: 'What items cannot be returned?',
        a: 'Personal care, hygiene products and items clearly marked as final sale (such as opened consumables and custom-made goods) cannot be returned unless they arrive damaged or defective.'
      }
    ]
  },
  {
    title: 'Account & Security',
    items: [
      {
        q: 'How do I create an account?',
        a: 'Click "Log in" in the top navigation and choose "Create Account". Enter your name, email and a password to get started. You can also sign in with Google.'
      },
      {
        q: 'I forgot my password. What should I do?',
        a: 'On the login page click "Forgot password?", enter your registered email and we will send you a secure reset link.'
      },
      {
        q: 'Are my details safe?',
        a: 'Yes. We use industry-standard encryption and never share your personal information with third parties except as needed to fulfil your order. Review our Privacy Policy for full details.'
      }
    ]
  }
];

export default function HelpCenter() {
  return (
    <InfoLayout
      active="help"
      title="Help Center & FAQ"
      description="Quick answers to the most common questions about ordering, delivery, returns and your account."
    >
      {FAQ_GROUPS.map((group) => (
        <InfoSection key={group.title} title={group.title}>
          <div className="space-y-2">
            {group.items.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </InfoSection>
      ))}
    </InfoLayout>
  );
}