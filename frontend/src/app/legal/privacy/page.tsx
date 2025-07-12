import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Diamond Art',
  description: 'Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: July 10, 2025</p>
      
      <section className="mb-8">
        <p className="mb-4">
          Welcome to Diamond Art (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy or our practices with regard to your personal information, please contact us at privacy@diamondart.com.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p className="mb-4">We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.</p>
        
        <h3 className="text-lg font-medium mt-4 mb-2">Personal Information You Disclose to Us</h3>
        <p className="mb-2">We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Account Data:</strong> Name, email address, username, password, and other registration details.</li>
          <li><strong>Profile Data:</strong> Profile picture, bio, and other profile information.</li>
          <li><strong>Payment Data:</strong> Billing address, payment method, and transaction details.</li>
          <li><strong>Content:</strong> Designs, comments, messages, and other content you create or share.</li>
        </ul>

        <h3 className="text-lg font-medium mt-4 mb-2">Information Automatically Collected</h3>
        <p>We automatically collect certain information when you visit, use, or navigate the website. This information does not reveal your specific identity but may include device and usage information.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">We use personal information collected via our website for a variety of business purposes described below:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To facilitate account creation and logon process</li>
          <li>To send administrative information to you</li>
          <li>To enable user-to-user communications</li>
          <li>To request feedback</li>
          <li>To protect our services</li>
          <li>To enforce our terms, conditions, and policies</li>
          <li>For business transfers</li>
          <li>For other business purposes, such as data analysis and research</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Will Your Information Be Shared With Anyone?</h2>
        <p className="mb-4">We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
        <p>We may process or share your data that we hold based on the following legal basis:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
          <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
          <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. How Long Do We Keep Your Information?</h2>
        <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. How Do We Keep Your Information Safe?</h2>
        <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. What Are Your Privacy Rights?</h2>
        <p className="mb-4">Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Request access to your personal information</li>
          <li>Request correction of your personal information</li>
          <li>Request deletion of your personal information</li>
          <li>Object to processing of your personal information</li>
          <li>Request restriction of processing your personal information</li>
          <li>Request transfer of your personal information</li>
          <li>Withdraw your consent</li>
        </ul>
        <p>To make such a request, please contact us at privacy@diamondart.com.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Controls for Do-Not-Track Features</h2>
        <p>We do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Do We Make Updates to This Policy?</h2>
        <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated &quot;Last updated&quot; date and the updated version will be effective as soon as it is accessible.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">9. How Can You Contact Us About This Policy?</h2>
        <p>If you have questions or comments about this policy, you may contact us at:</p>
        <address className="not-italic mt-2">
          Diamond Art Inc.<br />
          Attn: Privacy Officer<br />
          123 Artisan Way<br />
          Creative City, CA 90210<br />
          United States<br />
          Email: privacy@diamondart.com
        </address>
      </section>
    </article>
  );
}
