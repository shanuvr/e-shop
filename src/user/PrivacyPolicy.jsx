import {
  InfoLayout,
  InfoSection
} from '../components/InfoLayout';

export default function PrivacyPolicy() {
  return (
    <InfoLayout
      active="privacy"
      title="Privacy Policy"
      description="Last updated: September 2026. E-Shop Inc., operating as E-SHOP, is committed to protecting your personal data."
    >
      <InfoSection title="Information we collect">
        <p>
          We collect information you provide directly when you create an account, place an order or
          contact support. This includes your name, email address, phone number, delivery addresses,
          and order history.
        </p>
        <p>
          We also collect limited technical data automatically, such as device type, browser, and
          IP address, to keep the platform secure and improve performance.
        </p>
      </InfoSection>

      <InfoSection title="How we use your information">
        <p>Your information is used to:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Process, fulfil and deliver your orders</li>
          <li>Send order updates, delivery notifications and return confirmations</li>
          <li>Secure your account and verify transactions</li>
          <li>Personalise product and store recommendations</li>
          <li>Comply with applicable legal and regulatory obligations</li>
        </ul>
      </InfoSection>

      <InfoSection title="Cookies and similar technologies">
        <p>
          We use cookies to remember your cart, keep you signed in, and understand how visitors use
          E-SHOP so we can improve our service. You can disable cookies in your browser settings,
          though some features such as a persistent cart may be affected.
        </p>
      </InfoSection>

      <InfoSection title="How we share information">
        <p>
          We never sell your personal data. Information is shared only where necessary to provide
          our service, for example with delivery partners to ship your order, payment providers to
          process transactions, and sellers who fulfil your purchase — each bound by confidentiality.
        </p>
      </InfoSection>

      <InfoSection title="Data security">
        <p>
          All sensitive data is encrypted in transit (TLS) and at rest. Access to customer data is
          restricted to authorised personnel, and we regularly review our security controls to
          protect against unauthorised access or disclosure.
        </p>
      </InfoSection>

      <InfoSection title="Your rights">
        <p>
          You may access, correct, or delete your personal information at any time from{' '}
          <strong className="font-bold text-slate-700">My Account &gt; Settings</strong>. You can
          also request data deletion by contacting our support team, and we will honour your request
          within 30 days unless we are required to retain the data by law.
        </p>
      </InfoSection>

      <InfoSection title="Contact us">
        <p>
          Questions about this policy or your data can be sent to{' '}
          <strong className="font-bold text-slate-700">support@eshop-marketplace.com</strong> or by
          mail to E-Shop Inc., 100 Innovation Tech Park, Koramangala, Bangalore, Karnataka 560095.
        </p>
      </InfoSection>
    </InfoLayout>
  );
}