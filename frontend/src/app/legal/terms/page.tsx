import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Diamond Art',
  description: 'Terms and conditions governing your use of Diamond Art services.',
};

export default function TermsOfService() {
  return (
    <article>
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: July 10, 2025</p>
      
      <section className="mb-8">
        <p className="mb-4">
          Welcome to Diamond Art! These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Diamond Art website, mobile applications, and services (collectively, the &quot;Service&quot;). Please read these Terms carefully before using the Service.
        </p>
        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Accounts</h2>
        <p className="mb-4">When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
        <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. User Content</h2>
        <p className="mb-4">Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material (&quot;Content&quot;). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.</p>
        <p>By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Copyright Policy</h2>
        <p className="mb-4">We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on the Service infringes the copyright or other intellectual property rights (&quot;Infringement&quot;) of any person or entity.</p>
        <p>If you are a copyright owner or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to copyright@diamondart.com, with the subject line: &quot;Copyright Infringement&quot; and include in your claim a detailed description of the alleged Infringement.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Purchases</h2>
        <p className="mb-4">If you wish to purchase any product or service made available through the Service (&quot;Purchase&quot;), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.</p>
        <p>You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct, and complete.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Subscriptions</h2>
        <p className="mb-4">Some parts of the Service are billed on a subscription basis (&quot;Subscription(s)&quot;). You will be billed in advance on a recurring and periodic basis (&quot;Billing Cycle&quot;). Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.</p>
        <p>At the end of each Billing Cycle, your Subscription will automatically renew under the exact same conditions unless you cancel it or Diamond Art cancels it. You may cancel your Subscription renewal either through your online account management page or by contacting Diamond Art customer support team.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Free Trial</h2>
        <p className="mb-4">Diamond Art may, at its sole discretion, offer a Subscription with a free trial for a limited period of time (&quot;Free Trial&quot;).</p>
        <p>You may be required to enter your billing information in order to sign up for the Free Trial. If you do enter your billing information when signing up for the Free Trial, you will not be charged by Diamond Art until the Free Trial has expired. On the last day of the Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable Subscription fees for the type of Subscription you have selected.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Fee Changes</h2>
        <p>Diamond Art, in its sole discretion and at any time, may modify the Subscription fees for the Subscriptions. Any Subscription fee change will become effective at the end of the then-current Billing Cycle.</p>
        <p>Diamond Art will provide you with a reasonable prior notice of any change in Subscription fees to give you an opportunity to terminate your Subscription before such change becomes effective.</p>
        <p>Your continued use of the Service after the Subscription fee change comes into effect constitutes your agreement to pay the modified Subscription fee amount.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Refunds</h2>
        <p>Except when required by law, paid Subscription fees are non-refundable. Certain refund requests for Subscriptions may be considered by Diamond Art on a case-by-case basis and granted at the sole discretion of Diamond Art.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Intellectual Property</h2>
        <p className="mb-4">The Service and its original content, features, and functionality are and will remain the exclusive property of Diamond Art and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Diamond Art.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Links To Other Web Sites</h2>
        <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Diamond Art. Diamond Art has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Diamond Art shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
        <p className="mb-4">We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
        <p>If you wish to terminate your account, you may simply discontinue using the Service. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">12. Limitation Of Liability</h2>
        <p>In no event shall Diamond Art, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">13. Disclaimer</h2>
        <p>Your use of the Service is at your sole risk. The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.</p>
        <p>Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">15. Changes</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">16. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <address className="not-italic mt-2">
          Diamond Art Inc.<br />
          Attn: Legal Department<br />
          123 Artisan Way<br />
          Creative City, CA 90210<br />
          United States<br />
          Email: legal@diamondart.com
        </address>
      </section>
    </article>
  );
}
