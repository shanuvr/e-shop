import { Link } from 'react-router-dom';
import {
  InfoLayout,
  InfoSection
} from '../components/InfoLayout';

export default function TermsPage() {
  return (
    <InfoLayout
      active="terms"
      title="Terms of Service"
      description="Last updated: September 2026. These terms govern your use of the E-SHOP marketplace and its services."
    >
      <InfoSection title="Acceptance of terms">
        <p>
          By creating an account or placing an order on E-SHOP, you agree to these Terms of Service
          and our Privacy Policy. If you do not agree with any part of these terms, please do not use
          the platform.
        </p>
      </InfoSection>

      <InfoSection title="Your account">
        <p>
          You are responsible for keeping your login credentials confidential and for all activity
          under your account. You must provide accurate information and update it promptly when it
          changes. We may suspend accounts that we reasonably believe are being misused.
        </p>
      </InfoSection>

      <InfoSection title="Orders & payment">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>All prices are in Indian Rupees (₹) and include applicable taxes unless stated otherwise.</li>
          <li>An order is confirmed only after payment is authorised and we send an order confirmation.</li>
          <li>We may cancel an order if the product is unavailable, pricing was incorrect, or payment could not be verified. In such cases any amount paid is refunded in full.</li>
          <li>Cash on delivery is subject to availability and may be disabled for certain pincodes or order values.</li>
        </ul>
      </InfoSection>

      <InfoSection title="Delivery & returns">
        <p>
          Delivery timeframes and charges are described in our Shipping Guidelines. Returns are
          governed by our return policy and must be raised within 7 days of delivery for eligible
          items, as detailed on the Returns &amp; Exchange page.
        </p>
      </InfoSection>

      <InfoSection title="Intellectual property">
        <p>
          The E-SHOP name, logo, content, product imagery and software are the property of E-Shop
          Inc. or its licensors. You may not copy, reproduce, distribute, or create derivative works
          from any part of the platform without prior written consent.
        </p>
      </InfoSection>

      <InfoSection title="Limitation of liability">
        <p>
          E-SHOP acts as a marketplace connecting buyers with independent sellers. To the maximum
          extent permitted by law, E-SHOP is not liable for indirect, incidental, or consequential
          damages arising from your use of the platform, the actions of sellers, or delivery by
          courier partners.
        </p>
      </InfoSection>

      <InfoSection title="Changes to these terms">
        <p>
          We may update these terms from time to time. Material changes will be highlighted on this
          page with an updated "Last updated" date, and continued use of the platform after changes
          take effect counts as acceptance of the new terms.
        </p>
      </InfoSection>

      <InfoSection title="Governing law">
        <p>
          These terms are governed by the laws of India. Any disputes will be subject to the
          jurisdiction of the courts of Bangalore, Karnataka, unless resolved informally through our
          support channels first. For any queries, contact{' '}
          <strong className="font-bold text-slate-700">support@eshop-marketplace.com</strong> or{' '}
          <Link to="/help" className="font-bold text-primary hover:underline">
            visit the Help Center
          </Link>
          .
        </p>
      </InfoSection>
    </InfoLayout>
  );
}